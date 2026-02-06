// app/about/page.tsx — About page
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Dear Her",
  description:
    "Discover the story behind Dear Her. We handpick artistic bags that celebrate the beauty in every woman.",
};

export default function AboutPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="bg-beige-50 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-primary">
            Our Story
          </p>
          <h1 className="mt-4 font-serif text-4xl text-brand-dark md:text-5xl">
            About Dear Her
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-beige-600">
            We believe every woman deserves to carry something that reflects
            her unique spirit — not just a bag, but a piece of art.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-8 text-center">
            <div>
              <h2 className="font-serif text-2xl text-brand-dark md:text-3xl">
                The Beginning
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-beige-600">
                Dear Her started with a simple realization — finding a bag
                that&apos;s both beautiful and meaningful shouldn&apos;t be so hard.
                We set out to change that by curating bags with artistic
                prints that speak to the soul.
              </p>
            </div>

            <div className="mx-auto h-px w-16 bg-brand-primary/30" />

            <div>
              <h2 className="font-serif text-2xl text-brand-dark md:text-3xl">
                Our Philosophy
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-beige-600">
                We don&apos;t follow trends — we follow art. Every bag in our
                collection is handpicked for its artistic merit, quality
                craftsmanship, and emotional resonance. We believe in less
                but better.
              </p>
            </div>

            <div className="mx-auto h-px w-16 bg-brand-primary/30" />

            <div>
              <h2 className="font-serif text-2xl text-brand-dark md:text-3xl">
                The Gift of Giving
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-beige-600">
                We understand that a bag can be more than an accessory —
                it can be a message. &quot;Dear Her&quot; is that message. Whether
                you&apos;re gifting it to your mother, sister, wife, friend,
                or yourself — you&apos;re saying &quot;you deserve something
                beautiful.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-beige-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-3xl text-brand-dark">
            What We Stand For
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            <ValueCard
              emoji="🎨"
              title="Artistic Curation"
              description="Every print tells a story. We search far and wide for designs that are truly unique and emotionally meaningful."
            />
            <ValueCard
              emoji="✨"
              title="Premium Quality"
              description="We never compromise on materials or craftsmanship. Each bag is made to last and designed to impress."
            />
            <ValueCard
              emoji="💝"
              title="Gift-Worthy"
              description="From packaging to presentation, every Dear Her bag is designed to be the perfect gift for someone special."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-sm border border-beige-200 bg-white p-8 text-center">
      <span className="text-4xl">{emoji}</span>
      <h3 className="mt-4 font-serif text-lg text-brand-dark">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-beige-600">
        {description}
      </p>
    </div>
  );
}
