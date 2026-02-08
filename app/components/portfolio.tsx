import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function Portfolio() {
	const t = await getTranslations("portfolio");

	return (
		<section id="portfolio" className="min-h-[calc(100vh-4rem)] flex items-center py-24 sm:py-32">
			<div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
				<div>
					<div>
						<div className="border-brutal p-10 sm:p-16">
							<h2 className="text-[2.5rem] sm:text-[3.5rem] font-black tracking-[-0.03em] uppercase leading-[0.95]">
								{t("title")} <span className="text-primary italic">{t("highlight")}</span>
							</h2>
							<div className="h-[3px] w-20 bg-primary mt-4" />
							<p className="mt-8 text-[1rem] text-muted-foreground leading-relaxed font-mono max-w-xl">
								{t("description")}
							</p>
							<div className="mt-10">
								<Button
									size="lg"
									className="text-[0.875rem] font-mono uppercase tracking-wider border-[3px] border-primary font-bold"
									asChild
								>
									<a href="#contact">{t("cta")}</a>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
