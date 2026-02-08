import { getTranslations } from "next-intl/server";
import { MotionDiv, MotionH1, MotionP } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export async function Hero() {
	const t = await getTranslations("hero");

	return (
		<section className="min-h-[calc(100vh-4rem)] flex items-center pt-16 overflow-hidden">
			<div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
				<div className="grid md:grid-cols-12 gap-0 items-end">
					{/* Left column - massive type */}
					<div className="md:col-span-8">
						<MotionDiv
							initial={{ opacity: 0, x: -40 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
						>
							<Badge
								variant="outline"
								className="mb-8 text-[0.75rem] px-4 py-1.5 font-mono uppercase tracking-[0.15em] border-[2px] border-foreground"
							>
								<span className="animate-wave mr-1.5">&#x1F44B;</span>
								{t("badge")}
							</Badge>
						</MotionDiv>

						<MotionH1
							initial={{ opacity: 0, y: 60 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
							className="text-[3.5rem] sm:text-[5rem] lg:text-[7rem] xl:text-[8rem] font-black tracking-[-0.04em] leading-[0.9] uppercase"
						>
							{t("titleStart")} <span className="text-primary italic">{t("titleHighlight1")}</span>{" "}
							<span className="whitespace-nowrap">{t("titleMid")}</span>{" "}
							<span className="text-primary italic">{t("titleHighlight2")}</span> {t("titleEnd")}
						</MotionH1>
					</div>

					{/* Right column - subtitle and CTAs */}
					<div className="md:col-span-4 md:border-l-[3px] md:border-border md:pl-8 mt-10 md:mt-0 pb-4">
						<MotionP
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
							className="text-[1rem] sm:text-[1.125rem] text-muted-foreground font-mono leading-relaxed"
						>
							{t("subtitle")}
							<span className="animate-blink text-primary ml-0.5">|</span>
						</MotionP>

						<MotionDiv
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
							className="mt-8 flex flex-col sm:flex-row md:flex-col gap-3"
						>
							<Button
								size="lg"
								className="text-[0.875rem] font-mono uppercase tracking-wider border-[3px] border-primary font-bold w-full"
								asChild
							>
								<a href="#contact">{t("cta")}</a>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="text-[0.875rem] font-mono uppercase tracking-wider border-[3px] border-foreground font-bold w-full brutal-hover"
								asChild
							>
								<a href="#portfolio">{t("viewPortfolio")}</a>
							</Button>
						</MotionDiv>
					</div>
				</div>

				{/* Bottom editorial line */}
				<MotionDiv
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
					className="mt-16 h-[3px] bg-border origin-left"
				/>
			</div>
		</section>
	);
}
