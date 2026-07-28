"use client"
import AIInsights from "./components/AIInsights"
import ExportButton from "./components/ExportButton"
import LoadingSkeleton from "./components/LoadingSkeleton"
import { useState, useEffect } from "react"
import Link from "next/link"
import { getExpenses } from "../lib/api"
import ExpenseList from "./components/ExpenseList"
import CategoryChart from "./components/CategoryChart"
import MonthlyChart from "./components/MonthlyChart"
import StatsCards from "./components/StatsCards"
import { useAuth } from "./context/AuthContext"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("list")

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  const fetchExpenses = async () => {
    setLoading(true)
    const data = await getExpenses()
    setExpenses(data)
    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      fetchExpenses()
    }
  }, [user])

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return "Good Morning! 👋"
    if (h < 17) return "Good Afternoon! 👋"
    return "Good Evening! 👋"
  }

  if (authLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </main>
    )
  }

  if (!user) return null

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">

        <div className="bg-indigo-600 text-white rounded-2xl p-6 mb-4 shadow">
          <p className="text-indigo-200 text-sm mb-1">{greeting()}</p>
          <p className="text-indigo-200 text-sm">Total Spent</p>
          <p className="text-4xl font-bold mt-1">₹{total.toLocaleString("en-IN")}</p>
          <p className="text-indigo-200 text-sm mt-1">{expenses.length} transactions</p>
        </div>

        <div className="flex justify-end mb-3">
          <ExportButton expenses={expenses} />
        </div>

        <StatsCards expenses={expenses} />
        <AIInsights expenses={expenses} />

        <div className="flex gap-2 mb-4">
          {["list", "pie", "bar"].map(tab => (
            <button key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 border"
              }`}
            >
              {tab === "list" ? "📋 List" : tab === "pie" ? "🥧 Category" : "📊 Monthly"}
            </button>
          ))}
          <Link href="/add"
            className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            ➕ Add
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {activeTab === "list" && <ExpenseList expenses={expenses} onDelete={fetchExpenses} />}
            {activeTab === "pie" && <CategoryChart expenses={expenses} />}
            {activeTab === "bar" && <MonthlyChart expenses={expenses} />}
          </>
        )}

      </div>
    </main>
  )
}