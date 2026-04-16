import { readdir } from "node:fs/promises";
import path from "node:path";
import type { Product } from "@/constants/mockData";

const POSTS_DIR = path.join(process.cwd(), "public", "images", "posts");

const TRAILING_SLUG_PARTS = new Set(["promo", "post", "image", "img", "banner"]);

const TOKEN_REPLACEMENTS: Record<string, string> = {
  iphone: "iPhone",
  ipad: "iPad",
  macbook: "MacBook",
  samsung: "Samsung",
  galaxy: "Galaxy",
  nokia: "Nokia",
  oppo: "OPPO",
  vivo: "vivo",
  xiaomi: "Xiaomi",
  redmi: "Redmi",
  infinix: "Infinix",
  tecno: "Tecno",
  usb: "USB",
  c: "C",
  lightning: "Lightning",
  hd: "HD",
  pro: "Pro",
  max: "Max",
  plus: "Plus",
  ultra: "Ultra",
};

function formatSlugToken(token: string): string {
  const normalized = token.trim();
  if (!normalized) return "";

  const lower = normalized.toLowerCase();
  if (TOKEN_REPLACEMENTS[lower]) {
    return TOKEN_REPLACEMENTS[lower];
  }

  if (/^[a-z]\d+[a-z]?$/i.test(normalized)) {
    return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
  }

  if (/^\d+[a-z]+$/i.test(normalized)) {
    return normalized.toUpperCase();
  }

  if (/^[a-z]+-?\d+[a-z-]*$/i.test(normalized) && /\d/.test(normalized)) {
    return normalized.replace(/[a-z]+|\d+/gi, (part) =>
      /^\d+$/.test(part)
        ? part
        : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    );
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
}

function toTitleCaseFromSlug(value: string): string {
  const parts = value
    .split(/[-_]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  while (parts.length > 1 && TRAILING_SLUG_PARTS.has(parts.at(-1)?.toLowerCase() ?? "")) {
    parts.pop();
  }

  const formattedParts: string[] = [];

  for (let index = 0; index < parts.length; index += 1) {
    const current = parts[index];
    const next = parts[index + 1];

    if (current.toLowerCase() === "usb" && next?.toLowerCase() === "c") {
      formattedParts.push("USB-C");
      index += 1;
      continue;
    }

    formattedParts.push(formatSlugToken(current));
  }

  return formattedParts.join(" ").trim();
}

function toPostIdFromBaseName(baseName: string): string {
  return `post-${encodeURIComponent(baseName)}`;
}

function parsePostId(id: string): string | null {
  if (!id.startsWith("post-")) return null;
  const encoded = id.slice("post-".length);
  if (!encoded) return null;
  try {
    return decodeURIComponent(encoded);
  } catch {
    return null;
  }
}

export async function getPostProducts(): Promise<Product[]> {
  const files = await readdir(POSTS_DIR);

  return files
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort((b, a) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    )
    .map((file) => {
      const baseName = path.parse(file).name;
      const displayName = toTitleCaseFromSlug(baseName) || "Vbay Product";
      return {
        id: toPostIdFromBaseName(baseName),
        name: displayName,
        description:
          "Message us on WhatsApp for latest price, available variants, and delivery details.",
        basePrice: 0,
        salePrice: 0,
        onSale: false,
        category: "General",
        imageUrl: `/images/posts/${file}`,
      } satisfies Product;
    });
}

export async function getPostProductById(id: string): Promise<Product | null> {
  const baseName = parsePostId(id);
  if (!baseName) return null;

  const files = await readdir(POSTS_DIR);
  const matched = files.find((file) => path.parse(file).name === baseName);
  if (!matched || !/\.(jpg|jpeg|png|webp)$/i.test(matched)) return null;

  const displayName = toTitleCaseFromSlug(baseName) || "Vbay Product";
  return {
    id,
    name: displayName,
    description:
      "Message us on WhatsApp for latest price, available variants, and delivery details.",
    basePrice: 0,
    salePrice: 0,
    onSale: false,
    category: "General",
    imageUrl: `/images/posts/${matched}`,
  };
}
