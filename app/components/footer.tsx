import { getTranslations } from "next-intl/server";
import { Linkedin, Github, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_SECTIONS = ["about", "services", "portfolio", "testimonials", "contact"] as const;
const SERVICE_COUNT = 4;

export async function Footer() {
	const t = await getTranslations();
	const services = Array.from({ length: SERVICE_COUNT }, (_, i) => t(`footer.services.${i}`));

	return (
		<footer className="border-t border-border">
			<div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
					<div className="sm:col-span-2">
						<p className="text-xl font-bold">
							{t("footer.brand")}
						</p>
						<p className="mt-2 text-[0.9375rem] text-muted-foreground max-w-sm">
							{t("footer.tagline")}
						</p>
						<div className="mt-4 flex gap-2">
							<Button variant="outline" size="icon" asChild>
								<a
									href="https://www.linkedin.com/in/johan-guzman-b37101181/"
									target="_blank"
									rel="noopener noreferrer"
									aria-label={t("footer.socialLinks.linkedin")}
								>
									<Linkedin className="h-4 w-4" />
								</a>
							</Button>
							<Button variant="outline" size="icon" asChild>
								<a
									href="https://github.com/johan1505"
									target="_blank"
									rel="noopener noreferrer"
									aria-label={t("footer.socialLinks.github")}
								>
									<Github className="h-4 w-4" />
								</a>
							</Button>
						</div>
					</div>

					<div>
						<p className="font-semibold text-[0.875rem] mb-3">{t("footer.servicesTitle")}</p>
						<ul className="space-y-2">
							{services.map((service) => (
								<li key={service} className="text-[0.875rem] text-muted-foreground">
									{service}
								</li>
							))}
						</ul>
					</div>

					<div>
						<p className="font-semibold text-[0.875rem] mb-3">{t("footer.linksTitle")}</p>
						<ul className="space-y-2">
							{NAV_SECTIONS.map((key) => (
								<li key={key}>
									<a
										href={`#${key}`}
										className="text-[0.875rem] text-muted-foreground hover:text-foreground transition-colors underline"
									>
										{t(`sections.${key}`)}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-[0.75rem] text-muted-foreground">
						&copy; {new Date().getFullYear()} {t("footer.copyright")}
					</p>
					<p className="text-[0.75rem] text-muted-foreground flex items-center gap-1">
						{t("footer.madeWithPrefix")} <Heart className="h-3 w-3 text-primary fill-primary" />{" "}
						{t("footer.madeWithSuffix")}
					</p>
				</div>
			</div>
		</footer>
	);
}
