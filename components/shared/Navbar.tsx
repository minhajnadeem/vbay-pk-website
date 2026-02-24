"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useSearch } from "@/store/useSearch";

export function Navbar() {
  const items = useCart((state) => state.items);
  const openCart = useCart((state) => state.openCart);
  const { query, setQuery, clearQuery } = useSearch();
  const [mounted, setMounted] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mobileSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-black hover:opacity-80"
        >
          Vbay.pk
        </Link>

        {/* Desktop search — visible from md up */}
        <div className="hidden flex-1 max-w-md mx-4 md:block">
          <label htmlFor="navbar-search" className="sr-only">
            Search products
          </label>
          <input
            id="navbar-search"
            ref={searchInputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-full border border-black/15 bg-black/5 py-2 px-4 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            aria-label="Search products"
          />
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          {/* Mobile search icon — toggles expand */}
          <button
            type="button"
            className="rounded-full p-2 text-foreground transition hover:bg-black/5 md:hidden"
            aria-label={mobileSearchOpen ? "Close search" : "Search"}
            onClick={() => {
              setMobileSearchOpen((open) => !open);
              if (mobileSearchOpen) clearQuery();
            }}
          >
            {mobileSearchOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>
          <button
            type="button"
            onClick={openCart}
            className="relative rounded-full p-2 text-foreground transition hover:bg-black/5"
            aria-label={`Cart, ${count} items`}
          >
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            {mounted && count > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white"
                aria-hidden
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile expanded search bar */}
      {mobileSearchOpen && (
        <div className="border-t border-black/10 px-4 py-3 md:hidden">
          <label htmlFor="navbar-search-mobile" className="sr-only">
            Search products
          </label>
          <input
            id="navbar-search-mobile"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-lg border border-black/15 bg-black/5 py-2.5 px-4 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            aria-label="Search products"
          />
        </div>
      )}
    </header>
  );
}
