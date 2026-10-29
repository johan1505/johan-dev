import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function Hero() {
	const t = await getTranslations("hero");

	return (
		<section className="min-h-[calc(100vh-4rem)] flex items-center pt-16 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
				<div className="grid lg:grid-cols-12 gap-0 items-end">
					{/* Left column - massive type */}
					<div className="lg:col-span-8 min-w-0 lg:pr-8">
						<h1
							className="animate-fade-in-up max-w-full text-[clamp(2.75rem,9vw,4.5rem)] md:text-[4.5rem] lg:text-[5rem] xl:text-[6rem] font-black tracking-[-0.04em] leading-[0.9] uppercase"
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
					<div className="lg:col-span-4 lg:border-l-[3px] lg:border-border lg:pl-8 mt-10 lg:mt-0 pb-4">
						<p
							className="animate-fade-in-up text-[clamp(1.25rem,2vw,1.625rem)] text-foreground font-sans font-bold leading-snug"
							style={{ animationDelay: "0.2s" } as React.CSSProperties}
						>
							<span className="text-primary">{t("subtitleRole")}</span>
							{t("subtitleRest")}
							<span className="animate-blink text-primary ml-0.5">|</span>
						</p>

						<div
							className="animate-fade-in-up mt-8 flex flex-col gap-3"
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
