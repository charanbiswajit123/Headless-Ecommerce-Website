import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/sanity/image";
import type { HomepageBanner } from "@/types";

/** CMS-driven hero strip — first banner is hero; additional banners stack on large screens. */
export function HeroBanners({ banners }: { banners: HomepageBanner[] }) {
  if (!banners.length) return null;

  return (
    <section className="mb-12 grid gap-4 lg:grid-cols-2">
      {banners.map((b, i) => {
        const src = imageUrl(b.image, 1600);
        return (
          <div
            key={`${b.heading}-${i}`}
            className="relative overflow-hidden rounded-3xl bg-zinc-900 min-h-[280px] md:min-h-[360px]"
          >
            {src ? (
              <Image
                src={src}
                alt={b.heading ?? "Banner"}
                fill
                priority={i === 0}
                className="object-cover opacity-90"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              {b.heading ? (
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {b.heading}
                </h2>
              ) : null}
              {b.subheading ? (
                <p className="mt-2 max-w-lg text-lg text-white/90">{b.subheading}</p>
              ) : null}
              {b.ctaLabel && b.ctaHref ? (
                /^https?:\/\//i.test(b.ctaHref) ? (
                  <a
                    href={b.ctaHref}
                    className="mt-6 inline-flex w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-lg transition hover:bg-zinc-100"
                  >
                    {b.ctaLabel}
                  </a>
                ) : (
                  <Link
                    href={b.ctaHref}
                    className="mt-6 inline-flex w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-lg transition hover:bg-zinc-100"
                  >
                    {b.ctaLabel}
                  </Link>
                )
              ) : null}
            </div>
          </div>
        );
      })}
    </section>
  );
}
