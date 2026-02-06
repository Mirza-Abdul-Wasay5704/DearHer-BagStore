// components/ProductCard.tsx — Reusable product card with hover effect
"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/firestore";
import { formatPrice } from "@/utils/helpers";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

function ProductCard({ product, priority = false }: ProductCardProps) {
  const mainImage = product.images?.[0];

  return (
    <Link href={`/product/${product.slug}`} className="group block" prefetch={false}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-beige-100">
        {/* Product Image */}
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.name}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-beige-100">
            <svg className="h-16 w-16 text-beige-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-dark/0 transition-colors duration-500 group-hover:bg-brand-dark/10" />

        {/* Quick View Button */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="block bg-white/90 py-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-brand-dark backdrop-blur-sm">
            View Details
          </span>
        </div>

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute left-3 top-3">
            <span className="bg-brand-primary/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <h3 className="font-serif text-base text-brand-dark transition-colors group-hover:text-brand-primary md:text-lg">
          {product.name}
        </h3>
        <p className="mt-1 text-xs tracking-wider text-beige-500">
          {product.patternType}
        </p>
        <p className="mt-2 text-sm font-medium text-brand-primary">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
