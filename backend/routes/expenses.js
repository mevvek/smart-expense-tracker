const express = require("express")
const router = express.Router()
const Expense = require("../models/Expense")

// GET — sabhi expenses lao
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 })
    res.json(expenses)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST — nayi expense add karo
router.post("/", async (req, res) => {
  try {
    const expense = new Expense(req.body)
    await expense.save()
    res.status(201).json(expense)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE — expense hatao
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id)
    res.json({ message: "Expense deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET — stats for AI insights
router.get("/stats", async (req, res) => {
  try {
    const expenses = await Expense.find()
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