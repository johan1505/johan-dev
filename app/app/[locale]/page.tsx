import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { Testimonials } from "@/components/testimonials";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";

type Props = {
	params: Promise<{ locale: string }>;
};

export default async function LocalePage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale as Locale);

	return (
		<>
			<JsonLd />
			<Hero />
			<About />
			<Services />
			<Portfolio />
			<Testimonials />
			<ContactForm />
		</>
	);
}
