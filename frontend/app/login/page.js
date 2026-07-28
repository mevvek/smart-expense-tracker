"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { loginUser } from "../../lib/api"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const router = useRouter()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      setError("Please fill all fields.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const data = await loginUser(form.email, form.password)

      if (data.token) {
        login(data.user, data.token)
        router.push("/")
      } else {
        setError(data.msg || "Invalid email or password.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <p className="text-4xl mb-2">💰</p>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back!
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to your ExpenseAI account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4"
        >

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            {/* Forgot Password */}
            <div className="flex justify-end mt-2">
              <Link
                href="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-red-600 text-sm">
                ⚠️ {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>

        </form>
      </div>
    </main>
  )
}