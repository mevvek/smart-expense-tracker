"use client"
import { useState } from "react"
import { getInsights } from "../../lib/api"

export default function AIInsights({ expenses }) {
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(false)
  const [shown, setShown] = useState(false)

  const fetchInsights = async () => {
    setLoading(true)
    setShown(true)
    try {
      const data = await getInsights(expenses)
      setInsights(data.insights || [])
    } catch (err) {
      setInsights(["Could not fetch insights. Please try again."])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-5 mb-4">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="font-semibold text-indigo-800">🤖 AI Insights</h3>
          <p className="text-xs text-indigo-500 mt-0.5">Powered by Groq + LLaMA 3.3</p>
        </div>
        <button
          onClick={fetchInsights}
          disabled={loading || expenses.length === 0}
          className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : shown ? "Refresh" : "Get Insights"}
        </button>
      </div>

      {loading && (
        <div className="space-y-2">
          {[1,2,3].map(i => (
            <div key={i} className="h-4 bg-indigo-100 rounded animate-pulse" />
          ))}
        </div>
      )}

      {!loading && shown && insights.length > 0 && (
        <ul className="space-y-2">
          {insights.map((insight, i) => (
            <li key={i} className="flex gap-2 text-sm text-indigo-900">
              <span className="text-indigo-400 mt-0.5">✦</span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      )}

      {!shown && expenses.length === 0 && (
        <p className="text-sm text-indigo-400">Add expenses first to get AI insights!</p>
      )}

      {!shown && expenses.length > 0 && (
        <p className="text-sm text-indigo-500">Click "Get Insights" to analyze your spending patterns 💡</p>
      )}
    </div>
  )
}