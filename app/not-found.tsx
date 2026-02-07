// app/not-found.tsx — Custom 404 page
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-ivory">
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
            className="border border-brand-secondary bg-brand-secondary px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-brand-accent hover:border-brand-accent hover:text-brand-secondary"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="border border-brand-accent px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-brand-dark transition-all hover:bg-brand-accent hover:text-brand-secondary"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
