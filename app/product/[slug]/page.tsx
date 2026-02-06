// app/product/[slug]/page.tsx — Product detail page
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product, getProductBySlug } from "@/lib/firestore";
import { useCart } from "@/contexts/CartContext";
import { generateWhatsAppUrl } from "@/utils/whatsapp";
import { formatPrice } from "@/utils/helpers";
import ProductGallery from "@/components/ProductGallery";
import { PageLoader } from "@/components/LoadingSpinner";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
        if (data?.colors?.length) {
          setSelectedColor(data.colors[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchProduct();
  }, [slug]);

  if (loading) return <PageLoader />;

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-cream">
        <div className="text-center">
          <span className="text-5xl">😔</span>
          <h2 className="mt-4 font-serif text-2xl text-brand-dark">
            Product Not Found
          </h2>
          <p className="mt-2 text-sm text-beige-500">
            This product may have been removed or doesn&apos;t exist.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block border border-brand-dark px-8 py-3 text-xs uppercase tracking-wider text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const productUrl = `${siteUrl}/product/${product.slug}`;

  const whatsappUrl = generateWhatsAppUrl({
    productName: product.name,
    price: product.price,
    color: selectedColor,
    size: product.size,
    productUrl,
    imageUrl: product.images?.[0],
  });

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images?.[0] || "",
      color: selectedColor,
      size: product.size,
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="bg-cream py-8 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-beige-500">
          <Link href="/" className="hover:text-brand-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-brand-primary">
            Shop
          </Link>
          <span>/</span>
          <span className="text-brand-dark">{product.name}</span>
        </nav>

        {/* Product Layout */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Gallery */}
          <ProductGallery
            images={product.images}
            productName={product.name}
          />

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              {product.featured && (
                <span className="mb-3 inline-block bg-brand-primary/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-brand-primary">
                  Featured
                </span>
              )}
              <h1 className="font-serif text-3xl text-brand-dark md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-3 text-2xl font-medium text-brand-primary">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm leading-relaxed text-beige-600">
                {product.description}
              </p>
            )}

            {/* Attributes */}
            <div className="space-y-4 border-t border-beige-200 pt-6">
              {product.patternType && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-beige-500">Pattern</span>
                  <span className="text-brand-dark">{product.patternType}</span>
                </div>
              )}
              {product.size && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-beige-500">Size</span>
                  <span className="text-brand-dark">{product.size}</span>
                </div>
              )}
              {product.material && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-beige-500">Material</span>
                  <span className="text-brand-dark">{product.material}</span>
                </div>
              )}
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-beige-600">
                  Color: <span className="text-brand-dark">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`border px-4 py-2 text-xs transition-all ${
                        selectedColor === color
                          ? "border-brand-primary bg-brand-primary text-white"
                          : "border-beige-200 text-beige-600 hover:border-brand-primary/50"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-beige-600">
                Quantity
              </label>
              <div className="inline-flex items-center border border-beige-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 text-beige-500 transition-colors hover:text-brand-dark"
                >
                  −
                </button>
                <span className="px-4 py-2.5 text-sm text-brand-dark">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2.5 text-beige-500 transition-colors hover:text-brand-dark"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "border border-brand-dark bg-brand-dark text-white hover:bg-transparent hover:text-brand-dark"
                }`}
              >
                {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
              </button>

              {/* WhatsApp Order */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 bg-green-600 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-green-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order on WhatsApp
              </a>
            </div>

            {/* Trust */}
            <div className="border-t border-beige-200 pt-6">
              <div className="grid grid-cols-3 gap-4 text-center text-[11px] text-beige-500">
                <div>
                  <span className="text-lg">🚚</span>
                  <p className="mt-1">Nationwide Delivery</p>
                </div>
                <div>
                  <span className="text-lg">🎁</span>
                  <p className="mt-1">Gift Wrapping</p>
                </div>
                <div>
                  <span className="text-lg">💯</span>
                  <p className="mt-1">Premium Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
