export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card shadow-card">
      {/* Image Skeleton */}
      <div className="relative aspect-square bg-muted/50">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="absolute left-1.5 top-1.5 sm:left-3 sm:top-3">
          <div className="h-5 w-14 sm:h-6 sm:w-16 rounded-full bg-muted animate-pulse-soft" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col p-2.5 sm:p-4">
        <div className="mb-1 h-2.5 w-12 sm:h-3 sm:w-16 rounded bg-muted animate-pulse-soft" />
        <div className="mb-1 h-3 w-full sm:h-4 rounded bg-muted animate-pulse-soft" />
        <div className="mb-2 h-3 w-3/4 sm:h-4 rounded bg-muted animate-pulse-soft" />
        <div className="mb-2 sm:mb-3 h-5 w-16 sm:h-6 sm:w-20 rounded bg-muted animate-pulse-soft" />
        <div className="h-8 w-full sm:h-9 rounded-lg bg-muted animate-pulse-soft" />
      </div>
    </div>
  );
};
