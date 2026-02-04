import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	return routing.locales.map((locale) => ({
		url: `${SITE_URL}/${locale}/`,
		lastModified: now,
		changeFrequency: "yearly",
		priority: locale === "en" ? 1.0 : 0.9,
	}));
}
