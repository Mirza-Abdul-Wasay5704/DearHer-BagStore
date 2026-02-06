// app/not-found.tsx — Custom 404 page
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-cream">
      <div className="text-center">
        <p className="font-serif text-8xl text-beige-200">404</p>
        <h1 className="mt-4 font-serif text-2xl text-brand-dark">
          Page Not Found
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-beige-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="border border-brand-dark bg-brand-dark px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-transparent hover:text-brand-dark"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="border border-brand-primary px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-brand-primary transition-all hover:bg-brand-primary hover:text-white"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
