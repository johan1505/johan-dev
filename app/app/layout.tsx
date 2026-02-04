import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Johan Dev",
	description: "Built with Next.js, Turborepo, and AWS Amplify",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
