// components/Footer.tsx — Site footer
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923141181535";

  return (
    <footer className="border-t border-beige-200 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/logo.png"
              alt="Dear Her"
              width={140}
              height={60}
              className="h-14 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-beige-600">
              Handpicked bags with artistic prints. Designed for the woman who
              appreciates elegance in every detail.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/shop">Shop</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
              Customer Care
            </h4>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/contact">Shipping Info</FooterLink>
              <FooterLink href="/contact">Returns</FooterLink>
              <FooterLink href="/contact">FAQ</FooterLink>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
              Connect With Us
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-beige-600 transition-colors hover:text-brand-accent"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/dearher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-beige-600 transition-colors hover:text-brand-accent"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/dearher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-beige-600 transition-colors hover:text-brand-accent"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-beige-200 pt-8 text-center">
          <p className="text-xs tracking-widest text-beige-500">
            © {currentYear} Dear Her. All rights reserved. Crafted with love.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-beige-600 transition-colors hover:text-brand-accent"
      >
        {children}
      </Link>
    </li>
  );
}
