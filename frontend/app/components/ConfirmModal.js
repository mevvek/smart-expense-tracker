export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", backdropFilter: "blur(4px)" }}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4"
        style={{ animation: "fadeIn 0.2s ease-out" }}
      >
        <p className="text-2xl mb-3 text-center">🗑️</p>
        <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">Delete Expense?</h3>
        <p className="text-sm text-gray-500 text-center mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}