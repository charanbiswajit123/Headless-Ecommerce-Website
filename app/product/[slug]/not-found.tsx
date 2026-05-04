import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        This slug does not exist in Sanity or may have been unpublished.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
      >
        Back to shop
      </Link>
    </main>
  );
}
