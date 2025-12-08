export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      {/* Image Skeleton */}
      <div className="relative aspect-square bg-muted">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="absolute left-3 top-3">
          <div className="h-6 w-16 rounded-full bg-muted animate-pulse-soft" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col gap-3 p-4">
        <div className="h-3 w-16 rounded bg-muted animate-pulse-soft" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-muted animate-pulse-soft" />
          <div className="h-4 w-2/3 rounded bg-muted animate-pulse-soft" />
        </div>
        <div className="h-6 w-20 rounded bg-muted animate-pulse-soft" />
        <div className="h-9 w-full rounded-lg bg-muted animate-pulse-soft" />
      </div>
    </div>
  );
};
