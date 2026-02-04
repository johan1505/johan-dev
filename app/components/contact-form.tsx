import { getTranslations } from "next-intl/server";
import { ContactFormClient } from "@/components/contact-form-client";

export async function ContactForm() {
	const t = await getTranslations("contact");

	const translations = {
		form: {
			labels: {
				name: t("form.labels.name"),
				email: t("form.labels.email"),
				subject: t("form.labels.subject"),
				message: t("form.labels.message"),
			},
			placeholders: {
				name: t("form.placeholders.name"),
				email: t("form.placeholders.email"),
				subject: t("form.placeholders.subject"),
				message: t("form.placeholders.message"),
			},
			agree: t("form.agree"),
			submit: t("form.submit"),
		},
		toast: {
			title: t("toast.title"),
			description: t("toast.description"),
		},
		error: {
			title: t("error.title"),
			description: t("error.description"),
		},
	};

	return (
		<section id="contact" className="min-h-[calc(100vh-4rem)] flex items-center py-24 sm:py-32">
			<div className="max-w-2xl mx-auto px-6 sm:px-8 w-full">
				<div className="text-center mb-12">
					<p className="text-[0.8125rem] uppercase tracking-widest text-primary font-medium mb-2">
						{t("label")}
					</p>
					<h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-tight">{t("title")}</h2>
					<div className="h-1 w-12 bg-primary rounded-full mx-auto mt-3" />
					<p className="mt-4 text-[1rem] text-muted-foreground">{t("subtitle")}</p>
				</div>

				<ContactFormClient translations={translations} />
			</div>
		</section>
	);
}
