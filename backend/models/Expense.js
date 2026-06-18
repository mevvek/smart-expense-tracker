const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Travel", "Shopping", "Entertainment", "Health", "Education", "Other"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  note: {
    type: String,
    default: ""
  }
}, { timestamps: true })

module.exports = mongoose.model("Expense", expenseSchema)