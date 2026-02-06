// app/contact/page.tsx — Contact page
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Dear Her",
  description:
    "Get in touch with Dear Her. We're here to help you find the perfect bag.",
};

export default function ContactPage() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923141181535";

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="bg-beige-50 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-primary">
            Get in Touch
          </p>
          <h1 className="mt-4 font-serif text-4xl text-brand-dark md:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-beige-600">
            We&apos;d love to hear from you. Whether you have a question, need help
            choosing, or just want to say hello.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 md:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h2 className="font-serif text-2xl text-brand-dark">
                  Let&apos;s Connect
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-beige-600">
                  The quickest way to reach us is through WhatsApp. We
                  typically respond within a few hours.
                </p>
              </div>

              <div className="space-y-6">
                <ContactItem
                  icon="💬"
                  title="WhatsApp"
                  detail="Chat with us"
                  href={`https://wa.me/${whatsappNumber}`}
                />
                <ContactItem
                  icon="📧"
                  title="Email"
                  detail="hello@dearher.com"
                  href="mailto:hello@dearher.com"
                />
                <ContactItem
                  icon="📍"
                  title="Location"
                  detail="Pakistan"
                  href="#"
                />
                <ContactItem
                  icon="📸"
                  title="Instagram"
                  detail="@dearher"
                  href="https://instagram.com/dearher"
                />
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  "Hi! I have a question about Dear Her bags 🎀"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-green-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Message Us on WhatsApp
              </a>
            </div>

            {/* Contact Form */}
            <div className="rounded-sm border border-beige-200 bg-white p-8">
              <h3 className="font-serif text-xl text-brand-dark">
                Send a Message
              </h3>
              <p className="mt-2 text-xs text-beige-500">
                Fill out the form and we&apos;ll get back to you soon.
              </p>

              <form className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-beige-200 bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-primary focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border border-beige-200 bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-primary focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border border-beige-200 bg-white px-4 py-3 text-sm text-brand-dark focus:border-brand-primary focus:outline-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-dark py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-primary"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactItem({
  icon,
  title,
  detail,
  href,
}: {
  icon: string;
  title: string;
  detail: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 transition-colors hover:text-brand-primary"
    >
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-beige-500">
          {title}
        </p>
        <p className="mt-1 text-sm text-brand-dark">{detail}</p>
      </div>
    </a>
  );
}
