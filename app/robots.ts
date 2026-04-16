import type { MetadataRoute } from "next";
import { DEFAULT_SITE_URL } from "@/constants/siteInfo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${DEFAULT_SITE_URL}/sitemap.xml`,
    host: DEFAULT_SITE_URL,
  };
}
