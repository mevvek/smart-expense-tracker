const express = require("express")
const router = express.Router()
const Expense = require("../models/Expense")
const auth = require("../middleware/auth")

// GET — sirf is user ke expenses
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 })
    res.json(expenses)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST — nayi expense — userId attach karo
router.post("/", auth, async (req, res) => {
  try {
    const expense = new Expense({
      ...req.body,
      userId: req.user.id
    })
    await expense.save()
    res.status(201).json(expense)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE — sirf apni expense delete kar sake
router.delete("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user.id })
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" })
    }
    await Expense.findByIdAndDelete(req.params.id)
    res.json({ message: "Expense deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET stats — sirf is user ke
router.get("/stats", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id })
    const total = expenses.reduce((sum, e) => sum + e.amount, 0)
    const byCategory = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount
      return acc
    }, {})
    res.json({ total, byCategory, count: expenses.length })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router