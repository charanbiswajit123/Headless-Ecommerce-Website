"use client";

import { useState } from "react";
import type { CheckoutLineInput } from "@/types";

type Props = {
  lines: CheckoutLineInput[];
  disabled?: boolean;
};

/** Calls the secure API route to create a Stripe Checkout Session and redirects to Stripe-hosted checkout. */
export function CheckoutButton({ lines, disabled }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "Checkout failed");
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={disabled || loading || lines.length === 0}
        onClick={() => void handleCheckout()}
        className="w-full rounded-xl bg-teal-600 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Redirecting…" : "Pay with Stripe"}
      </button>
      {error ? (
        <p className="text-center text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
      <p className="text-center text-xs text-zinc-500">
        Secure checkout powered by Stripe. Prices are verified server-side from Sanity.
      </p>
    </div>
  );
}
