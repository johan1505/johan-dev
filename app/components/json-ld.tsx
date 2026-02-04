import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";

export async function JsonLd() {
	const t = await getTranslations("jsonLd");

	const personSchema = {
		"@context": "https://schema.org",
		"@type": "Person",
		"@id": `${SITE_URL}/#person`,
		name: "Johan Guzman",
		url: SITE_URL,
		jobTitle: t("jobTitle"),
		description: t("description"),
		sameAs: ["https://www.linkedin.com/in/johan-guzman-b37101181/", "https://github.com/johan1505"],
		knowsAbout: [
			"Software Engineering",
			"Web Development",
			"Frontend Development",
			"Full-Stack Development",
			"Web Design",
			"UI/UX Design",
			"React",
			"Next.js",
			"TypeScript",
			"JavaScript",
			"Node.js",
			"HTML",
			"CSS",
			"Tailwind CSS",
			"SEO",
			"AWS",
			"Cloud Computing",
			"REST APIs",
			"Responsive Design",
			"Agile Development",
			"Performance Optimization",
		],
	};

	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${SITE_URL}/#website`,
		name: "Johan Dev",
		url: SITE_URL,
		inLanguage: ["en", "es"],
		author: { "@type": "Person", "@id": `${SITE_URL}/#person` },
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
			/>
		</>
	);
}
