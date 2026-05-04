import { NextResponse } from "next/server";
import { fetchProductsByIds } from "@/lib/sanity/fetch";
import { imageUrl } from "@/lib/sanity/image";
import { getStripe } from "@/lib/stripe/server";
import type { CheckoutLineInput } from "@/types";

export const runtime = "nodejs";

/**
 * Creates a Stripe Checkout Session using **Sanity** as the price source of truth.
 * Client-sent prices are ignored to prevent tampering.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const items = (body as { items?: CheckoutLineInput[] }).items;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Provide at least one line item" },
      { status: 400 },
    );
  }

  const sanitized = items.map((l) => ({
    productId: String(l.productId),
    quantity: Math.floor(Number(l.quantity)),
  }));

  if (sanitized.some((l) => !l.productId || l.quantity < 1)) {
    return NextResponse.json(
      { error: "Invalid product id or quantity" },
      { status: 400 },
    );
  }

  /** Merge duplicate product lines (same Sanity `_id`) into one Stripe line item. */
  const mergedQty = new Map<string, number>();
  for (const line of sanitized) {
    mergedQty.set(
      line.productId,
      (mergedQty.get(line.productId) ?? 0) + line.quantity,
    );
  }
  const lines = [...mergedQty.entries()].map(([productId, quantity]) => ({
    productId,
    quantity,
  }));

  const products = await fetchProductsByIds(lines.map((s) => s.productId));
  if (products.length !== lines.length) {
    return NextResponse.json(
      { error: "One or more products were not found" },
      { status: 400 },
    );
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";

  const lineItems: {
    quantity: number;
    price_data: {
      currency: "usd";
      unit_amount: number;
      product_data: {
        name: string;
        metadata: Record<string, string>;
        images?: string[];
      };
    };
  }[] = [];

  for (const line of lines) {
    const product = products.find((p) => p._id === line.productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 400 });
    }
    const img = imageUrl(product.mainImage, 1024);
    lineItems.push({
      quantity: line.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.title,
          metadata: { sanityProductId: product._id },
          ...(img ? { images: [img] } : {}),
        },
      },
    });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      metadata: {
        item_count: String(lines.reduce((n, l) => n + l.quantity, 0)),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a session URL" },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[checkout]", e);
    return NextResponse.json(
      { error: "Unable to start checkout. Is Stripe configured?" },
      { status: 500 },
    );
  }
}
