import { getTranslations } from "next-intl/server";
import { Layout, Code, Search, Smartphone } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const ICONS = [Layout, Code, Search, Smartphone];

export async function Services() {
	const t = await getTranslations("services");
	const items = ICONS.map((_, i) => ({
		title: t(`items.${i}.title`),
		description: t(`items.${i}.description`),
	}));

	return (
		<section id="services" className="min-h-[calc(100vh-4rem)] flex items-center py-24 sm:py-32">
			<div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
				<div className="mb-16">
					<div>
						<p className="text-[0.6875rem] uppercase tracking-[0.3em] text-primary font-mono font-bold mb-3">
							{t("label")}
						</p>
						<h2 className="text-[2.5rem] sm:text-[3.5rem] font-black tracking-[-0.03em] uppercase leading-[0.95]">
							{t("title")}
						</h2>
						<div className="h-[3px] w-20 bg-primary mt-4" />
						<p className="mt-6 text-[1rem] text-muted-foreground font-mono max-w-2xl">
							{t("subtitle")}
						</p>
					</div>
				</div>

				<div className="grid sm:grid-cols-2 gap-0">
					{items.map((item, index) => {
						const Icon = ICONS[index];
						return (
							<ScrollReveal
								key={item.title}
								className="border-brutal p-8 sm:p-10 group brutal-hover"
								style={{ transitionDelay: `${index * 0.08}s` }}
							>
								<div className="flex items-start gap-5">
									<div className="flex h-14 w-14 shrink-0 items-center justify-center border-[3px] border-foreground group-hover:border-primary group-hover:bg-primary transition-colors duration-150">
										<Icon className="h-6 w-6 text-foreground group-hover:text-primary-foreground transition-colors duration-150" />
									</div>
									<div>
										<h3 className="text-[1.125rem] font-black uppercase tracking-tight mb-2">
											{item.title}
										</h3>
										<p className="text-[0.875rem] text-muted-foreground leading-relaxed font-mono">
											{item.description}
										</p>
									</div>
								</div>
							</ScrollReveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
