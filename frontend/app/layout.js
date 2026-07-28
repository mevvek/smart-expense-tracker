import Navbar from "./components/Navbar"
import { AuthProvider } from "./context/AuthContext"
import "./globals.css"

export const metadata = {
  title: "ExpenseAI — Smart Expense Tracker",
  description: "Track expenses with AI insights",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}