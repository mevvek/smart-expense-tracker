import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b px-6 py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          💰 ExpenseAI
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-indigo-600">
            Dashboard
          </Link>
          <Link href="/add" className="text-gray-600 hover:text-indigo-600">
            Add Expense
          </Link>
          <Link href="/history" className="text-gray-600 hover:text-indigo-600">
            History
          </Link>
        </div>
      </div>
    </nav>
  )
}