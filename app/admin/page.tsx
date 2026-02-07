// app/admin/page.tsx — Admin dashboard
"use client";

import { useEffect, useState } from "react";
import { Product, onProductsSnapshot } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onProductsSnapshot((allProducts) => {
      setProducts(allProducts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const totalProducts = products.length;
  const featuredProducts = products.filter((p) => p.featured).length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const avgPrice =
    totalProducts > 0
      ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / totalProducts)
      : 0;

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-brand-dark">Dashboard</h1>
        <p className="mt-1 text-sm text-beige-500">
          Welcome back, {user?.email?.split("@")[0] || "Admin"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={loading ? "..." : totalProducts.toString()}
          icon="🛍"
        />
        <StatCard
          title="Featured"
          value={loading ? "..." : featuredProducts.toString()}
          icon="⭐"
        />
        <StatCard
          title="Total Stock"
          value={loading ? "..." : totalStock.toString()}
          icon="📦"
        />
        <StatCard
          title="Avg. Price"
          value={loading ? "..." : `Rs. ${avgPrice.toLocaleString()}`}
          icon="💰"
        />
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-brand-secondary px-6 py-3 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-brand-accent hover:text-brand-secondary"
          >
            ➕ Add New Product
          </Link>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 border border-beige-200 bg-white px-6 py-3 text-xs font-medium uppercase tracking-wider text-brand-dark transition-colors hover:border-brand-accent"
          >
            📋 Manage Products
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 border border-beige-200 bg-white px-6 py-3 text-xs font-medium uppercase tracking-wider text-brand-dark transition-colors hover:border-brand-accent"
          >
            🌐 View Store
          </Link>
        </div>
      </div>

      {/* Recent Products */}
      <div className="mt-10">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
          Recent Products
        </h2>
        {!loading && products.length > 0 ? (
          <div className="overflow-hidden rounded-sm border border-beige-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-beige-200 bg-beige-50">
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
                    Featured
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-beige-100 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-brand-dark">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-beige-600">
                      Rs. {product.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-beige-600">
                      {product.stock || 0}
                    </td>
                    <td className="px-4 py-3">
                      {product.featured ? (
                        <span className="text-green-600">Yes</span>
                      ) : (
                        <span className="text-beige-400">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-beige-500">
            {loading ? "Loading..." : "No products yet. Add your first product!"}
          </p>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-sm border border-beige-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-beige-500">
            {title}
          </p>
          <p className="mt-2 font-serif text-2xl text-brand-dark">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}
