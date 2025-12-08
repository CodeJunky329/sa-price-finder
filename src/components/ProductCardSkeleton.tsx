export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] sm:aspect-square bg-muted">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
          <div className="h-5 w-14 sm:h-6 sm:w-16 rounded-full bg-muted animate-pulse-soft" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="h-2.5 w-14 sm:h-3 sm:w-16 rounded bg-muted animate-pulse-soft" />
        <div className="space-y-1.5 sm:space-y-2">
          <div className="h-3 w-full sm:h-4 rounded bg-muted animate-pulse-soft" />
          <div className="h-3 w-2/3 sm:h-4 rounded bg-muted animate-pulse-soft" />
        </div>
        <div className="flex items-center justify-between sm:flex-col sm:gap-3">
          <div className="h-5 w-16 sm:h-6 sm:w-20 rounded bg-muted animate-pulse-soft" />
          <div className="h-8 w-20 sm:h-9 sm:w-full rounded-lg bg-muted animate-pulse-soft" />
        </div>
      </div>
    </div>
  );
};
