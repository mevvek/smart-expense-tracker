export default function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white rounded-xl p-4 flex justify-between items-center animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-16 h-6 bg-gray-200 rounded-full" />
            <div>
              <div className="w-32 h-4 bg-gray-200 rounded mb-1" />
              <div className="w-20 h-3 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="w-16 h-4 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  )
}