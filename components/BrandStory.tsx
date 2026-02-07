// components/BrandStory.tsx — Brand story section for homepage
import Image from "next/image";

export default function BrandStory() {
  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-beige-200">
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-beige-100 to-beige-200">
                <Image
                  src="/logo.png"
                  alt="Dear Her"
                  width={280}
                  height={200}
                  className="w-3/4 max-w-[280px]"
                />
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-sm border border-brand-accent/20" />
          </div>

          {/* Text Side */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
              Our Story
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-snug text-brand-dark md:text-4xl">
              Born From a Love
              <br />
              for Beautiful Things
            </h2>
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-beige-600">
              <p>
                Dear Her was born from a simple belief: every woman deserves
                to carry something that reflects her unique spirit. Not just
                a bag — but a piece of art she can hold.
              </p>
              <p>
                We travel, we search, we handpick. Each print is chosen for
                its artistic merit, its emotional resonance, and its ability
                to make her feel special.
              </p>
              <p>
                Our bags aren&apos;t mass-produced. They&apos;re curated — like a
                boutique gallery you can carry on your shoulder.
              </p>
            </div>

            {/* Values */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-beige-200 pt-8">
              <div>
                <p className="font-serif text-2xl text-brand-accent">100%</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-beige-500">
                  Handpicked
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl text-brand-accent">500+</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-beige-500">
                  Happy Customers
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl text-brand-accent">50+</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-beige-500">
                  Unique Prints
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
