"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { getExpenses } from "../lib/api"
import ExpenseList from "./components/ExpenseList"

export default function Dashboard() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchExpenses = async () => {
    setLoading(true)
    const data = await getExpenses()
    setExpenses(data)
    setLoading(false)
  }

  useEffect(() => { fetchExpenses() }, [])

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-indigo-600 text-white rounded-2xl p-6 mb-6 shadow">
          <p className="text-indigo-200 text-sm">Total Spent</p>
          <p className="text-4xl font-bold mt-1">₹{total.toLocaleString("en-IN")}</p>
          <p className="text-indigo-200 text-sm mt-1">{expenses.length} transactions</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Recent Expenses</h2>
          <Link href="/add"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            ➕ Add New
          </Link>
        </div>
        {loading ? (
          <p className="text-center text-gray-400 py-8">Loading...</p>
        ) : (
          <ExpenseList expenses={expenses} onDelete={fetchExpenses} />
        )}
      </div>
    </main>
  )
}