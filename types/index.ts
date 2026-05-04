import type { PortableTextBlock } from "@portabletext/types";

export type { PortableTextBlock };

/** Sanity image with asset reference */
export type SanityImage = {
  _type?: "image";
  asset?: { _ref: string; _type?: string };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

/** Product document projected from GROQ */
export type Product = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  category: string;
  mainImage?: SanityImage | null;
  gallery?: SanityImage[] | null;
  description?: PortableTextBlock[] | null;
};

/** Homepage singleton projected from GROQ */
export type HomepageBanner = {
  heading?: string;
  subheading?: string;
  image?: SanityImage | null;
  ctaLabel?: string;
  ctaHref?: string;
};

export type Homepage = {
  title?: string;
  banners?: HomepageBanner[] | null;
  featuredProducts?: Product[] | null;
};

/** Cart line persisted in Redux */
export type CartLineItem = {
  productId: string;
  slug: string;
  title: string;
  price: number;
  /** Resolved image URL for UI / Stripe product_data */
  imageUrl?: string;
  quantity: number;
};

export type CartState = {
  items: CartLineItem[];
};

/** Payload for Stripe checkout API — server re-validates prices */
export type CheckoutLineInput = {
  productId: string;
  quantity: number;
};
