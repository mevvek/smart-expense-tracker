"use client"
import { useState, useEffect } from "react"
import { getExpenses, deleteExpense } from "../../lib/api"
import ExportButton from "../components/ExportButton"
import ConfirmModal from "../components/ConfirmModal"

const CATEGORIES = ["All", "Food", "Travel", "Shopping", "Entertainment", "Health", "Education", "Other"]

const MONTHS = [
  "All Months", "January", "February", "March", "April",
  "May", "June", "July", "August", "September",
  "October", "November", "December"
]

export default function History() {
  const [expenses, setExpenses] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [month, setMonth] = useState("All Months")
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedTitle, setSelectedTitle] = useState("")

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

    if (month !== "All Months") {
      const monthIndex = MONTHS.indexOf(month) - 1
      result = result.filter(e => new Date(e.date).getMonth() === monthIndex)
    }

    if (search) {
      result = result.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFiltered(result)
  }, [search, category, month, expenses])

  const handleDeleteClick = (id, title) => {
    setSelectedId(id)
    setSelectedTitle(title)
    setShowModal(true)
  }

  const handleConfirm = async () => {
    await deleteExpense(selectedId)
    setShowModal(false)
    fetchExpenses()
  }

  const total = filtered.reduce((sum, e) => sum + e.amount, 0)

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">

        {showModal && (
          <ConfirmModal
            message={`"${selectedTitle}" will be permanently deleted.`}
            onConfirm={handleConfirm}
            onCancel={() => setShowModal(false)}
          />
        )}

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">📋 History</h1>
          <ExportButton expenses={filtered} />
        </div>

        {/* Search */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="🔍 Search expenses..."
            className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          <select
            className="flex-1 border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={month}
            onChange={e => setMonth(e.target.value)}
          >
            {MONTHS.map(m => <option key={m}>{m}</option>)}
          </select>
          <select
            className="flex-1 border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex justify-between items-center">
          <div>
            <span className="text-gray-500 text-sm">{filtered.length} expenses</span>
            {month !== "All Months" && (
              <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{month}</span>
            )}
            {category !== "All" && (
              <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{category}</span>
            )}
          </div>
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
                  <span className="font-bold text-green-600">₹{expense.amount}</span>
                  <button onClick={() => handleDeleteClick(expense._id, expense.title)}
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