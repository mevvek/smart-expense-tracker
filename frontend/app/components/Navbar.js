"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/add", label: "Add Expense" },
    { href: "/history", label: "History" },
  ]

  return (
    <nav className="bg-white shadow-sm border-b px-6 py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          💰 ExpenseAI
        </Link>
        <div className="flex gap-6">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-indigo-600 border-b-2 border-indigo-600 pb-0.5"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}