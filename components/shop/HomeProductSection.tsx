"use client";

import { useMemo } from "react";
import { MOCK_PRODUCTS } from "@/constants/mockData";
import { useSearch } from "@/store/useSearch";
import { ProductGrid } from "./ProductGrid";
import { Search } from "lucide-react";

const GENERAL_COLLECTION = MOCK_PRODUCTS.filter(
  (p) => p.category.toLowerCase() === "general"
);

function filterByQuery(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return GENERAL_COLLECTION;
  return GENERAL_COLLECTION.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      (p.description ?? "").toLowerCase().includes(q)
  );
}

export function HomeProductSection() {
  const query = useSearch((state) => state.query);
  const filtered = useMemo(
    () => filterByQuery(query),
    [query]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 lg:mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          iPhone & Accessories
        </h1>
        <p className="mt-1 text-muted">
          Premium cases, chargers, cables and more for your iPhone.
        </p>
      </div>

      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-black/20 bg-black/5 py-16 px-6 text-center"
          role="status"
          aria-label="No products match your search"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/10 text-muted">
            <Search className="h-7 w-7" aria-hidden />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">
            No products found
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted">
            {query
              ? `No items in General match "${query}". Try a different search or browse all products.`
              : "There are no products in this category right now."}
          </p>
          {query && (
            <button
              type="button"
              className="mt-6 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
              onClick={() => useSearch.getState().clearQuery()}
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  );
}
