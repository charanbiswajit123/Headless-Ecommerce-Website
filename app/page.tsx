import { HeroBanners } from "@/components/HeroBanners";
import { ProductGrid } from "@/components/ProductGrid";
import { fetchHomepage, fetchProducts } from "@/lib/sanity/fetch";
import type { Product } from "@/types";

/** Homepage & catalog — ISR refreshes listing periodically from Sanity. */
export const revalidate = 60;

export default async function HomePage() {
  const [homepage, products] = await Promise.all([
    fetchHomepage(),
    fetchProducts(),
  ]);

  const featured = (homepage?.featuredProducts ?? []).filter(
    Boolean,
  ) as Product[];
  const fid = new Set(featured.map((p) => p._id));
  const catalog = featured.length
    ? products.filter((p) => !fid.has(p._id))
    : products;

  const banners = (homepage?.banners ?? []).filter(Boolean);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <HeroBanners banners={banners} />

      {!banners.length ? (
        <section
          className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-900 px-8 py-14 text-white shadow-lg"
          aria-label="Welcome"
        >
          <div className="relative z-10 max-w-xl">
            <p className="text-sm font-medium uppercase tracking-widest text-teal-100">
              Headless commerce
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Built with Sanity, Stripe & Next.js
            </h1>
            <p className="mt-4 text-lg text-teal-50">
              Add banners and featured picks in Sanity Studio — this hero appears when no
              homepage banners exist.
            </p>
          </div>
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            aria-hidden
          />
        </section>
      ) : null}

      {featured.length > 0 ? (
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Featured
          </h2>
          <ProductGrid products={featured} />
        </section>
      ) : null}

      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {featured.length ? "More products" : "Shop"}
        </h2>
        <ProductGrid products={catalog} />
      </section>
    </main>
  );
}
