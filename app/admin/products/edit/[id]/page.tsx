// app/admin/products/edit/[id]/page.tsx — Edit product page
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product, getProductById } from "@/lib/firestore";
import ProductForm from "@/components/ProductForm";
import { PageLoader } from "@/components/LoadingSpinner";
import Link from "next/link";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    if (productId) fetchProduct();
  }, [productId]);

  if (loading) return <PageLoader />;

  if (!product) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="text-center">
          <span className="text-4xl">😔</span>
          <p className="mt-4 font-serif text-lg text-brand-dark">
            Product not found
          </p>
          <Link
            href="/admin/products"
            className="mt-4 inline-block text-sm text-brand-primary underline"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-brand-dark">Edit Product</h1>
        <p className="mt-1 text-sm text-beige-500">
          Editing: {product.name}
        </p>
      </div>

      <div className="rounded-sm border border-beige-200 bg-white p-8">
        <ProductForm
          mode="edit"
          initialData={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            description: product.description,
            images: product.images,
            patternType: product.patternType,
            colors: product.colors,
            size: product.size,
            material: product.material,
            featured: product.featured,
            stock: product.stock,
          }}
        />
      </div>
    </div>
  );
}
