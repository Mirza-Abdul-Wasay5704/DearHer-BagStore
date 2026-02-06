// app/layout.tsx — Root layout with providers
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dear Her — Premium Bags with Artistic Prints",
  description:
    "Handpicked bags with artistic prints for the woman who appreciates elegance. Gift-worthy, boutique-luxury bags designed with love.",
  keywords: [
    "bags",
    "women bags",
    "gift for her",
    "artistic prints",
    "premium bags",
    "Dear Her",
    "handmade bags",
    "luxury bags",
  ],
  openGraph: {
    title: "Dear Her — Premium Bags with Artistic Prints",
    description:
      "Handpicked bags with artistic prints for the woman who appreciates elegance.",
    type: "website",
    locale: "en_US",
    siteName: "Dear Her",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen pt-16 md:pt-20">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
