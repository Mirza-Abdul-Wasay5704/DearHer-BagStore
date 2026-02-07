// app/admin/products/page.tsx — Product listing with CRUD actions
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Product,
  onProductsSnapshot,
  deleteProduct,
  toggleFeatured,
} from "@/lib/firestore";
import { formatPrice } from "@/utils/helpers";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onProductsSnapshot((allProducts) => {
      setProducts(allProducts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    setDeletingId(product.id);
    try {
      await deleteProduct(product.id);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleFeatured = async (product: Product) => {
    try {
      await toggleFeatured(product.id, !product.featured);
    } catch (error) {
      console.error("Error toggling featured:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-brand-dark">Products</h1>
          <p className="mt-1 text-sm text-beige-500">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-brand-secondary px-6 py-3 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-brand-accent hover:text-brand-secondary"
        >
          ➕ Add Product
        </Link>
      </div>

      {/* Products Table */}
      {products.length > 0 ? (
        <div className="overflow-x-auto rounded-sm border border-beige-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-beige-200 bg-beige-50">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-beige-600">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-beige-600">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-beige-600">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-beige-600">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-beige-600">
                  Pattern
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-beige-600">
                  Featured
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-beige-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-beige-100 last:border-0 hover:bg-beige-50/50"
                >
                  {/* Image */}
                  <td className="px-4 py-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-sm bg-beige-100">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-beige-300">
                          🖼
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3">
                    <p className="font-medium text-brand-dark">
                      {product.name}
                    </p>
                    <p className="text-xs text-beige-500">/{product.slug}</p>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 text-brand-dark">
                    {formatPrice(product.price)}
                  </td>

                  {/* Stock */}
                  <td className="px-4 py-3 text-beige-600">
                    {product.stock || 0}
                  </td>

                  {/* Pattern */}
                  <td className="px-4 py-3 text-beige-600">
                    {product.patternType || "—"}
                  </td>

                  {/* Featured Toggle */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggleFeatured(product)}
                      className={`inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        product.featured ? "bg-green-500" : "bg-beige-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                          product.featured
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/product/${product.slug}`}
                        target="_blank"
                        className="rounded-sm p-2 text-beige-400 transition-colors hover:bg-ivory hover:text-brand-dark"
                        title="View"
                      >
                        👁
                      </Link>
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="rounded-sm p-2 text-beige-400 transition-colors hover:bg-ivory hover:text-brand-accent"
                        title="Edit"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(product)}
                        disabled={deletingId === product.id}
                        className="rounded-sm p-2 text-beige-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === product.id ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          "🗑"
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex min-h-[30vh] items-center justify-center rounded-sm border border-dashed border-beige-300 bg-white">
          <div className="text-center">
            <span className="text-4xl">📦</span>
            <p className="mt-4 font-serif text-lg text-brand-dark">
              No products yet
            </p>
            <p className="mt-2 text-sm text-beige-500">
              Start by adding your first product.
            </p>
            <Link
              href="/admin/products/new"
              className="mt-6 inline-block bg-brand-secondary px-6 py-3 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-brand-accent hover:text-brand-secondary"
            >
              Add First Product
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
