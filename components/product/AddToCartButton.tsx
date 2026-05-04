"use client";

import { useState } from "react";
import { addToCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import type { Product } from "@/types";

type Props = {
  product: Product;
  imageUrl?: string;
  label?: string;
};

/** Dispatches addToCart with Sanity-backed product metadata for cart + Stripe labels. */
export function AddToCartButton({
  product,
  imageUrl,
  label = "Add to cart",
}: Props) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);

  function handleClick() {
    dispatch(
      addToCart({
        productId: product._id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        imageUrl,
        quantity: 1,
      }),
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.98] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
    >
      {added ? "Added ✓" : label}
    </button>
  );
}
