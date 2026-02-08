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
			<div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
				<div>
					{/* Main content */}
					<div>
						<MotionDiv
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
							className="mb-10"
						>
							<h2 className="text-[2.5rem] sm:text-[3.5rem] font-black tracking-[-0.03em] uppercase leading-[0.95]">
								{t("title")}
							</h2>
							<div className="h-[3px] w-20 bg-primary mt-4" />
						</MotionDiv>

						<MotionDiv
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
							className="border-brutal bg-card p-8 sm:p-10 mb-10"
						>
							<div className="space-y-5">
								{paragraphs.map((paragraph) => (
									<p
										key={paragraph.slice(0, 20)}
										className="text-[1rem] text-muted-foreground leading-relaxed font-mono"
									>
										{paragraph}
									</p>
								))}
							</div>
						</MotionDiv>

						<div className="grid grid-cols-2 gap-0">
							{stats.map((stat, index) => {
								const Icon = STAT_ICONS[index];
								return (
									<MotionDiv
										key={stat.label}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{
											duration: 0.3,
											delay: 0.2 + index * 0.1,
											ease: [0.22, 1, 0.36, 1],
										}}
										className="border-brutal p-6 sm:p-8 text-center brutal-hover"
									>
										<div className="flex justify-center mb-3">
											<div className="flex h-12 w-12 items-center justify-center border-[3px] border-primary">
												<Icon className="h-5 w-5 text-primary" />
											</div>
										</div>
										<p className="text-[3rem] sm:text-[3.5rem] font-black text-primary leading-none tracking-[-0.03em]">
											{stat.value}
										</p>
										<p className="text-[0.6875rem] text-muted-foreground mt-3 uppercase tracking-[0.25em] font-mono">
											{stat.label}
										</p>
									</MotionDiv>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
