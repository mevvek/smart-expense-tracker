"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { addExpense } from "../../lib/api"
import Toast from "../components/Toast"

const CATEGORIES = [
  { name: "Food", icon: "🍔" },
  { name: "Travel", icon: "✈️" },
  { name: "Shopping", icon: "🛍️" },
  { name: "Entertainment", icon: "🎬" },
  { name: "Health", icon: "💊" },
  { name: "Education", icon: "📚" },
  { name: "Other", icon: "📦" },
]

export default function AddExpense() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: "", amount: "", category: "Food", date: "", note: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [toast, setToast] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.amount) {
      setError("Please enter Title and Amount to continue.")
      return
    }
    if (parseFloat(form.amount) <= 0) {
      setError("Amount must be greater than 0.")
      return
    }
    setLoading(true)
    try {
      await addExpense({ ...form, amount: parseFloat(form.amount) })
      setToast(true)
      await new Promise(r => setTimeout(r, 1500))
      router.push("/")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">➕ Add Expense</h1>
          <p className="text-sm text-gray-400 mt-1">Fill in the details to track your spending</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-5"
        >

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input type="text" placeholder="e.g. Lunch at restaurant"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Amount (₹) <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
              <input type="number" placeholder="0.00" min="0"
                className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-2.5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={form.amount}
                onChange={e => setForm({...form, amount: e.target.value})}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map(c => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setForm({...form, category: c.name})}
                  className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    form.category === c.name
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-105"
                      : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <span className="text-lg">{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
            <input type="date"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              value={form.date}
              onChange={e => setForm({...form, date: e.target.value})}
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Note <span className="text-gray-300 text-xs font-normal">(optional)</span>
            </label>
            <textarea placeholder="Add any extra details here..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
              rows={3}
              value={form.note}
              onChange={e => setForm({...form, note: e.target.value})}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex gap-2 items-center">
              <span>⚠️</span>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md hover:shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Saving expense...
              </span>
            ) : "Add Expense"}
          </button>

          <p className="text-xs text-gray-300 text-center">
            Fields marked with <span className="text-red-400">*</span> are required
          </p>

        </form>

        {/* Tips card */}
        <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-indigo-700 mb-2">💡 Quick Tips</p>
          <ul className="space-y-1">
            <li className="text-xs text-indigo-500">• Add expenses daily for accurate AI insights</li>
            <li className="text-xs text-indigo-500">• Use specific titles like "Lunch at Dominos" not just "Food"</li>
            <li className="text-xs text-indigo-500">• Select the right category for better spending analysis</li>
          </ul>
        </div>

      </div>

      {toast && <Toast message="Expense added successfully!" onClose={() => setToast(false)} />}

    </main>
  )
}