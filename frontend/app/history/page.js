"use client"
import { useState, useEffect } from "react"
import { getExpenses, deleteExpense } from "../../lib/api"
import ExportButton from "../components/ExportButton"

const CATEGORIES = ["All", "Food", "Travel", "Shopping", "Entertainment", "Health", "Education", "Other"]

export default function History() {
  const [expenses, setExpenses] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const fetchExpenses = async () => {
    setLoading(true)
    const data = await getExpenses()
    setExpenses(data)
    setFiltered(data)
    setLoading(false)
  }

  useEffect(() => { fetchExpenses() }, [])

  useEffect(() => {
    let result = expenses
    if (category !== "All") {
      result = result.filter(e => e.category === category)
    }
    if (search) {
      result = result.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase())
      )
    }
    setFiltered(result)
  }, [search, category, expenses])

  const handleDelete = async (id) => {
    if (confirm("Delete this expense?")) {
      await deleteExpense(id)
      fetchExpenses()
    }
  }

  const total = filtered.reduce((sum, e) => sum + e.amount, 0)

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">📋 History</h1>
          <ExportButton expenses={filtered} />
        </div>

        {/* Search + Filter */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="🔍 Search expenses..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex justify-between">
          <span className="text-gray-500 text-sm">{filtered.length} expenses</span>
          <span className="font-bold text-indigo-600">₹{total.toLocaleString("en-IN")}</span>
        </div>

        {/* List */}
        {loading ? (
          <p className="text-center text-gray-400 py-8">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-2">🔍</p>
            <p>No expenses found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(expense => (
              <div key={expense._id}
                className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
                    {expense.category}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">{expense.title}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(expense.date).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">₹{expense.amount}</span>
                  <button onClick={() => handleDelete(expense._id)}
                    className="text-red-400 hover:text-red-600"
                  >🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}