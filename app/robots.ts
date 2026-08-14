import type { MetadataRoute } from "next";

import { isProductionEnvironment } from "@/lib/env";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionEnvironment) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
