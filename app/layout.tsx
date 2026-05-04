import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { StoreProvider } from "@/components/providers/StoreProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Commerce — Modern headless storefront",
    template: "%s · Commerce",
  },
  description:
    "Products powered by Sanity, checkout powered by Stripe — Next.js App Router storefront.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Commerce",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[var(--background)] font-sans text-[var(--foreground)]">
        <StoreProvider>
          <Navbar />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}
