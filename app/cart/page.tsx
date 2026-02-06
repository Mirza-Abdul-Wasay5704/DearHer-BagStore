// app/cart/page.tsx — Cart page with WhatsApp checkout
"use client";

import { useCart } from "@/contexts/CartContext";
import { generateCartWhatsAppUrl } from "@/utils/whatsapp";
import { formatPrice } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-cream">
        <div className="text-center">
          <span className="text-5xl">🛍</span>
          <h2 className="mt-4 font-serif text-2xl text-brand-dark">
            Your Cart is Empty
          </h2>
          <p className="mt-2 text-sm text-beige-500">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block border border-brand-dark px-8 py-3 text-xs uppercase tracking-wider text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const whatsappUrl = generateCartWhatsAppUrl(
    items.map((item) => ({
      name: item.name,
      price: item.price,
      color: item.color,
      quantity: item.quantity,
    }))
  );

  return (
    <div className="bg-cream py-8 md:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-serif text-3xl text-brand-dark md:text-4xl">
            Your Cart
          </h1>
          <p className="mt-2 text-sm text-beige-500">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.color}`}
                className="flex gap-4 border border-beige-200 bg-white p-4 md:gap-6 md:p-6"
              >
                {/* Image */}
                <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-beige-100 md:h-32 md:w-28">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-2xl">🛍</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-serif text-sm text-brand-dark hover:text-brand-primary md:text-base"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-beige-500">
                      {item.color && <span>Color: {item.color}</span>}
                      {item.size && <span>Size: {item.size}</span>}
                    </div>
                    <p className="mt-2 text-sm font-medium text-brand-primary">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    {/* Quantity */}
                    <div className="inline-flex items-center border border-beige-200">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.color,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-3 py-1.5 text-xs text-beige-500 hover:text-brand-dark"
                      >
                        −
                      </button>
                      <span className="px-3 py-1.5 text-xs text-brand-dark">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="px-3 py-1.5 text-xs text-beige-500 hover:text-brand-dark"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id, item.color)}
                      className="text-xs text-beige-400 underline transition-colors hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="pt-2">
              <button
                onClick={clearCart}
                className="text-xs text-beige-400 underline transition-colors hover:text-red-500"
              >
                Clear entire cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-beige-200 bg-white p-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
                Order Summary
              </h3>

              <div className="mt-6 space-y-3 border-b border-beige-200 pb-6">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.color}-summary`}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-beige-600">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-brand-dark">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-brand-dark">
                  Total
                </span>
                <span className="font-serif text-xl text-brand-primary">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* WhatsApp Checkout */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 bg-green-600 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-green-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Checkout on WhatsApp
              </a>

              <p className="mt-4 text-center text-[11px] text-beige-400">
                You&apos;ll be redirected to WhatsApp to confirm your order
              </p>

              {/* Continue Shopping */}
              <Link
                href="/shop"
                className="mt-4 block text-center text-xs text-beige-500 underline transition-colors hover:text-brand-primary"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
