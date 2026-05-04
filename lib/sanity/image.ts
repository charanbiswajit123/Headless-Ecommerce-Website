import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { getSanityClient } from "./client";

/** Builds optimized CDN URLs for Sanity images (use with next/image). */
export function urlForImage(source: SanityImageSource | undefined | null) {
  const client = getSanityClient();
  if (!client || !source) return null;
  return imageUrlBuilder(client).image(source).auto("format").fit("max");
}

export function imageUrl(
  source: SanityImageSource | undefined | null,
  width: number,
): string | undefined {
  const b = urlForImage(source);
  if (!b) return undefined;
  return b.width(width).url();
}
