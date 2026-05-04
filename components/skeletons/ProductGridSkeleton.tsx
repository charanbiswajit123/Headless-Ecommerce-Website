export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800"
        >
          <div className="aspect-[4/5] bg-zinc-200 dark:bg-zinc-800" />
          <div className="space-y-3 p-4">
            <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-6 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-11 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
