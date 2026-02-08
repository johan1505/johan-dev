import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
	title: "Johan — Freelance Web Developer",
	description:
		"Freelance Web Developer crafting stunning, modern websites that help businesses grow. Former Amazon Engineer.",
	openGraph: {
		title: "Johan — Freelance Web Developer",
		description:
			"Freelance Web Developer crafting stunning, modern websites that help businesses grow. Former Amazon Engineer.",
		url: SITE_URL,
		siteName: "Johan",
		type: "website",
		images: [
			{
				url: `${SITE_URL}/og.png`,
				width: 1200,
				height: 630,
				alt: "Johan — Freelance Web Developer",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Johan — Freelance Web Developer",
		description:
			"Freelance Web Developer crafting stunning, modern websites that help businesses grow. Former Amazon Engineer.",
		images: [`${SITE_URL}/og.png`],
	},
};

export default function RootPage() {
	redirect("/en/");
}
