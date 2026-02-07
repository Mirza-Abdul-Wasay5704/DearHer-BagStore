// components/ProductForm.tsx — Reusable form for adding/editing products
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductInput, addProduct, updateProduct } from "@/lib/firestore";
import { uploadProductImages } from "@/lib/storage";
import {
  slugify,
  PATTERN_TYPES,
  COLOR_OPTIONS,
  SIZE_OPTIONS,
  MATERIAL_OPTIONS,
} from "@/utils/helpers";
import LoadingSpinner from "./LoadingSpinner";

interface ProductFormProps {
  initialData?: ProductInput & { id?: string };
  mode: "create" | "edit";
}

export default function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const newFilesRef = useRef<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [formData, setFormData] = useState<ProductInput>({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    price: initialData?.price || 0,
    description: initialData?.description || "",
    images: initialData?.images || [],
    patternType: initialData?.patternType || "",
    colors: initialData?.colors || [],
    size: initialData?.size || "",
    material: initialData?.material || "",
    featured: initialData?.featured || false,
    stock: initialData?.stock || 0,
  });

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: mode === "create" ? slugify(name) : prev.slug,
    }));
  };

  const handleColorToggle = (color: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    const updated = [...newFilesRef.current, ...files];
    newFilesRef.current = updated;

    // Generate preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const removeExistingImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeNewFile = (index: number) => {
    const updatedFiles = newFilesRef.current.filter((_, i) => i !== index);
    newFilesRef.current = updatedFiles;
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate
      if (!formData.name.trim()) throw new Error("Product name is required");
      if (formData.price <= 0) throw new Error("Price must be greater than 0");

      // Upload new images via Cloudinary
      let uploadedUrls: string[] = [];
      const filesToUpload = newFilesRef.current;
      console.log("[ProductForm] Files to upload:", filesToUpload.length);
      console.log("[ProductForm] Existing images:", formData.images.length);
      if (filesToUpload.length > 0) {
        setError("Uploading images...");
        uploadedUrls = await uploadProductImages(filesToUpload, formData.slug);
        console.log("[ProductForm] Upload returned URLs:", uploadedUrls);
        setError("");
      }

      const productData: ProductInput = {
        ...formData,
        images: [...formData.images, ...uploadedUrls],
      };

      if (mode === "create") {
        await addProduct(productData);
      } else if (initialData?.id) {
        await updateProduct(initialData.id, productData);
      }

      // Success — redirect to products list
      router.push("/admin/products");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className={`rounded-sm border px-4 py-3 text-sm ${
          error === "Uploading images..."
            ? "border-blue-200 bg-blue-50 text-blue-600"
            : "border-red-200 bg-red-50 text-red-600"
        }`}>
          {error === "Uploading images..." && (
            <span className="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-blue-300 border-t-blue-600" />
          )}
          {error}
        </div>
      )}

      {/* Name & Slug */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
            Product Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full border border-beige-200 bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-accent focus:outline-none"
            placeholder="e.g., Floral Dreams Tote"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
            Slug
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, slug: e.target.value }))
            }
            className="w-full border border-beige-200 bg-ivory px-4 py-3 text-sm text-beige-600 focus:border-brand-accent focus:outline-none"
            placeholder="auto-generated-from-name"
          />
        </div>
      </div>

      {/* Price & Stock */}
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
            Price (PKR) *
          </label>
          <input
            type="number"
            value={formData.price || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
            className="w-full border border-beige-200 bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-accent focus:outline-none"
            placeholder="2500"
            min={0}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
            Stock
          </label>
          <input
            type="number"
            value={formData.stock || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                stock: Number(e.target.value),
              }))
            }
            className="w-full border border-beige-200 bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-accent focus:outline-none"
            placeholder="10"
            min={0}
          />
        </div>
        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  featured: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-beige-300 text-brand-accent focus:ring-brand-accent"
            />
            <span className="text-sm text-brand-dark">Featured Product</span>
          </label>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          rows={4}
          className="w-full border border-beige-200 bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-accent focus:outline-none"
          placeholder="Describe this beautiful bag..."
        />
      </div>

      {/* Attributes */}
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
            Pattern Type
          </label>
          <select
            value={formData.patternType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                patternType: e.target.value,
              }))
            }
            className="w-full border border-beige-200 bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-accent focus:outline-none"
          >
            <option value="">Select Pattern</option>
            {PATTERN_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
            Size
          </label>
          <select
            value={formData.size}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, size: e.target.value }))
            }
            className="w-full border border-beige-200 bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-accent focus:outline-none"
          >
            <option value="">Select Size</option>
            {SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
            Material
          </label>
          <select
            value={formData.material}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, material: e.target.value }))
            }
            className="w-full border border-beige-200 bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-accent focus:outline-none"
          >
            <option value="">Select Material</option>
            {MATERIAL_OPTIONS.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Colors */}
      <div>
        <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-beige-600">
          Available Colors
        </label>
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleColorToggle(color)}
              className={`rounded-sm border px-3 py-1.5 text-xs transition-all ${
                formData.colors.includes(color)
                  ? "border-brand-accent bg-brand-accent text-brand-secondary"
                  : "border-beige-200 text-beige-600 hover:border-brand-accent/50"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-beige-600">
          Product Images
        </label>

        {/* Existing Images */}
        {formData.images.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-3">
            {formData.images.map((url, index) => (
              <div key={index} className="group relative h-24 w-24">
                <Image
                  src={url}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="rounded-sm border border-beige-200 object-cover"
                  sizes="96px"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* New File Previews */}
        {previewUrls.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-3">
            {previewUrls.map((url, index) => (
              <div key={`new-${index}`} className="group relative h-24 w-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`New image ${index + 1}`}
                  className="h-full w-full rounded-sm border border-brand-accent/30 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeNewFile(index)}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="border border-dashed border-beige-300 px-6 py-4 text-sm text-beige-500 transition-colors hover:border-brand-accent hover:text-brand-accent"
        >
          + Upload Images
        </button>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4 border-t border-beige-200 pt-8">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-brand-secondary px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-accent hover:text-brand-secondary disabled:opacity-50"
        >
          {loading && <LoadingSpinner size="sm" />}
          {mode === "create" ? "Add Product" : "Update Product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-beige-500 transition-colors hover:text-brand-dark"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
