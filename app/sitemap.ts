import type { MetadataRoute } from "next";
import { DEFAULT_SITE_URL } from "@/constants/siteInfo";
import { getPostProducts } from "@/lib/postProducts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getPostProducts();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${DEFAULT_SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${DEFAULT_SITE_URL}/products`,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${DEFAULT_SITE_URL}/product/${product.id}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
