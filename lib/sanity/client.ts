import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "tbpvo1i1";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

/**
 * Sanity read client for server components and route handlers.
 * Uses CDN for fast public reads; set SANITY_API_READ_TOKEN for draft/private datasets.
 */
export function getSanityClient(): SanityClient | null {
  if (!projectId) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
    token: process.env.SANITY_API_READ_TOKEN,
  });
}
