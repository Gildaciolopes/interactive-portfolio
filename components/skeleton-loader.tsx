export function SkeletonCard() {
  return (
    <div className="bg-[#12121a] rounded-2xl overflow-hidden border border-white/5">
      <div className="skeleton h-48 w-full" />
      <div className="p-6 space-y-4">
        <div className="skeleton h-6 w-3/4 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
      </div>
    </div>
  )
}

export function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded ${className}`} />
}
