import { Facebook, Instagram } from "lucide-react";

/**
 * WhatsApp Business number for `wa.me` links (digits only, country code, no +).
 * Override with `NEXT_PUBLIC_WHATSAPP_E164` in `.env.local` if needed.
 * Default matches CONTACT_INFO.phone (0319… → 92 319…).
 */
const whatsappFromEnv =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_WHATSAPP_E164?.replace(/\D/g, "") ?? ""
    : "";
export const WHATSAPP_NUMBER_E164 =
  whatsappFromEnv.length > 0 ? whatsappFromEnv : "923196873782";

/** Generic copy for product detail “About Vbay” (edit in one place). */
export const VBAY_PDP_COPY = {
  tagline: "Premium picks delivered across Pakistan.",
  aboutHeading: "Why shop with Vbay",
  aboutLead:
    "Vbay.pk is a curated catalog focused on quality and easy ordering. Message us on WhatsApp for stock, sizes, or anything else—we’ll help you place your order quickly.",
  aboutBullets: [
    "Cash on delivery available on supported orders",
    "7-day easy exchange where applicable",
    "Fast dispatch and careful packing",
  ],
} as const;

export const CONTACT_INFO = {
  phone: "0319 6873782",
  email: "vbay.pk@gmail.com",
} as const;

export const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/vbay.pk/",
    iconLabel: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://www.facebook.com/vbay.pk",
    iconLabel: "Facebook",
    icon: Facebook,
  },
] as const;

export function getPhoneTelHref(phone: string) {
  // Keep `tel:` URL digits-only so it works more reliably across devices.
  const digitsOnly = phone.replace(/\s+/g, "");
  return `tel:${digitsOnly}`;
}

export function getEmailMailtoHref(email: string) {
  return `mailto:${email}`;
}

/**
 * Public site origin without trailing slash (e.g. `https://vbay.pk`).
 * Set `NEXT_PUBLIC_SITE_URL` in production so WhatsApp messages include the correct absolute link before hydration.
 */
export function getPublicSiteBaseUrl(): string {
  const raw =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? ""
      : "";
  return raw.replace(/\/+$/, "");
}

/** Absolute product page URL, or empty string if `NEXT_PUBLIC_SITE_URL` is not set (use `window.location.origin` on the client). */
export function getProductPageUrl(productId: string): string {
  const base = getPublicSiteBaseUrl();
  return base ? `${base}/product/${productId}` : "";
}

