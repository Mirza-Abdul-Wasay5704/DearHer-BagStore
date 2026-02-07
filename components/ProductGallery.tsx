// components/ProductGallery.tsx — Product image gallery with thumbnails
"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const hasImages = images && images.length > 0;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-beige-100">
        {hasImages ? (
          <Image
            src={images[selectedIndex]}
            alt={`${productName} - Image ${selectedIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-beige-400">
            <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-xs uppercase tracking-wider">No images yet</span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {hasImages && images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-sm border-2 transition-all ${
                selectedIndex === index
                  ? "border-brand-accent"
                  : "border-beige-200 hover:border-beige-300"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
