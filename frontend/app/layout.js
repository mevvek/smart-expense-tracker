import Navbar from "./components/Navbar"
import "./globals.css"

export const metadata = {
  title: "ExpenseAI — Smart Expense Tracker",
  description: "Track expenses with AI insights",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}