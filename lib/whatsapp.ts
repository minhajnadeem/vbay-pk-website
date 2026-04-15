import { WHATSAPP_NUMBER_E164 } from "@/constants/siteInfo";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(message)}`;
}

/** Prefilled line for product detail “contact us” CTA. */
export function productInquiryMessage(
  productName?: string | null,
  priceFormatted?: string,
  productPageUrl?: string | null
): string {
  const trimmed = productName?.trim();
  const opener = trimmed
    ? `Hi Vbay — I'm interested in: ${trimmed}.`
    : `Hi Vbay — I'm interested in this item. Please share details.`;
  const link = productPageUrl?.trim();
  const lines = [
    opener,
    ...(priceFormatted ? [`Price shown: ${priceFormatted}`] : []),
    ...(link ? [`Item link: ${link}`] : []),
    "",
    "My details: [Name], [City], [Phone]",
  ];
  return lines.join("\n");
}

/** Cart checkout message (used from cart drawer). */
export function cartOrderMessage(lines: {
  itemLines: string[];
  subtotalFormatted: string;
}): string {
  return [
    "Hi Vbay! I'd like to order:",
    ...lines.itemLines,
    `Subtotal: Rs. ${lines.subtotalFormatted}`,
    "",
    "My details: [Name], [City], [Phone]",
  ].join("\n");
}
