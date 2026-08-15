"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registerUser, verifyOTP } from "../../lib/api"

export default function Signup() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  // =======================
  // CREATE ACCOUNT
  // =======================
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields.")
      return
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const data = await registerUser(
        form.name,
        form.email,
        form.password
      )

      if (data.msg) {
        setOtpSent(true)
        setSuccess(data.msg)
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // =======================
  // OTP BOX CHANGE
  // =======================
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Move to next box
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  // =======================
  // VERIFY OTP
  // =======================
  const handleVerifyOTP = async (e) => {
    e.preventDefault()

    const otpValue = otp.join("")

    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP.")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const data = await verifyOTP(form.email, otpValue)

      if (data.msg === "Account verified successfully.") {
        setSuccess("Account verified successfully! Redirecting to login...")

        setTimeout(() => {
          router.push("/login")
        }, 1200)
      } else {
        setError(data.msg || "Invalid OTP.")
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
            Create Account
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Start tracking your expenses today
          </p>
        </div>

        <form
          onSubmit={otpSent ? handleVerifyOTP : handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4"
        >

          {/* NAME */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Vivek Yadav"
              disabled={otpSent}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              disabled={otpSent}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>

            <input
              type="password"
              placeholder="Min 6 characters"
              disabled={otpSent}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* OTP */}
          {otpSent && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Enter 6-digit OTP
              </p>

              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, index)
                    }
                    className="w-11 h-12 text-center text-lg font-bold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ))}
              </div>

              <p className="text-xs text-gray-500 text-center mt-3">
                OTP has been sent to <b>{form.email}</b>
              </p>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-red-600 text-sm">
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <p className="text-green-600 text-sm">
                ✅ {success}
              </p>
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-all"
          >
            {loading
              ? otpSent
                ? "Verifying..."
                : "Creating account..."
              : otpSent
                ? "Sign Up"
                : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </main>
  )
}