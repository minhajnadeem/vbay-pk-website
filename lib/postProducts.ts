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
    file: "iphone_14.jpeg",
    name: "iPhone 14",
  },
  {
    file: "power_adapter.jpeg",
    name: "Power Adapter",
  },
  {
    file: "airpod_pro.png",
    name: "AirPods Pro",
  },
  {
    file: "mini_handheld_fan.png",
    name: "Mini Handheld Fan",
  },
    {
    file: "iphone_cables.png",
    name: "iPhone Cables",
  },
  {
    file: "hmd_barbie_phone.png",
    name: "HMD Barbie Phone",
  },
  {
    file: "macbook_pro.png",
    name: "MacBook Pro",
  },
  {
    file: "ipad_pro.png",
    name: "iPad Pro",
  },
   {
    file: "iphone_13.png",
    name: "iPhone 13",
  },
  {
    file: "apple_vision_pro.png",
    name: "Apple Vision Pro",
  },
  {
    file: "iphone_17.png",
    name: "iPhone 17",
  },
  {
    file: "apple_watch_series_11.png",
    name: "Apple Watch Series 11",
  },
  {
    file: "latest_iphone_lineup.png",
    name: "Latest iPhone Lineup",
  },
  {
    file: "macbook_neo.png",
    name: "MacBook Neo",
  },
  {
    file: "buy_laptop_from_vbay.jpeg",
    name: "Buy Laptop From Vbay",
  },
  {
    file: "iphone-17-pro-max-clear-case-with-magsafe.jpg",
    name: "iphone 17 Pro Clear Silicone Case With Magsafe",
  },
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
    file: "display_adapter.jpeg",
    name: "Display Adapter",
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
