import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export async function Hero() {
	const t = await getTranslations("hero");

	return (
		<section className="min-h-[calc(100vh-4rem)] flex items-center pt-16 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
				<div className="grid md:grid-cols-12 gap-0 items-end">
					{/* Left column - massive type */}
					<div className="md:col-span-8 min-w-0">
						<div className="animate-fade-in-left">
							<Badge
								variant="outline"
								className="mb-8 text-[0.75rem] px-4 py-1.5 font-mono uppercase tracking-[0.15em] border-[2px] border-foreground"
							>
								<span className="animate-wave mr-1.5">&#x1F44B;</span>
								{t("badge")}
							</Badge>
						</div>

						<h1
							className="animate-fade-in-up max-w-full text-[clamp(3rem,15vw,5rem)] sm:text-[5rem] lg:text-[7rem] xl:text-[8rem] font-black tracking-[-0.04em] leading-[0.9] uppercase"
							style={
								{
									"--anim-y": "60px",
									animationDelay: "0.1s",
									animationDuration: "0.4s",
								} as React.CSSProperties
							}
						>
							{t("titleStart")} <span className="text-primary italic">{t("titleHighlight1")}</span>{" "}
							<span className="sm:whitespace-nowrap">{t("titleMid")}</span>{" "}
							<span className="text-primary italic">{t("titleHighlight2")}</span> {t("titleEnd")}
						</h1>
					</div>

					{/* Right column - subtitle and CTAs */}
					<div className="md:col-span-4 md:border-l-[3px] md:border-border md:pl-8 mt-10 md:mt-0 pb-4">
						<p
							className="animate-fade-in-up text-[1rem] sm:text-[1.125rem] text-muted-foreground font-mono leading-relaxed"
							style={{ animationDelay: "0.2s" } as React.CSSProperties}
						>
							{t("subtitle")}
							<span className="animate-blink text-primary ml-0.5">|</span>
						</p>

						<div
							className="animate-fade-in-up mt-8 flex flex-col sm:flex-row md:flex-col gap-3"
							style={{ animationDelay: "0.3s" } as React.CSSProperties}
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
						</div>
					</div>
				</div>

				{/* Bottom editorial line */}
				<div
					className="animate-scale-x-in mt-16 h-[3px] bg-border origin-left"
					style={{ animationDelay: "0.4s" } as React.CSSProperties}
				/>
			</div>
		</section>
	);
}
