"use client";

import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart, type CartItem } from "@/store/useCart";
import { buildWhatsAppUrl, cartOrderMessage } from "@/lib/whatsapp";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function OrderViaWhatsAppButton({
  items,
  subtotal,
  formatPrice,
}: {
  items: CartItem[];
  subtotal: number;
  formatPrice: (price: number) => string;
}) {
  const itemLines = items.map(
    (i) => `- ${i.quantity}x ${i.name} (Rs. ${formatPrice(i.salePrice)} each)`
  );
  const message = cartOrderMessage({
    itemLines,
    subtotalFormatted: formatPrice(subtotal),
  });
  const href = buildWhatsAppUrl(message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-whatsapp py-3.5 font-semibold text-white transition hover:opacity-90"
    >
      <MessageCircle className="h-5 w-5" />
      Order via WhatsApp
    </a>
  );
}

function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  const handleDecrease = () => {
    if (item.quantity <= 1) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="flex gap-3 border-b border-black/10 py-4 last:border-0">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-black/5">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
          unoptimized
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate font-medium text-foreground">{item.name}</p>
        <p className="mt-0.5 font-semibold text-accent">
          Rs. {formatPrice(item.salePrice)}
        </p>
        <div className="mt-2 flex items-center gap-1">
          <button
            type="button"
            onClick={handleDecrease}
            aria-label="Decrease quantity"
            className="flex h-8 w-8 items-center justify-center rounded border border-black/15 bg-white transition hover:bg-black/5"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[2ch] px-2 text-center text-sm font-medium">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrease}
            aria-label="Increase quantity"
            className="flex h-8 w-8 items-center justify-center rounded border border-black/15 bg-white transition hover:bg-black/5"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { items, isOpen, closeCart } = useCart();

  const subtotal = items.reduce((sum, i) => sum + i.salePrice * i.quantity, 0);
  const totalSavings = items.reduce(
    (sum, i) => (i.onSale ? sum + (i.basePrice - i.salePrice) * i.quantity : sum),
    0
  );

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        onClick={closeCart}
        className="fixed inset-0 z-50 bg-black/40 transition-opacity"
        aria-label="Close cart"
      />
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-black/10 bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
          <h2 id="cart-drawer-title" className="text-lg font-semibold">
            Your Cart
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full p-2 transition hover:bg-black/5"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-muted">
              <ShoppingBag className="h-16 w-16 opacity-40" />
              <p className="text-center">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-0">
              {items.map((item) => (
                <CartLineItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-black/10 px-4 py-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium">Rs. {formatPrice(subtotal)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-accent">
                  <span>Total Savings</span>
                  <span className="font-medium">
                    Rs. {formatPrice(totalSavings)}
                  </span>
                </div>
              )}
            </div>
            <OrderViaWhatsAppButton
              items={items}
              subtotal={subtotal}
              formatPrice={formatPrice}
            />
          </div>
        )}
      </aside>
    </>
  );
}
