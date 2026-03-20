export default function Loader({ skeletonCount = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
        >
          <div className="aspect-[4/5] bg-gray-200"></div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-12 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
