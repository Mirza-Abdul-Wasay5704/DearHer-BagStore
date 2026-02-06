// app/admin/layout.tsx — Admin layout with sidebar (no Navbar/Footer)
"use client";

import AdminGuard from "@/components/AdminGuard";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      {/* Hide the main Navbar & Footer for admin pages via negative margin hack,
          or better: admin uses its own shell. We wrap it so the root layout's
          Navbar/Footer are visually overridden. */}
      <style jsx global>{`
        nav.fixed { display: none !important; }
        footer { display: none !important; }
        main { padding-top: 0 !important; }
      `}</style>

      <div className="flex min-h-screen bg-beige-50">
        <AdminSidebar />
        <div className="ml-64 flex-1">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </AdminGuard>
  );
}
