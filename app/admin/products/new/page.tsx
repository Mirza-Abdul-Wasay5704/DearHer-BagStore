// app/admin/products/new/page.tsx — Add new product page
"use client";

import ProductForm from "@/components/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-brand-dark">Add New Product</h1>
        <p className="mt-1 text-sm text-beige-500">
          Fill in the details to add a new bag to the collection
        </p>
      </div>

      <div className="rounded-sm border border-beige-200 bg-white p-8">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
