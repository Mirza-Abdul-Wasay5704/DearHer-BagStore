// app/shop/page.tsx — Shop page with product listing and filters
"use client";

import { useEffect, useState, useMemo } from "react";
import { Product, onProductsSnapshot } from "@/lib/firestore";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { PageLoader } from "@/components/LoadingSpinner";

interface FiltersState {
  priceRange: [number, number];
  patternType: string;
  color: string;
  sortBy: string;
}

const defaultFilters: FiltersState = {
  priceRange: [0, 0],
  patternType: "",
  color: "",
  sortBy: "newest",
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);

  // Realtime product listener
  useEffect(() => {
    const unsubscribe = onProductsSnapshot((allProducts) => {
      setProducts(allProducts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by pattern type
    if (filters.patternType) {
      result = result.filter((p) => p.patternType === filters.patternType);
    }

    // Filter by color
    if (filters.color) {
      result = result.filter((p) => p.colors?.includes(filters.color));
    }

    // Filter by price range
    if (filters.priceRange[0] > 0) {
      result = result.filter((p) => p.price >= filters.priceRange[0]);
    }
    if (filters.priceRange[1] > 0) {
      result = result.filter((p) => p.price <= filters.priceRange[1]);
    }

    // Sort
    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        // Already sorted by createdAt desc from Firestore
        break;
    }

    return result;
  }, [products, filters]);

  if (loading) return <PageLoader />;

  return (
    <div className="bg-cream">
      {/* Page Header */}
      <section className="bg-beige-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-primary">
            Our Collection
          </p>
          <h1 className="mt-3 font-serif text-3xl text-brand-dark md:text-4xl">
            Shop All Bags
          </h1>
          <p className="mt-3 text-sm text-beige-500">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-12">
            {/* Mobile Filter Toggle */}
            <div className="mb-6 lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 border border-beige-200 px-4 py-2.5 text-xs uppercase tracking-wider text-brand-dark"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            {/* Sidebar Filters */}
            <div
              className={`${
                showFilters ? "block" : "hidden"
              } mb-8 lg:col-span-1 lg:block`}
            >
              <ProductFilters
                filters={filters}
                onFilterChange={setFilters}
                onReset={() => setFilters(defaultFilters)}
              />
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-8">
                  {filteredProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} priority={i < 6} />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[40vh] items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl">🔍</span>
                    <p className="mt-4 font-serif text-lg text-brand-dark">
                      No products found
                    </p>
                    <p className="mt-2 text-sm text-beige-500">
                      Try adjusting your filters or check back later.
                    </p>
                    <button
                      onClick={() => setFilters(defaultFilters)}
                      className="mt-6 border border-brand-dark px-6 py-2.5 text-xs uppercase tracking-wider text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
