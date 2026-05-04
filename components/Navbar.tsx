"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { useAppSelector } from "@/store/hooks";

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Navbar() {
  const pathname = usePathname();
  const [cartOpen, setCartOpen] = useState(false);
  const count = useAppSelector((s) =>
    s.cart.items.reduce((n, i) => n + i.quantity, 0),
  );

  const links = useMemo(
    () => [
      { href: "/", label: "Shop" },
      { href: "/cart", label: "Cart" },
    ],
    [],
  );

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            Electronics Ecommerce Store
          </Link>
          <nav className="flex items-center gap-1 sm:gap-4" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  pathname === l.href
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white",
                )}
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
              aria-label="Open cart drawer"
            >
              Bag
              {count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-600 px-1 text-[11px] font-bold text-white">
                  {count > 99 ? "99+" : count}
                </span>
              ) : null}
            </button>
          </nav>
        </div>
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
