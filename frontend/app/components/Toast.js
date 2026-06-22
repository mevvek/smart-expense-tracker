import { useEffect } from "react"

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      style={{ animation: "slideUp 0.3s ease-out" }}
    >
      <div className="bg-gray-900 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
        <span className="text-green-400">✅</span>
        <span className="text-sm font-medium">{message}</span>
      </div>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}