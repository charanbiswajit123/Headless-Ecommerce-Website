import Stripe from "stripe";

/**
 * Lazily instantiates Stripe with the secret key (server-only).
 * Route handlers should return 500 if this throws — misconfiguration at deploy time.
 */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  // Uses the Stripe SDK default API version pinned to this package release.
  return new Stripe(key, { typescript: true });
}
