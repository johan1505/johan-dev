import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function Portfolio() {
	const t = await getTranslations("portfolio");

	return (
		<section id="portfolio" className="min-h-[calc(100vh-4rem)] flex items-center py-24 sm:py-32">
			<div className="max-w-6xl mx-auto px-6 sm:px-8 w-full">
				<div className="text-center max-w-2xl mx-auto">
					<h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-tight">
						{t("title")} <span className="text-primary">{t("highlight")}</span>
					</h2>
					<div className="h-1 w-12 bg-primary rounded-full mx-auto mt-3" />
					<p className="mt-6 text-[1rem] text-muted-foreground leading-relaxed">
						{t("description")}
					</p>
					<div className="mt-8">
						<Button size="lg" className="text-[0.9375rem]" asChild>
							<a href="#contact">{t("cta")}</a>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
