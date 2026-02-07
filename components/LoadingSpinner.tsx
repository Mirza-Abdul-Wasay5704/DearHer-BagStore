// components/LoadingSpinner.tsx — Elegant loading indicator
export default function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-beige-200 border-t-brand-accent`}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 font-serif text-sm tracking-widest text-beige-500">
          Loading...
        </p>
      </div>
    </div>
  );
}
