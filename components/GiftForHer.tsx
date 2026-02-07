// components/GiftForHer.tsx — "Gift for Her" category section
import Link from "next/link";

const giftCategories = [
  {
    title: "For Mother",
    emoji: "💐",
    description: "Timeless elegance she'll treasure",
    query: "mother",
  },
  {
    title: "For Sister",
    emoji: "🌸",
    description: "A bond wrapped in style",
    query: "sister",
  },
  {
    title: "For Wife",
    emoji: "💕",
    description: "Love in every detail",
    query: "wife",
  },
  {
    title: "For Girlfriend",
    emoji: "🌹",
    description: "Make her smile today",
    query: "girlfriend",
  },
  {
    title: "For Friend",
    emoji: "✨",
    description: "Because she's worth it",
    query: "friend",
  },
  {
    title: "For Yourself",
    emoji: "🎀",
    description: "You deserve this",
    query: "yourself",
  },
];

export default function GiftForHer() {
  return (
    <section id="gift-for-her" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
            Gift Guide
          </p>
          <h2 className="mt-4 font-serif text-3xl text-brand-dark md:text-4xl">
            A Gift for Her
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-beige-500">
            Find the perfect bag for the special woman in your life
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {giftCategories.map((category) => (
            <Link
              key={category.query}
              href={`/shop?gift=${category.query}`}
              className="group flex flex-col items-center rounded-sm border border-beige-200 bg-ivory p-6 text-center transition-all duration-300 hover:border-brand-accent/30 hover:bg-white hover:shadow-sm"
            >
              <span className="text-3xl">{category.emoji}</span>
              <h3 className="mt-3 font-serif text-sm text-brand-dark">
                {category.title}
              </h3>
              <p className="mt-1 text-[11px] leading-relaxed text-beige-500">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
