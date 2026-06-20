export default function StatsCards({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const avg = expenses.length > 0 ? total / expenses.length : 0

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  const topCategory = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])[0]

  const thisMonth = new Date().getMonth()
  const thisMonthTotal = expenses
    .filter(e => new Date(e.date).getMonth() === thisMonth)
    .reduce((sum, e) => sum + e.amount, 0)

  const cards = [
    { label: "Total Spent", value: `₹${total.toLocaleString("en-IN")}`, icon: "💰", color: "bg-indigo-50 border-indigo-200" },
    { label: "This Month", value: `₹${thisMonthTotal.toLocaleString("en-IN")}`, icon: "📅", color: "bg-green-50 border-green-200" },
    { label: "Avg per Expense", value: `₹${avg.toFixed(0)}`, icon: "📈", color: "bg-yellow-50 border-yellow-200" },
    { label: "Top Category", value: topCategory ? topCategory[0] : "None", icon: "🏆", color: "bg-pink-50 border-pink-200" },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {cards.map((card) => (
        <div key={card.label} className={`rounded-xl border p-4 ${card.color}`}>
          <p className="text-2xl mb-1">{card.icon}</p>
          <p className="text-xs text-gray-500">{card.label}</p>
          <p className="font-bold text-gray-800 text-sm mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  )
}