// components/AdminSidebar.tsx — Admin panel sidebar navigation
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: "📊",
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: "🛍",
  },
  {
    label: "Add Product",
    href: "/admin/products/new",
    icon: "➕",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-beige-200 bg-white">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b border-beige-200 px-6 py-5">
          <Link href="/" className="font-serif text-xl tracking-wider text-brand-dark">
            Dear Her
          </Link>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-beige-400">
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-sm px-3 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-brand-light text-brand-primary"
                    : "text-beige-600 hover:bg-beige-50 hover:text-brand-dark"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-beige-200 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-sm px-3 py-3 text-sm text-beige-600 transition-colors hover:bg-beige-50 hover:text-brand-dark"
          >
            <span>🌐</span>
            <span>View Store</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-sm px-3 py-3 text-sm text-beige-600 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
