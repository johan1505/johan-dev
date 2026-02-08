"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";

const NAV_SECTIONS = ["about", "services", "portfolio", "testimonials", "contact"] as const;

function useActiveSection() {
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActive(entry.target.id);
					}
				}
			},
			{ rootMargin: "-20% 0px -70% 0px" }
		);

		for (const id of NAV_SECTIONS) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (active) {
			history.replaceState(null, "", `#${active}`);
		} else {
			history.replaceState(null, "", window.location.pathname);
		}
	}, [active]);

	return active;
}

export function Header() {
	const t = useTranslations();
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const activeSection = useActiveSection();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const handleNavClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
			e.preventDefault();
			setOpen(false);
			const el = document.getElementById(sectionId);
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
			}
		},
		[]
	);

	const desktopLinks = NAV_SECTIONS.map((key) => (
		<a
			key={key}
			href={`#${key}`}
			onClick={(e) => handleNavClick(e, key)}
			className={`relative py-1 text-[0.9375rem] font-medium transition-colors hover:text-foreground ${
				activeSection === key ? "text-foreground" : "text-muted-foreground"
			}`}
		>
			{t(`sections.${key}`)}
			{activeSection === key && (
				<motion.span
					layoutId="header-underline"
					className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
					transition={{ type: "spring", stiffness: 350, damping: 30 }}
				/>
			)}
		</a>
	));

	const mobileLinks = NAV_SECTIONS.map((key) => (
		<a
			key={key}
			href={`#${key}`}
			onClick={(e) => handleNavClick(e, key)}
			className={`relative self-start py-1 text-[0.9375rem] font-medium transition-colors hover:text-foreground ${
				activeSection === key ? "text-foreground" : "text-muted-foreground"
			}`}
		>
			{t(`sections.${key}`)}
			{activeSection === key && (
				<motion.span
					layoutId="sidebar-underline"
					className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
					transition={{ type: "spring", stiffness: 350, damping: 30 }}
				/>
			)}
		</a>
	));

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled ? "bg-background/80 backdrop-blur-sm border-b border-border" : ""
			}`}
		>
			<div className="max-w-6xl mx-auto px-6 sm:px-8 flex h-16 items-center justify-between">
				<a href="/" className="text-xl font-bold">
					{t("header.brand")}
				</a>

				<nav className="hidden md:flex items-center gap-8">{desktopLinks}</nav>

				<div className="flex items-center gap-1">
					<ThemeToggle />
					<div className="h-4 w-px bg-border mx-1 hidden sm:block" />
					<LocaleSwitcher />
					<Button
						size="sm"
						className="hidden md:inline-flex ml-2 cursor-pointer"
						onClick={(e) => {
							e.preventDefault();
							const el = document.getElementById("contact");
							if (el) el.scrollIntoView({ behavior: "smooth" });
						}}
					>
						{t("header.cta")}
					</Button>

					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="md:hidden"
								aria-label={t("header.mobileMenu.ariaLabel")}
							>
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-64 px-6 pt-10">
							<SheetTitle className="text-xl font-bold mb-8">
								{t("header.brand")}
							</SheetTitle>
							<nav className="flex flex-col gap-4">{mobileLinks}</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
