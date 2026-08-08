const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

const authHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${getToken()}`
})

export async function getExpenses() {
  try {
    const res = await fetch(`${API_URL}/api/expenses`, {
      headers: authHeaders()
    })
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (err) {
    return []
  }
}

export async function addExpense(data) {
  const res = await fetch(`${API_URL}/api/expenses`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function deleteExpense(id) {
  const res = await fetch(`${API_URL}/api/expenses/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  })
  return res.json()
}

export async function getInsights(expenses) {
  const res = await fetch(`${API_URL}/api/insights`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ expenses })
  })
  return res.json()
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  return res.json()
}

export async function registerUser(name, email, password) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  console.log("REGISTER STATUS:", res.status);

  const data = await res.json();

  console.log("REGISTER RESPONSE:", data);

  return data;
}
export async function forgotPassword(email) {
  const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return res.json();
}

export async function resetPassword(token, password) {
  const res = await fetch(`${API_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      password,
    }),
  });

  return res.json();
}