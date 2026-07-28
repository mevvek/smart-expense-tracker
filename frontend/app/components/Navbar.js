"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

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
        <div className="flex items-center gap-6">
          {user && links.map(link => (
            <Link key={link.href} href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-indigo-600 border-b-2 border-indigo-600 pb-0.5"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">👋 {user.name}</span>
              <button onClick={handleLogout}
                className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/login" className="text-sm text-gray-500 hover:text-indigo-600 font-medium">Login</Link>
              <Link href="/signup" className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 font-medium">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}