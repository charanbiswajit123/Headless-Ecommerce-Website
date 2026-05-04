"use client";

import Link from "next/link";
import { useEffect } from "react";

/** PDP-specific boundary — keeps failures scoped from the rest of the shop. */
export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[product page]", error);
  }, [error]);

  return (
    <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Could not load product</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        {error.message || "Try again or return to the catalog."}
      </p>
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
        >
          Retry
        </button>
        <Link
          href="/"
          className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-medium dark:border-zinc-700"
        >
          Shop
        </Link>
      </div>
    </main>
  );
}
