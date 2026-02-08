import { getTranslations } from "next-intl/server";
import { ContactFormClient } from "@/components/contact-form-client";
import { ScrollReveal } from "@/components/scroll-reveal";

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
			<div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
				<div>
					<div>
						<ScrollReveal className="mb-10">
							<p className="text-[0.6875rem] uppercase tracking-[0.3em] text-primary font-mono font-bold mb-3">
								{t("label")}
							</p>
							<h2 className="text-[2.5rem] sm:text-[3.5rem] font-black tracking-[-0.03em] uppercase leading-[0.95]">
								{t("title")}
							</h2>
							<div className="h-[3px] w-20 bg-primary mt-4" />
							<p className="mt-6 text-[1rem] text-muted-foreground font-mono max-w-xl">
								{t("subtitle")}
							</p>
						</ScrollReveal>

						<ScrollReveal className="border-brutal p-8 sm:p-10" style={{ transitionDelay: "0.1s" }}>
							<ContactFormClient translations={translations} />
						</ScrollReveal>
					</div>
				</div>
			</div>
		</section>
	);
}
