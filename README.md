# 💰 Smart Expense Tracker with AI

An AI-powered expense tracking web app that helps you monitor spending, visualize patterns, and get personalized financial insights.

**🔗 Live Demo: [Click Here](https://smart-expense-tracker-one-iota.vercel.app)**

---

## ✨ Features

- ➕ Add, track and delete expenses
- 📊 Visual charts — Category pie chart & Monthly bar chart
- 🤖 AI Insights powered by Groq + LLaMA 3.3
- 📋 History page with Search, Month & Category filters
- 📥 Export expenses to CSV
- 📈 Stats dashboard — Total, This Month, Avg, Top Category
- 👋 Personalized greeting based on time of day

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| AI | Groq API — LLaMA 3.3 70B |
| Charts | Chart.js + react-chartjs-2 |
| Deployment | Vercel + Render |

---

## 🚀 Run Locally

### Backend
```bash
cd backend
npm install
# .env mein daalo:
# MONGO_URI=your_mongodb_url
# GROQ_API_KEY=your_groq_key
# PORT=5000
node server.js
```

### Frontend
```bash
cd frontend
npm install
# .env.local mein daalo:
# NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev
```

Open `http://localhost:3000`

---

## 👤 Author

**Vivek Yadav** — BCA 3rd Year  
Invertis University  
[GitHub](https://github.com/mevvek)