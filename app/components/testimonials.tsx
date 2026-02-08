import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/motion";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIAL_COUNT = 3;

export async function Testimonials() {
	const t = await getTranslations("testimonials");
	const items = Array.from({ length: TESTIMONIAL_COUNT }, (_, i) => ({
		quote: t(`items.${i}.quote`),
		author: t(`items.${i}.author`),
		role: t(`items.${i}.role`),
		initials: t(`items.${i}.initials`),
	}));

	return (
		<section
			id="testimonials"
			className="min-h-[calc(100vh-4rem)] flex items-center py-24 sm:py-32"
		>
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
					</div>
				</div>

				<div className="grid md:grid-cols-3 gap-0">
					{items.map((item, index) => (
						<MotionDiv
							key={item.author}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.3,
								delay: index * 0.1,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							<Card className="h-full border-brutal brutal-hover">
								<CardContent className="p-8 relative">
									{/* Large quotation mark */}
									<span className="quote-mark">&ldquo;</span>

									<p className="text-[0.9375rem] text-muted-foreground leading-relaxed mb-8 mt-12 font-mono">
										{item.quote}
									</p>

									<div className="border-t-[3px] border-border pt-5">
										<div className="flex items-center gap-4">
											<div className="flex h-12 w-12 items-center justify-center border-[3px] border-primary text-[0.875rem] font-black text-primary font-mono">
												{item.initials}
											</div>
											<div>
												<p className="font-black text-[0.875rem] uppercase tracking-wide">
													{item.author}
												</p>
												<p className="text-[0.6875rem] text-muted-foreground font-mono uppercase tracking-[0.15em]">
													{item.role}
												</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</MotionDiv>
					))}
				</div>
			</div>
		</section>
	);
}
