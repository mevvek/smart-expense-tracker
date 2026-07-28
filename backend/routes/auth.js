const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");

// =======================
// REGISTER
// =======================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
      verificationTokenExpires: new Date(Date.now() + 30 * 60 * 1000),
    });

    await user.save();

    await sendVerificationEmail(email, verificationToken);

    return res.status(201).json({
      msg: "Registration successful! Please check your email to verify your account.",
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
});

// =======================
// LOGIN
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "Please fill all fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        msg: "Please verify your email before logging in.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
});

// =======================
// VERIFY EMAIL
// =======================
router.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send("Invalid verification link.");
    }

    const user = await User.findOne({
      verificationToken: token,
    });

    if (!user) {
      return res.status(400).send("Invalid or expired verification link.");
    }

    if (user.verificationTokenExpires < new Date()) {
      return res.status(400).send("Verification link has expired.");
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;

    await user.save();

    return res.redirect("http://localhost:3000/login");

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).send("Server Error");
  }
});

// =======================
// FORGOT PASSWORD
// =======================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        msg: "Email is required.",
      });
    }

    const user = await User.findOne({ email });

    // Security: same response even if user doesn't exist
    if (!user) {
      return res.json({
        msg: "If an account exists with this email, a password reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000);

    await user.save();

    await sendResetPasswordEmail(email, resetToken);

    return res.json({
      msg: "If an account exists with this email, a password reset link has been sent.",
    });

  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);

    return res.status(500).json({
      msg: "Server Error",
      error: err.message,
    });
  }
});

// =======================
// RESET PASSWORD
// =======================
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        msg: "Token and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        msg: "Password must be at least 6 characters.",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
    });

    if (!user) {
      return res.status(400).json({
        msg: "Invalid reset link.",
      });
    }

    if (user.resetPasswordExpires < new Date()) {
      return res.status(400).json({
        msg: "Reset link has expired.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.json({
      msg: "Password reset successful. Please login.",
    });

  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);

    return res.status(500).json({
      msg: "Server Error",
      error: err.message,
    });
  }
});

module.exports = router;