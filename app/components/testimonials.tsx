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
			<div className="max-w-6xl mx-auto px-6 sm:px-8 w-full">
				<div className="text-center mb-16">
					<p className="text-[0.8125rem] uppercase tracking-widest text-primary font-medium mb-2">
						{t("label")}
					</p>
					<h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-tight">{t("title")}</h2>
					<div className="h-1 w-12 bg-primary rounded-full mx-auto mt-3" />
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{items.map((item, index) => (
						<MotionDiv
							key={item.author}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: index * 0.1 }}
						>
							<Card className="h-full">
								<CardContent className="p-6">
									<p className="italic text-[0.9375rem] text-muted-foreground leading-relaxed mb-6">
										&ldquo;{item.quote}&rdquo;
									</p>
									<div className="flex items-center gap-3">
										<div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary text-[0.8125rem] font-semibold text-primary">
											{item.initials}
										</div>
										<div>
											<p className="font-semibold text-[0.875rem]">{item.author}</p>
											<p className="text-[0.75rem] text-muted-foreground">{item.role}</p>
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
