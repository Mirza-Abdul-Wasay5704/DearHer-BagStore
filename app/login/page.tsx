// app/login/page.tsx — Admin login page
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function LoginPage() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in as admin
  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      router.push("/admin");
    }
  }, [user, isAdmin, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      // AuthContext will update and trigger redirect
    } catch (err: unknown) {
      const firebaseErr = err as { code?: string };
      if (firebaseErr.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else if (firebaseErr.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-ivory">
      <div className="w-full max-w-md px-4">
        <div className="rounded-sm border border-beige-200 bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <Image
              src="/logo.png"
              alt="Dear Her"
              width={160}
              height={70}
              className="mx-auto h-16 w-auto"
            />
            <p className="mt-4 text-xs uppercase tracking-widest text-beige-400">
              Admin Access
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-beige-200 bg-white px-4 py-3 text-sm text-brand-dark placeholder-beige-400 focus:border-brand-accent focus:outline-none"
                placeholder="admin@dearher.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-beige-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-beige-200 bg-white px-4 py-3 text-sm text-brand-dark placeholder-beige-400 focus:border-brand-accent focus:outline-none"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 bg-brand-secondary py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-accent hover:text-brand-secondary disabled:opacity-50"
            >
              {loading && <LoadingSpinner size="sm" />}
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] text-beige-400">
            This area is restricted to authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}
