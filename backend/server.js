const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
const expenseRoutes = require("./routes/expenses")
app.use("/api/expenses", expenseRoutes)

const insightRoutes = require("./routes/insights")
app.use("/api/insights", insightRoutes)

const authRoutes = require("./routes/auth")
app.use("/api/auth", authRoutes)

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err))

app.get("/", (req, res) => {
  res.json({ status: "running", message: "Expense Tracker API" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))