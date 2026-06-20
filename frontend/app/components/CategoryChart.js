"use client"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const COLORS = [
  "#6366f1", "#f59e0b", "#10b981",
  "#ef4444", "#3b82f6", "#8b5cf6", "#ec4899"
]

export default function CategoryChart({ expenses }) {
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  const labels = Object.keys(categoryTotals)
  const data = Object.values(categoryTotals)

  if (labels.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">
        <p>No data yet — add expenses to see chart</p>
      </div>
    )
  }

  const chartData = {
    labels,
    datasets: [{
      data,
      backgroundColor: COLORS.slice(0, labels.length),
      borderWidth: 2,
      borderColor: "#fff"
    }]
  }

  const options = {
    plugins: {
      legend: { position: "bottom" }
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold text-gray-700 mb-4">🥧 Spending by Category</h3>
      <div className="max-w-xs mx-auto">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  )
}