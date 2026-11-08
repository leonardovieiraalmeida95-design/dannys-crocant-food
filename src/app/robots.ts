import type { MetadataRoute } from "next";

export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  // Allow crawlers to read the noindex directives on each demonstration page.
  // This is not authentication and does not make a public site private.
  return { rules: { userAgent: "*", allow: "/" } };
}
