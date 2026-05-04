import Link from "next/link";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

/** Thank-you page after Stripe redirects back — safe to bookmark; does not expose secrets. */
export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const sp = await searchParams;
  const sessionId = sp.session_id;

  return (
    <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-3xl text-teal-700 dark:bg-teal-950 dark:text-teal-300">
        ✓
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">
        Payment successful
      </h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Thanks for your order. You will receive a confirmation from Stripe at the email used
        during checkout.
      </p>
      {sessionId ? (
        <p className="mt-4 font-mono text-xs text-zinc-400">
          Session reference: {sessionId}
        </p>
      ) : null}
      <Link
        href="/"
        className="mt-10 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900"
      >
        Continue shopping
      </Link>
    </main>
  );
}
