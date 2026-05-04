import type { Metadata } from "next";
import { CartPageContent } from "@/components/CartPageContent";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your bag and pay securely with Stripe.",
};

export default function CartPage() {
  return (
    <main>
      <CartPageContent />
    </main>
  );
}
