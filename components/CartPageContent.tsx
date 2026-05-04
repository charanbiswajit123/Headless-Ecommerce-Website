"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { CheckoutButton } from "@/components/checkout/CheckoutButton";
import {
  removeFromCart,
  updateQuantity,
} from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function CartPageContent() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  );

  const checkoutLines = useMemo(
    () =>
      items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      })),
    [items],
  );

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-3 lg:gap-12 lg:py-12">
      <section className="lg:col-span-2">
        <h1 className="text-3xl font-bold tracking-tight">Your cart</h1>
        {items.length === 0 ? (
          <p className="mt-6 text-zinc-600 dark:text-zinc-400">
            Nothing here yet.{" "}
            <Link href="/" className="font-medium text-teal-600 hover:underline">
              Continue shopping
            </Link>
          </p>
        ) : (
          <ul className="mt-8 divide-y divide-zinc-200 dark:divide-zinc-800">
            {items.map((line) => (
              <li
                key={line.productId}
                className="flex gap-4 py-6 first:pt-0"
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                  {line.imageUrl ? (
                    <Image
                      src={line.imageUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/product/${line.slug}`}
                    className="font-semibold text-zinc-900 hover:underline dark:text-zinc-50"
                  >
                    {line.title}
                  </Link>
                  <p className="text-sm text-zinc-500">
                    ${line.price.toFixed(2)} each
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <label className="sr-only" htmlFor={`cart-qty-${line.productId}`}>
                      Quantity for {line.title}
                    </label>
                    <input
                      id={`cart-qty-${line.productId}`}
                      type="number"
                      min={1}
                      className="w-20 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                      value={line.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateQuantity({
                            productId: line.productId,
                            quantity:
                              Number.parseInt(e.target.value, 10) || 0,
                          }),
                        )
                      }
                    />
                    <button
                      type="button"
                      className="text-sm text-red-600 hover:underline dark:text-red-400"
                      onClick={() =>
                        dispatch(
                          removeFromCart({ productId: line.productId }),
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right font-semibold">
                  ${(line.price * line.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 lg:sticky lg:top-24">
        <h2 className="text-lg font-semibold">Summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-zinc-500">Subtotal</dt>
            <dd className="font-medium">${subtotal.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between border-t border-zinc-100 pt-2 dark:border-zinc-800">
            <dt className="font-semibold">Estimated total</dt>
            <dd className="font-semibold">${subtotal.toFixed(2)}</dd>
          </div>
        </dl>
        <div className="mt-6">
          <CheckoutButton lines={checkoutLines} disabled={items.length === 0} />
        </div>
      </aside>
    </div>
  );
}
