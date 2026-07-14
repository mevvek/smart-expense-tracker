const express = require("express")
const router = express.Router()
const Groq = require("groq-sdk")
const auth = require("../middleware/auth")

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

router.post("/", auth, async (req, res) => {
  try {
    const { expenses } = req.body

    if (!expenses || expenses.length === 0) {
      return res.json({ insights: ["Add some expenses first to get AI insights!"] })
    }

    const total = expenses.reduce((sum, e) => sum + e.amount, 0)
    const byCategory = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount
      return acc
    }, {})

    const prompt = `
You are a personal finance advisor. Analyze these expenses and give 4-5 short, specific, actionable insights.

Total spent: ₹${total}
Number of transactions: ${expenses.length}
Spending by category: ${JSON.stringify(byCategory)}
Recent expenses: ${JSON.stringify(expenses.slice(0, 10).map(e => ({ title: e.title, amount: e.amount, category: e.category })))}

Return ONLY a JSON array of strings. Each string is one insight. No extra text.
Example: ["You spent most on Food (₹500)", "Consider reducing Shopping expenses", "Your average expense is ₹250"]
`

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5
    })

    let raw = response.choices[0].message.content.trim()
    raw = raw.replace(/```json|```/g, "").trim()
    const insights = JSON.parse(raw)

    res.json({ insights })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "AI insights failed" })
  }
})

module.exports = router