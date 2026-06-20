"use client"
import { deleteExpense } from "../../lib/api"

const CATEGORY_COLORS = {
  Food: "bg-orange-100 text-orange-700",
  Travel: "bg-blue-100 text-blue-700",
  Shopping: "bg-pink-100 text-pink-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Health: "bg-green-100 text-green-700",
  Education: "bg-yellow-100 text-yellow-700",
  Other: "bg-gray-100 text-gray-700"
}

export default function ExpenseList({ expenses, onDelete }) {
  const handleDelete = async (id) => {
    if (confirm("Delete this expense?")) {
      await deleteExpense(id)
      onDelete()
    }
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm">
        <p className="text-5xl mb-4">💸</p>
        <p className="text-lg font-medium text-gray-700">No expenses yet!</p>
        <p className="text-sm text-gray-400 mt-1">Add your first expense to get started</p>
        <a href="/add"
          className="inline-block mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          ➕ Add First Expense
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {expenses.map(expense => (
        <div key={expense._id}
          className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${CATEGORY_COLORS[expense.category]}`}>
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
            <span className="font-bold text-gray-800">₹{expense.amount}</span>
            <button onClick={() => handleDelete(expense._id)}
              className="text-red-400 hover:text-red-600 text-sm"
            >🗑️</button>
          </div>
        </div>
      ))}
    </div>
  )
}