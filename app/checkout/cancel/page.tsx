import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Checkout canceled</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        No charges were made. Your cart is unchanged — you can try again whenever you are
        ready.
      </p>
      <Link
        href="/cart"
        className="mt-10 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900"
      >
        Return to cart
      </Link>
    </main>
  );
}
