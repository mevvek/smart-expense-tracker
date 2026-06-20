"use client"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function MonthlyChart({ expenses }) {
  const monthlyTotals = expenses.reduce((acc, e) => {
    const month = new Date(e.date).toLocaleString("en-IN", {
      month: "short", year: "numeric"
    })
    acc[month] = (acc[month] || 0) + e.amount
    return acc
  }, {})

  const labels = Object.keys(monthlyTotals)
  const data = Object.values(monthlyTotals)

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
      label: "Total Spent (₹)",
      data,
      backgroundColor: "#6366f1",
      borderRadius: 6
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (val) => `₹${val}`
        }
      }
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold text-gray-700 mb-4">📊 Monthly Spending</h3>
      <Bar data={chartData} options={options} />
    </div>
  )
}