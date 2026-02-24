export interface Product {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  salePrice: number;
  onSale: boolean;
  category: string;
  imageUrl: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max Case",
    description:
      "Slim, protective case with precise cutouts for camera and ports. Shock-absorbent edges and scratch-resistant back. Available in multiple finishes.",
    basePrice: 3499,
    salePrice: 2799,
    onSale: true,
    category: "General",
    imageUrl: "https://picsum.photos/seed/iphone15-case/600/750",
  },
  {
    id: "2",
    name: "MagSafe Wireless Charger",
    description:
      "Fast 15W MagSafe-compatible wireless charger. Perfect alignment every time. Compatible with iPhone 12 and later. Includes power adapter.",
    basePrice: 5499,
    salePrice: 4399,
    onSale: true,
    category: "General",
    imageUrl: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=600&q=80",
  },
  {
    id: "3",
    name: "USB-C to Lightning Cable",
    description:
      "Durable 1m cable with braided nylon. MFi certified for safe, fast charging and data sync. Reinforced connectors for long-lasting use.",
    basePrice: 1999,
    salePrice: 1499,
    onSale: true,
    category: "General",
    imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
  },
  {
    id: "4",
    name: "iPhone Screen Protector Pack",
    description:
      "2-pack tempered glass screen protectors. 9H hardness, oleophobic coating. Easy installation kit included. Full coverage for your iPhone display.",
    basePrice: 1299,
    salePrice: 999,
    onSale: true,
    category: "General",
    imageUrl: "https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?w=600&q=80",
  },
];

export function getProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}
