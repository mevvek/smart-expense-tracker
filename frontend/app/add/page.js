"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { addExpense } from "../../lib/api"

const CATEGORIES = ["Food", "Travel", "Shopping", "Entertainment", "Health", "Education", "Other"]

export default function AddExpense() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: "", amount: "", category: "Food", date: "", note: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.amount) {
      setError("Title aur Amount zaroori hai!")
      return
    }
    setLoading(true)
    try {
      await addExpense({ ...form, amount: parseFloat(form.amount) })
      router.push("/")
    } catch (err) {
      setError("Kuch galat hua — dobara try karo")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">➕ Add Expense</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" placeholder="e.g. Lunch at restaurant"
              className="w-full border rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
            <input type="number" placeholder="0.00"
              className="w-full border rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.amount}
              onChange={e => setForm({...form, amount: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.category}
              onChange={e => setForm({...form, category: e.target.value})}
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date"
              className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.date}
              onChange={e => setForm({...form, date: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
            <textarea placeholder="Any extra details..."
              className="w-full border rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
              value={form.note}
              onChange={e => setForm({...form, note: e.target.value})}
            />
          </div>

          {error && <p className="text-red-500 text-sm">⚠️ {error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Add Expense"}
          </button>

        </form>
      </div>
    </main>
  )
}