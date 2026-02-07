// components/HeroSection.tsx — Homepage hero with emotional copy
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center bg-gradient-to-b from-ivory to-ivory">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #E7C1B3 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Tagline */}
        <p className="animate-fade-in text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
          Handpicked Elegance
        </p>

        {/* Main Heading */}
        <h1 className="animate-slide-up mt-6 font-serif text-4xl leading-tight text-brand-dark sm:text-5xl md:text-6xl lg:text-7xl">
          Because She Deserves
          <br />
          <span className="italic text-brand-accent">Something Beautiful</span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-beige-600 md:text-lg">
          Artistic prints. Premium craftsmanship. Every bag tells a story —
          make it hers.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/shop"
            className="inline-block border border-brand-secondary bg-brand-secondary px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-brand-accent hover:border-brand-accent hover:text-brand-secondary"
          >
            Shop Collection
          </Link>
          <Link
            href="#gift-for-her"
            className="inline-block border border-brand-accent px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-brand-dark transition-all hover:bg-brand-accent hover:text-brand-secondary"
          >
            Find a Gift
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex items-center justify-center gap-8 text-xs tracking-wider text-beige-500">
          <span>✦ Free Gift Wrapping</span>
          <span className="hidden sm:inline">✦ Nationwide Delivery</span>
          <span>✦ Premium Quality</span>
        </div>
      </div>
    </section>
  );
}
