import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/scroll-reveal";

const PROJECT_URL = "https://asdistributors.com";
const PROJECT_PREVIEW_SRC = "/images/as-distributors-portfolio-preview.png";
const PROJECT_FEATURE_KEYS = ["catalog", "multilingual", "quotes"] as const;

export async function Portfolio() {
	const t = await getTranslations("portfolio");
	const project = {
		name: t("projects.asDistributors.name"),
		category: t("projects.asDistributors.category"),
		description: t("projects.asDistributors.description"),
		imageAlt: t("projects.asDistributors.imageAlt"),
		features: PROJECT_FEATURE_KEYS.map((key) => t(`projects.asDistributors.features.${key}`)),
	};

	return (
		<section id="portfolio" className="min-h-[calc(100vh-4rem)] flex items-center py-24 sm:py-32">
			<div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
				<div className="mb-16">
					<p className="text-[0.6875rem] uppercase tracking-[0.3em] text-primary font-mono font-bold mb-3">
						{t("label")}
					</p>
					<h2 className="text-[2.5rem] sm:text-[3.5rem] font-black tracking-[-0.03em] uppercase leading-[0.95]">
						{t("title")} <span className="text-primary italic">{t("highlight")}</span>
					</h2>
					<div className="h-[3px] w-20 bg-primary mt-4" />
					<p className="mt-6 text-[1rem] text-muted-foreground leading-relaxed font-mono max-w-3xl">
						{t("description")}
					</p>
				</div>

				<ScrollReveal>
					<div className="group border-brutal-thick bg-card brutal-hover">
						<div className="grid overflow-hidden lg:grid-cols-[1.15fr_0.85fr]">
							<div className="border-b-[4px] border-border bg-secondary/50 lg:border-r-[4px] lg:border-b-0">
								<div className="flex flex-wrap items-center gap-2 border-b-[3px] border-border px-4 py-3 sm:px-5">
									<span className="border-[2px] border-border bg-background px-3 py-1 text-[0.625rem] font-mono font-bold uppercase tracking-[0.24em]">
										{project.category}
									</span>
									<span className="border-[2px] border-primary bg-primary px-3 py-1 text-[0.625rem] font-mono font-bold uppercase tracking-[0.24em] text-primary-foreground">
										{t("status")}
									</span>
								</div>

								<div className="p-4 sm:p-6 lg:p-7">
									<div className="overflow-hidden border-[3px] border-border bg-background shadow-[8px_8px_0_0_var(--border)] transition-transform duration-200 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
										<Image
											src={PROJECT_PREVIEW_SRC}
											alt={project.imageAlt}
											width={1440}
											height={960}
											className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
										/>
									</div>
								</div>
							</div>

							<div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
								<div>
									<h3 className="text-[2rem] sm:text-[2.4rem] font-black tracking-[-0.03em] uppercase leading-[0.95]">
										{project.name}
									</h3>
									<p className="mt-5 text-[0.9375rem] text-muted-foreground leading-relaxed font-mono">
										{project.description}
									</p>

									<div className="mt-6 flex flex-wrap gap-3">
										{project.features.map((feature) => (
											<span
												key={feature}
												className="border-[2px] border-border px-3 py-2 text-[0.6875rem] font-mono font-bold uppercase tracking-[0.18em]"
											>
												{feature}
											</span>
										))}
									</div>
								</div>

								<div className="mt-8 border-t-[3px] border-border pt-6">
									<div className="flex items-center justify-end">
										<a
											href={PROJECT_URL}
											target="_blank"
											rel="noreferrer noopener"
											aria-label={`${t("openProject")} ${project.name}`}
											className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
										>
											<span className="text-right text-[0.75rem] font-mono font-bold uppercase tracking-[0.18em]">
												{t("openProject")}
											</span>
											<span className="flex h-12 w-12 items-center justify-center border-[3px] border-primary bg-primary text-primary-foreground transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
												<ArrowUpRight className="h-5 w-5" />
											</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</ScrollReveal>

				<ScrollReveal
					className="mt-8 border-brutal bg-secondary/40 p-6 sm:p-8"
					style={{ transitionDelay: "0.08s" }}
				>
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<p className="max-w-2xl text-[0.9375rem] text-muted-foreground leading-relaxed font-mono">
							{t("footerText")}
						</p>
						<Button
							size="lg"
							className="text-[0.875rem] font-mono uppercase tracking-wider border-[3px] border-primary font-bold sm:shrink-0"
							asChild
						>
							<a href="#contact">{t("footerCta")}</a>
						</Button>
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
}
