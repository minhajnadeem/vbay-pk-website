"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/constants/mockData";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

interface ProductGridProps {
  products: Product[];
  /** Show skeleton briefly before products for a fast-loading vibe. Default true. */
  useSkeleton?: boolean;
}

const SKELETON_COUNT = 8;

export function ProductGrid({ products, useSkeleton = true }: ProductGridProps) {
  const [showContent, setShowContent] = useState(!useSkeleton);

  useEffect(() => {
    if (!useSkeleton) return;
    const t = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(t);
  }, [useSkeleton]);

  if (useSkeleton && !showContent) {
    return (
      <ul
        className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6"
        aria-busy="true"
        aria-label="Loading products"
      >
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <li key={i}>
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6"
      aria-busy="false"
    >
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
