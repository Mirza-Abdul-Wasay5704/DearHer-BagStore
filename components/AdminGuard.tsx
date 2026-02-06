// components/AdminGuard.tsx — Protects admin routes
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { PageLoader } from "./LoadingSpinner";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (!isAdmin) {
        router.push("/");
      }
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return <PageLoader />;
  }

  if (!user || !isAdmin) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
