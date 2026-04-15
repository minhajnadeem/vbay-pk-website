import { readdir } from "node:fs/promises";
import path from "node:path";
import type { Product } from "@/constants/mockData";

const POSTS_DIR = path.join(process.cwd(), "public", "images", "posts");

function toTitleCaseFromSlug(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
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
