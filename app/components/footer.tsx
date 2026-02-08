import { getTranslations } from "next-intl/server";
import { Linkedin, Github, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_SECTIONS = ["about", "services", "portfolio", "testimonials", "contact"] as const;
const SERVICE_COUNT = 4;

export async function Footer() {
	const t = await getTranslations();
	const services = Array.from({ length: SERVICE_COUNT }, (_, i) => t(`footer.services.${i}`));

	return (
		<footer className="border-t-[3px] border-border">
			<div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
					<div className="sm:col-span-2 border-brutal p-8">
						<p className="text-2xl font-black uppercase tracking-[-0.02em]">
							{t("footer.brand")}
							<span className="text-primary">.</span>
						</p>
						<p className="mt-3 text-[0.875rem] text-muted-foreground max-w-sm font-mono">
							{t("footer.tagline")}
						</p>
						<div className="mt-5 flex gap-2">
							<Button
								variant="outline"
								size="icon"
								className="border-[2px] border-border brutal-hover"
								asChild
							>
								<a
									href="https://www.linkedin.com/in/johan-guzman-b37101181/"
									target="_blank"
									rel="noopener noreferrer"
									aria-label={t("footer.socialLinks.linkedin")}
								>
									<Linkedin className="h-4 w-4" />
								</a>
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="border-[2px] border-border brutal-hover"
								asChild
							>
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

					<div className="border-brutal p-8">
						<p className="font-black text-[0.6875rem] mb-4 uppercase tracking-[0.25em] font-mono">
							{t("footer.servicesTitle")}
						</p>
						<ul className="space-y-2">
							{services.map((service) => (
								<li key={service} className="text-[0.875rem] text-muted-foreground font-mono">
									{service}
								</li>
							))}
						</ul>
					</div>

					<div className="border-brutal p-8">
						<p className="font-black text-[0.6875rem] mb-4 uppercase tracking-[0.25em] font-mono">
							{t("footer.linksTitle")}
						</p>
						<ul className="space-y-2">
							{NAV_SECTIONS.map((key) => (
								<li key={key}>
									<a
										href={`#${key}`}
										className="text-[0.875rem] text-muted-foreground hover:text-primary transition-colors font-mono uppercase tracking-wider underline"
									>
										{t(`sections.${key}`)}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-0 border-brutal p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-[0.6875rem] text-muted-foreground font-mono uppercase tracking-wider">
						&copy; {new Date().getFullYear()} {t("footer.copyright")}
					</p>
					<p className="text-[0.6875rem] text-muted-foreground flex items-center gap-1 font-mono uppercase tracking-wider">
						{t("footer.madeWithPrefix")} <Heart className="h-3 w-3 text-primary fill-primary" />{" "}
						{t("footer.madeWithSuffix")}
					</p>
				</div>
			</div>
		</footer>
	);
}
