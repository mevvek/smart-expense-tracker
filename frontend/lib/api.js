const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export async function getExpenses() {
  const res = await fetch(`${API_URL}/api/expenses`)
  return res.json()
}

export async function addExpense(data) {
  const res = await fetch(`${API_URL}/api/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function deleteExpense(id) {
  const res = await fetch(`${API_URL}/api/expenses/${id}`, {
    method: "DELETE"
  })
  return res.json()
}

export async function getStats() {
  const res = await fetch(`${API_URL}/api/expenses/stats`)
  return res.json()
}
export async function getInsights(expenses) {
  const res = await fetch(`${API_URL}/api/insights`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ expenses })
  })
  return res.json()
}