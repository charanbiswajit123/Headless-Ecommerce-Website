import { ProductGridSkeleton } from "@/components/skeletons/ProductGridSkeleton";

export default function HomeLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-12 h-[320px] animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="mb-6 h-9 w-48 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <ProductGridSkeleton />
    </main>
  );
}
