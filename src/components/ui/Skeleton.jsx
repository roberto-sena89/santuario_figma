export function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border/40 bg-surface">
      <div className="aspect-video w-full animate-pulse bg-surface2" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="h-4 w-full animate-pulse rounded-lg bg-surface2" />
        <div className="h-3 w-2/3 animate-pulse rounded-lg bg-surface2" />
        <div className="h-3 w-1/3 animate-pulse rounded-lg bg-surface2" />
        <div className="mt-auto flex items-center gap-1 pt-2">
          <div className="h-9 w-9 animate-pulse rounded-xl bg-surface2" />
          <div className="h-9 w-9 animate-pulse rounded-xl bg-surface2" />
          <div className="h-9 w-9 animate-pulse rounded-xl bg-surface2" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 2, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 animate-pulse rounded-lg bg-surface2"
          style={{ width: `${70 - i * 15}%` }}
        />
      ))}
    </div>
  );
}
