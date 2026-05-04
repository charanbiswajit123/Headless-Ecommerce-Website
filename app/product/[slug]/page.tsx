import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ProductDescription } from "@/components/ProductDescription";
import { fetchProductBySlug, fetchProductSlugs } from "@/lib/sanity/fetch";
import { imageUrl } from "@/lib/sanity/image";

type Props = { params: Promise<{ slug: string }> };

/** PDP is statically generated with ISR — new Sanity products appear after revalidation. */
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await fetchProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) {
    return { title: "Product not found" };
  }
  const ogImage = imageUrl(product.mainImage, 1200);
  return {
    title: product.title,
    description: `${product.title} — ${product.category}`,
    openGraph: {
      title: product.title,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  const hero = imageUrl(product.mainImage, 1200);
  const thumbs = [
    product.mainImage,
    ...(product.gallery ?? []).filter(Boolean),
  ].slice(0, 6);

  return (
    <article className="px-4 py-8 sm:px-6 sm:py-12 ml-12 mr-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900">
            {hero ? (
              <Image
                src={hero}
                alt={product.title}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-zinc-400">
                No image
              </div>
            )}
          </div>
          {thumbs.length > 1 ? (
            <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {thumbs.map((img, i) => {
                const t = imageUrl(img, 400);
                if (!t) return null;
                return (
                  <li
                    key={`${t}-${i}`}
                    className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900"
                  >
                    <Image
                      src={t}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
            {product.category}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {product.title}
          </h1>
          <p className="mt-4 text-3xl font-semibold">
            ${product.price.toFixed(2)}
          </p>

          <div className="mt-8">
            <AddToCartButton product={product} imageUrl={hero} />
          </div>

          <div className="mt-12 border-t border-zinc-200 pt-10 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Description
            </h2>
            <div className="mt-4">
              <ProductDescription value={product.description} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
