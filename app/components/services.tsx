import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/motion";
import { Layout, Code, Search, Smartphone } from "lucide-react";

const ICONS = [Layout, Code, Search, Smartphone];

export async function Services() {
	const t = await getTranslations("services");
	const items = ICONS.map((_, i) => ({
		title: t(`items.${i}.title`),
		description: t(`items.${i}.description`),
	}));

	return (
		<section id="services" className="min-h-[calc(100vh-4rem)] flex items-center py-24 sm:py-32">
			<div className="max-w-6xl mx-auto px-6 sm:px-8 w-full">
				<div className="text-center mb-16">
					<p className="text-[0.8125rem] uppercase tracking-widest text-primary font-medium mb-2">
						{t("label")}
					</p>
					<h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-tight">{t("title")}</h2>
					<div className="h-1 w-12 bg-primary rounded-full mx-auto mt-3" />
					<p className="mt-4 text-[1rem] text-muted-foreground max-w-2xl mx-auto">
						{t("subtitle")}
					</p>
				</div>

				<div className="grid sm:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden border border-border">
					{items.map((item, index) => {
						const Icon = ICONS[index];
						return (
							<MotionDiv
								key={item.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
								className="bg-background p-8 sm:p-10"
							>
								<div className="flex justify-center mb-5">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
										<Icon className="h-6 w-6 text-primary" />
									</div>
								</div>
								<h3 className="text-[1.125rem] font-semibold mb-2 text-center">{item.title}</h3>
								<p className="text-[0.9375rem] text-muted-foreground leading-relaxed text-center">
									{item.description}
								</p>
							</MotionDiv>
						);
					})}
				</div>
			</div>
		</section>
	);
}
