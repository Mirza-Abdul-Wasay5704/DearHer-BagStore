// app/shop/loading.tsx — Shop page loading skeleton
export default function ShopLoading() {
  return (
    <div className="bg-cream">
      {/* Header skeleton */}
      <section className="bg-beige-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto h-3 w-24 animate-pulse rounded bg-beige-200" />
          <div className="mx-auto mt-4 h-8 w-48 animate-pulse rounded bg-beige-200" />
          <div className="mx-auto mt-3 h-3 w-16 animate-pulse rounded bg-beige-200" />
        </div>
      </section>

      {/* Product grid skeleton */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-12">
            <div className="hidden lg:block">
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 animate-pulse rounded bg-beige-200" />
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] rounded-sm bg-beige-200" />
                    <div className="mt-4 space-y-2 text-center">
                      <div className="mx-auto h-4 w-3/4 rounded bg-beige-200" />
                      <div className="mx-auto h-3 w-1/2 rounded bg-beige-200" />
                      <div className="mx-auto h-4 w-1/3 rounded bg-beige-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
