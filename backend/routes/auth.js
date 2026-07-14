const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" })
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters" })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ msg: "Email already registered" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({ name, email, password: hashedPassword })
    await user.save()

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message })
  }
})

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" })
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message })
  }
})

module.exports = router