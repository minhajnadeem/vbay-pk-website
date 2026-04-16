"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const STICKY_MESSAGE =
  "Hi, I want to order a product. Please share details and delivery information.";

export function StickyWhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl(STICKY_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open WhatsApp to place an order"
      className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-whatsapp/50 sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      <span>Order on WhatsApp</span>
    </a>
  );
}
