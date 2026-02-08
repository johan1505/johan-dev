import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const messages = (await import(`../../messages/${locale}.json`)).default;
	const meta = messages.metadata;

	const alternates: Record<string, string> = {};
	for (const loc of routing.locales) {
		alternates[loc] = `${SITE_URL}/${loc}/`;
	}

	const localeUrl = `${SITE_URL}/${locale}/`;

	return {
		title: meta.title,
		description: meta.description,
		metadataBase: new URL(SITE_URL),
		alternates: {
			canonical: localeUrl,
			languages: alternates,
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		openGraph: {
			title: meta.title,
			description: meta.description,
			url: localeUrl,
			siteName: "Johan",
			locale,
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
			title: meta.title,
			description: meta.description,
			images: [`${SITE_URL}/og.png`],
		},
	};
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale as Locale);
	const messages = await getMessages();

	return (
		<NextIntlClientProvider messages={messages}>
			<ThemeProvider>
				<Header />
				<main>{children}</main>
				<Footer />
				<Toaster />
			</ThemeProvider>
		</NextIntlClientProvider>
	);
}
