import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/sanity/image";
import type { Product } from "@/types";
import { AddToCartButton } from "./product/AddToCartButton";

type Props = {
  product: Product;
};

/** PLP tile: image, title, price, category; add-to-cart is isolated as a client island. */
export function ProductCard({ product }: Props) {
  const imgSrc = imageUrl(product.mainImage, 640);
  const blur =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P8/AwAI/AL+Xh+uXAAAAABJRU5ErkJggg==";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            placeholder="blur"
            blurDataURL={blur}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-400">
            No image
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-teal-600 dark:text-teal-400">
            {product.category}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="mt-1 font-semibold text-zinc-900 group-hover:underline dark:text-zinc-50">
              {product.title}
            </h3>
          </Link>
          <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <AddToCartButton product={product} imageUrl={imgSrc} />
      </div>
    </article>
  );
}
