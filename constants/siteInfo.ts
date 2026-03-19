import { Facebook, Instagram } from "lucide-react";

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

