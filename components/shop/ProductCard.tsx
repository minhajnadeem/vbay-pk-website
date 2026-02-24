"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/constants/mockData";
import { PriceDisplay } from "./PriceDisplay";
import { useCart } from "@/store/useCart";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const openCart = useCart((state) => state.openCart);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    openCart();
    toast.success("Added to cart");
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-black/10 bg-white transition hover:border-black/20">
      <Link href={`/product/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/5">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition duration-300 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 25vw"
            unoptimized
          />
          {product.onSale && (
            <span className="absolute left-2 top-2 rounded bg-accent px-2 py-0.5 text-xs font-semibold text-white">
              Sale
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <p className="text-xs uppercase tracking-wider text-muted">
            {product.category}
          </p>
          <h2 className="mt-1 font-medium text-foreground line-clamp-2 group-hover:underline">
            {product.name}
          </h2>
          <div className="mt-2">
            <PriceDisplay
              basePrice={product.basePrice}
              salePrice={product.salePrice}
              onSale={product.onSale}
            />
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={handleQuickAdd}
        aria-label="Quick add to bag"
        className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white shadow-sm transition hover:border-accent hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </article>
  );
}
