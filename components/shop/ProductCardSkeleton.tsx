"use client";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-black/10 bg-white">
      <div className="aspect-[4/5] w-full animate-pulse bg-black/10" />
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="h-3 w-12 animate-pulse rounded bg-black/10" />
        <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-black/10" />
        <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-black/10" />
        <div className="mt-3 flex gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-black/10" />
          <div className="h-4 w-12 animate-pulse rounded bg-black/10" />
        </div>
      </div>
    </div>
  );
}
