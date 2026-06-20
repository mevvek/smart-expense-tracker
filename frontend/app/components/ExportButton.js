export default function ExportButton({ expenses }) {
  const exportCSV = () => {
    if (expenses.length === 0) {
      alert("No expenses to export!")
      return
    }

    const headers = ["Title", "Amount", "Category", "Date", "Note"]
    const rows = expenses.map(e => [
      e.title,
      e.amount,
      e.category,
      new Date(e.date).toLocaleDateString("en-IN"),
      e.note || ""
    ])

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `expenses-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={exportCSV}
      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
    >
      📥 Export CSV
    </button>
  )
}