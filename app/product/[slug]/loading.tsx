export default function ProductLoading() {
  return (
    <div className="animate-pulse px-4 py-8 sm:px-6 sm:py-12 ml-12 mr-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-4">
          <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-10 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-8 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-12 w-full max-w-xs rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-10 space-y-2 border-t border-zinc-200 pt-10 dark:border-zinc-800">
            <div className="h-6 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
