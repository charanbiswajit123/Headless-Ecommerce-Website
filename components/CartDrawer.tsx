"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import {
  removeFromCart,
  updateQuantity,
} from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: Props) {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  );

  return (
    <>
      <button
        type="button"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:bg-black/25 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-zinc-200 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-zinc-800 dark:bg-zinc-950 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-zinc-200 px-4 py-4 dark:border-zinc-800">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900"
            aria-label="Close cart"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-zinc-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((line) => (
                <li
                  key={line.productId}
                  className="flex gap-3 rounded-xl border border-zinc-100 p-3 dark:border-zinc-800"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
                    {line.imageUrl ? (
                      <Image
                        src={line.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/product/${line.slug}`}
                      className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
                      onClick={onClose}
                    >
                      {line.title}
                    </Link>
                    <p className="text-sm text-zinc-500">
                      ${line.price.toFixed(2)} each
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <label className="sr-only" htmlFor={`qty-${line.productId}`}>
                        Quantity
                      </label>
                      <input
                        id={`qty-${line.productId}`}
                        type="number"
                        min={1}
                        className="w-16 rounded border border-zinc-200 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                        value={line.quantity}
                        onChange={(e) =>
                          dispatch(
                            updateQuantity({
                              productId: line.productId,
                              quantity: Number.parseInt(e.target.value, 10) || 0,
                            }),
                          )
                        }
                      />
                      <button
                        type="button"
                        className="text-sm text-red-600 hover:underline"
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
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          <div className="mb-4 flex justify-between text-sm">
            <span className="text-zinc-500">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <Link
            href="/cart"
            onClick={onClose}
            className="block w-full rounded-xl bg-zinc-900 py-3 text-center text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
          >
            View cart & checkout
          </Link>
        </footer>
      </aside>
    </>
  );
}
