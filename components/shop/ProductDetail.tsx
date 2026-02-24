"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, RefreshCw, Zap, ShoppingCart, MessageCircle, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/constants/mockData";
import { useCart } from "@/store/useCart";

const WHATSAPP_NUMBER = "923001234567"; // placeholder
const formatPrice = (price: number) => `Rs. ${price.toLocaleString("en-PK")}`;

function WhatsAppLink({ product }: { product: Product }) {
  const message = encodeURIComponent(
    `Hi Vbay! I'd like to order:\n- 1x ${product.name} (${formatPrice(product.salePrice)})\nTotal: ${formatPrice(product.salePrice)}\nMy Details: [Name], [City]`
  );
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-whatsapp py-3.5 font-semibold text-white transition hover:opacity-90"
    >
      <MessageCircle className="h-5 w-5" />
      Order via WhatsApp
    </a>
  );
}

function Breadcrumbs({ productName }: { productName: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        <li>
          <Link href="/" className="hover:text-foreground hover:underline">
            Home
          </Link>
        </li>
        <li className="flex items-center gap-1.5" aria-hidden>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </li>
        <li>
          <Link href="/" className="hover:text-foreground hover:underline">
            General
          </Link>
        </li>
        <li className="flex items-center gap-1.5" aria-hidden>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </li>
        <li className="text-foreground font-medium truncate max-w-[12rem] sm:max-w-none" aria-current="page">
          {productName}
        </li>
      </ol>
    </nav>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const openCart = useCart((state) => state.openCart);

  const percentOff =
    product.onSale && product.basePrice > 0
      ? Math.round(((product.basePrice - product.salePrice) / product.basePrice) * 100)
      : 0;

  const handleAddToCart = () => {
    addItem(product);
    openCart();
    toast.success("Added to cart");
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-32 sm:px-6 md:pb-8">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Large image — left on desktop, top on mobile */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-black/5">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized
            />
            {product.onSale && (
              <span className="absolute left-3 top-3 rounded bg-accent px-2.5 py-1 text-sm font-semibold text-white">
                Sale · {percentOff}% off
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Breadcrumbs productName={product.name} />

            {/* High-quality typography for product title */}
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl lg:leading-tight">
              {product.name}
            </h1>

            {/* Prominent sale price block */}
            <div className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-4 sm:p-5">
              {product.onSale ? (
                <>
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Sale price
                  </span>
                  <div className="mt-1 flex flex-wrap items-baseline gap-3">
                    <span className="text-2xl font-bold text-accent sm:text-3xl">
                      {formatPrice(product.salePrice)}
                    </span>
                    {product.basePrice > product.salePrice && (
                      <>
                        <span className="text-base text-muted line-through">
                          {formatPrice(product.basePrice)}
                        </span>
                        <span className="rounded bg-accent/20 px-2 py-0.5 text-sm font-semibold text-accent">
                          {percentOff}% off
                        </span>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <span className="text-2xl font-bold text-foreground sm:text-3xl">
                  {formatPrice(product.salePrice)}
                </span>
              )}
            </div>

            {product.description && (
              <p className="mt-6 text-muted leading-relaxed">{product.description}</p>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-foreground bg-foreground py-3.5 font-semibold text-background transition hover:opacity-90"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              <WhatsAppLink product={product} />
            </div>

            <ul className="mt-8 flex flex-wrap gap-6 border-t border-black/10 pt-6">
              <li className="flex items-center gap-2 text-sm text-muted">
                <Package className="h-5 w-5 shrink-0" aria-hidden />
                Cash on Delivery Available
              </li>
              <li className="flex items-center gap-2 text-sm text-muted">
                <RefreshCw className="h-5 w-5 shrink-0" aria-hidden />
                7-Day Easy Exchange
              </li>
              <li className="flex items-center gap-2 text-sm text-muted">
                <Zap className="h-5 w-5 shrink-0" aria-hidden />
                Fast Shipping
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sticky action bar on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-3 border-t border-black/10 bg-white p-4 md:hidden">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-foreground bg-foreground px-4 py-3 font-semibold text-background"
        >
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </button>
        <WhatsAppLink product={product} />
      </div>
    </>
  );
}
