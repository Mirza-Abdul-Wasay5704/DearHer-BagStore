// app/product/[slug]/loading.tsx — Product detail loading skeleton
export default function ProductLoading() {
  return (
    <div className="bg-ivory py-8 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-8 flex items-center gap-2">
          <div className="h-3 w-10 animate-pulse rounded bg-beige-200" />
          <span className="text-beige-300">/</span>
          <div className="h-3 w-10 animate-pulse rounded bg-beige-200" />
          <span className="text-beige-300">/</span>
          <div className="h-3 w-24 animate-pulse rounded bg-beige-200" />
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Gallery skeleton */}
          <div className="aspect-square animate-pulse rounded-sm bg-beige-200" />

          {/* Info skeleton */}
          <div className="space-y-6">
            <div className="h-8 w-3/4 animate-pulse rounded bg-beige-200" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-beige-200" />
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-beige-200" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-beige-200" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-beige-200" />
            </div>
            <div className="h-12 w-full animate-pulse rounded bg-beige-200" />
            <div className="h-12 w-full animate-pulse rounded bg-beige-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
