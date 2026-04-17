import type { Product } from "@/constants/mockData";

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

const POST_PRODUCT_LIST = [
  {
    file: "iphone-17-pro-silicone-case-with-magsafe-purple-fog.jpg",
    name: "iphone 17 Pro Silicone Case With Magsafe Purple Fog",
  },
  {
    file: "iphone-17-pro-max-silicone-case-with-magsafe-bright-guava.jpg",
    name: "iphone 17 Pro Max Silicone Case With Magsafe Bright Guava",
  },
  {
    file: "iphone-17e-silicone-case-with-magsafe-soft-pink.jpg",
    name: "iphone 17e Silicone Case With Magsafe Soft Pink",
  },
  {
    file: "iphone-17-pro-max-silicone-case-with-magsafe-black.jpg",
    name: "iphone 17 Pro Max Silicone Case With Magsafe Black",
  },
  {
    file: "iphone-16-silicone-case-with-magsafe-ultramarine.jpg",
    name: "iphone 16 Silicone Case With Magsafe Ultramarine",
  },
  {
    file: "iphone-16-pro-silicone-case-with-magsafe-periwinkle.jpg",
    name: "iphone 16 Pro Silicone Case With Magsafe Periwinkle",
  },
  {
    file: "iphone-16-pro-max-silicone-case-with-magsafe-tangerine.jpg",
    name: "iphone 16 Pro Max Silicone Case With Magsafe Tangerine",
  },
  {
    file: "iphone-16-pro-max-silicone-case-with-magsafe-black.jpg",
    name: "iphone 16 Pro Max Silicone Case With Magsafe Black",
  },
  {
    file: "iphone-15-plus-silicone-case-with-magsafe-light-pink.jpg",
    name: "iphone 15 Plus Silicone Case With Magsafe Light Pink",
  },
  {
    file: "iphone-15-plus-silicone-case-with-magsafe-storm-blue.jpg",
    name: "iphone 15 Plus Silicone Case With Magsafe Storm Blue",
  },
  {
    file: "iphone-15-pro-max-silicone-case-with-magsafe-clay.jpg",
    name: "iphone 15 Pro Max Silicone Case With Magsafe Clay",
  },
  {
    file: "iphone-15-silicone-case-with-magsafe-black.jpg",
    name: "iphone 15 Silicone Case With Magsafe Black",
  },
  {
    file: "iphone-17-pro-promo.jpg",
    name: "iPhone 17 Pro",
  },
  {
    file: "iphone-16-series-promo.jpg",
    name: "iPhone 16 Series",
  },
  {
    file: "iphone-16-pro-max-promo.jpg",
    name: "iPhone 16 Pro Max",
  },
  {
    file: "iphone-12.jpg",
    name: "iPhone 12",
  },
  {
    file: "iphone-12-best-price-promo.jpg",
    name: "iPhone 12 Promo",
  },
  {
    file: "iphone-13.jpeg",
    name: "iPhone 13",
  },
  {
    file: "iphone-13-accessories.jpeg",
    name: "iPhone 13 Accessories",
  },
  {
    file: "iphone-13-clear-case.jpeg",
    name: "iPhone 13 Clear Case",
  },
  {
    file: "iphone-13-privacy-glass.jpeg",
    name: "iPhone 13 Privacy Glass",
  },
  {
    file: "iphone-13-screen-protector.jpeg",
    name: "iPhone 13 Screen Protector",
  },
  {
    file: "usb-c-to-lightning-cable.jpeg",
    name: "USB-C to Lightning Cable",
  },
  {
    file: "airpods-pro-2.jpeg",
    name: "AirPods Pro 2",
  },
  {
    file: "hmd-barbie-phone-promo.jpg",
    name: "HMD Barbie Phone",
  },
  {
    file: "hmd-barbie-phone.jpg",
    name: "HMD Barbie Phone Box",
  },
  {
    file: "samsung-galaxy-a05s-promo.jpg",
    name: "Samsung Galaxy A05s",
  },
  {
    file: "nokia-130-2024-promo.jpg",
    name: "Nokia 130 (2024)",
  },
] as const;

function toPostProduct({
  file,
  name,
}: (typeof POST_PRODUCT_LIST)[number]): Product {
  const baseName = file.replace(/\.(jpg|jpeg|png|webp)$/i, "");

  return {
    id: toPostIdFromBaseName(baseName),
    name,
    description:
      "Message us on WhatsApp for latest price, available variants, and delivery details.",
    basePrice: 0,
    salePrice: 0,
    onSale: false,
    category: "General",
    imageUrl: `/images/posts/${file}`,
  };
}

export async function getPostProducts(): Promise<Product[]> {
  return POST_PRODUCT_LIST.map(toPostProduct);
}

export async function getPostProductById(id: string): Promise<Product | null> {
  const baseName = parsePostId(id);
  if (!baseName) return null;

  const matched = POST_PRODUCT_LIST.find(
    ({ file }) => file.replace(/\.(jpg|jpeg|png|webp)$/i, "") === baseName
  );

  if (!matched) return null;

  return {
    ...toPostProduct(matched),
    id,
  };
}
