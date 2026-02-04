import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/motion";
import { Briefcase, Award } from "lucide-react";

const STAT_ICONS = [Briefcase, Award];
const PARAGRAPH_COUNT = 2;

export async function About() {
	const t = await getTranslations("about");
	const paragraphs = Array.from({ length: PARAGRAPH_COUNT }, (_, i) => t(`paragraphs.${i}`));
	const stats = STAT_ICONS.map((_, i) => ({
		label: t(`stats.${i}.label`),
		value: t(`stats.${i}.value`),
	}));

	return (
		<section id="about" className="min-h-[calc(100vh-4rem)] flex items-center py-24 sm:py-32">
			<div className="max-w-4xl mx-auto px-6 sm:px-8 w-full">
				<MotionDiv
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-tight mb-2">
						{t("title")}
					</h2>
					<div className="h-1 w-12 bg-primary rounded-full mx-auto" />
				</MotionDiv>

				<MotionDiv
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="relative rounded-2xl border border-border bg-card p-8 sm:p-10 mb-10"
				>
					<div className="absolute top-0 left-8 sm:left-10 w-16 h-1 bg-primary rounded-full -translate-y-0.5" />
					<div className="space-y-4">
						{paragraphs.map((paragraph) => (
							<p
								key={paragraph.slice(0, 20)}
								className="text-[1rem] text-muted-foreground leading-relaxed"
							>
								{paragraph}
							</p>
						))}
					</div>
				</MotionDiv>

				<div className="grid grid-cols-2 gap-6">
					{stats.map((stat, index) => {
						const Icon = STAT_ICONS[index];
						return (
							<MotionDiv
								key={stat.label}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
								className="rounded-xl border border-border bg-card p-6 text-center"
							>
								<div className="flex justify-center mb-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
										<Icon className="h-5 w-5 text-primary" />
									</div>
								</div>
								<p className="text-[2.5rem] sm:text-[3rem] font-bold text-primary leading-none">
									{stat.value}
								</p>
								<p className="text-[0.8125rem] text-muted-foreground mt-2 uppercase tracking-wider">
									{stat.label}
								</p>
							</MotionDiv>
						);
					})}
				</div>
			</div>
		</section>
	);
}
