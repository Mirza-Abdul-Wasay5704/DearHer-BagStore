// components/FeaturedProducts.tsx — Featured products section for homepage
"use client";

import { useEffect, useState } from "react";
import { Product, getFeaturedProducts } from "@/lib/firestore";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const featured = await getFeaturedProducts();
        setProducts(featured);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
            Curated Selection
          </p>
          <h2 className="mt-4 font-serif text-3xl text-brand-dark md:text-4xl">
            Our Favorites
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-beige-500">
            Handpicked pieces that define elegance — each one chosen with care
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="mt-16 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : products.length > 0 ? (
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-sm text-beige-500">
              New collection coming soon. Stay tuned.
            </p>
          </div>
        )}

        {/* View All Link */}
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-block border border-brand-secondary px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-brand-secondary transition-all hover:bg-brand-secondary hover:text-white"
          >
            View All Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
