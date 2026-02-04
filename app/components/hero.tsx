import { getTranslations } from "next-intl/server";
import { MotionDiv, MotionH1, MotionP } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export async function Hero() {
	const t = await getTranslations("hero");

	return (
		<section className="min-h-[calc(100vh-4rem)] flex items-center justify-center pt-16">
			<div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
				<MotionDiv
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Badge variant="outline" className="mb-6 text-[0.875rem] px-4 py-1.5">
						<span className="animate-wave mr-1.5">&#x1F44B;</span>
						{t("badge")}
					</Badge>
				</MotionDiv>

				<MotionH1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] font-bold tracking-tight leading-[1.1]"
				>
					{t("title")} <span className="text-primary">{t("titleHighlight")}</span> {t("titleEnd")}
				</MotionH1>

				<MotionP
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-6 text-[1.125rem] sm:text-[1.25rem] text-muted-foreground max-w-2xl mx-auto"
				>
					{t("subtitle")}
					<span className="animate-blink text-primary ml-0.5">|</span>
				</MotionP>

				<MotionDiv
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-10 flex gap-4 justify-center"
				>
					<Button size="lg" className="text-[0.9375rem]" asChild>
						<a href="#contact">{t("cta")}</a>
					</Button>
					<Button size="lg" variant="outline" className="text-[0.9375rem]" asChild>
						<a href="#portfolio">{t("viewPortfolio")}</a>
					</Button>
				</MotionDiv>
			</div>
		</section>
	);
}
