import type { Homepage, Product } from "@/types";
import { getSanityClient } from "./client";
import {
  homepageQuery,
  productBySlugQuery,
  productsByIdsQuery,
  productsQuery,
  productSlugsQuery,
} from "./queries";

/** Fetches all products for PLP; returns [] if Sanity is not configured. */
export async function fetchProducts(): Promise<Product[]> {
  const client = getSanityClient();
  if (!client) return [];
  return client.fetch<Product[]>(productsQuery);
}

/** Single product by slug for PDP + metadata. */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const client = getSanityClient();
  if (!client) return null;
  return client.fetch<Product | null>(productBySlugQuery, { slug });
}

/** Homepage singleton (first document of type homepage). */
export async function fetchHomepage(): Promise<Homepage | null> {
  const client = getSanityClient();
  if (!client) return null;
  return client.fetch<Homepage | null>(homepageQuery);
}

/** Slugs for static generation. */
export async function fetchProductSlugs(): Promise<string[]> {
  const client = getSanityClient();
  if (!client) return [];
  return client.fetch<string[]>(productSlugsQuery);
}

/** Batch fetch products by Sanity _id — used to validate checkout line items. */
export async function fetchProductsByIds(ids: string[]): Promise<Product[]> {
  const client = getSanityClient();
  if (!client || ids.length === 0) return [];
  const unique = [...new Set(ids)];
  return client.fetch<Product[]>(productsByIdsQuery, { ids: unique });
}
