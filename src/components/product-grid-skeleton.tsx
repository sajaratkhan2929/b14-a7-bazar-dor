export default function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy="true"
      aria-label="লোড হচ্ছে…"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-green-100 bg-white p-4"
        >
          <div className="flex items-center gap-3">
            <div className="skeleton size-14 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3">
            <div className="space-y-2">
              <div className="skeleton h-3 w-16" />
              <div className="skeleton h-5 w-24" />
            </div>
            <div className="skeleton h-7 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}