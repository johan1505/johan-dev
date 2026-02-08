"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
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

const underlineTransition =
	"left 0.3s cubic-bezier(0.22, 1, 0.36, 1), width 0.3s cubic-bezier(0.22, 1, 0.36, 1)";

export function Header() {
	const t = useTranslations();
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const activeSection = useActiveSection();

	const desktopRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
	const mobileRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
	const [desktopUnderline, setDesktopUnderline] = useState({ left: 0, width: 0 });
	const [mobileUnderline, setMobileUnderline] = useState({ left: 0, width: 0 });

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		if (activeSection) {
			const desktopEl = desktopRefs.current.get(activeSection);
			if (desktopEl) {
				setDesktopUnderline({ left: desktopEl.offsetLeft, width: desktopEl.offsetWidth });
			}
			const mobileEl = mobileRefs.current.get(activeSection);
			if (mobileEl) {
				setMobileUnderline({ left: mobileEl.offsetLeft, width: mobileEl.offsetWidth });
			}
		}
	}, [activeSection]);

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
			ref={(el) => {
				if (el) desktopRefs.current.set(key, el);
			}}
			href={`#${key}`}
			onClick={(e) => handleNavClick(e, key)}
			className={`relative py-1 text-[0.75rem] font-mono uppercase tracking-[0.2em] font-medium transition-colors hover:text-primary ${
				activeSection === key ? "text-primary" : "text-muted-foreground"
			}`}
		>
			{t(`sections.${key}`)}
		</a>
	));

	const mobileLinks = NAV_SECTIONS.map((key) => (
		<a
			key={key}
			ref={(el) => {
				if (el) mobileRefs.current.set(key, el);
			}}
			href={`#${key}`}
			onClick={(e) => handleNavClick(e, key)}
			className={`relative self-start py-2 text-[0.875rem] font-mono uppercase tracking-[0.2em] font-medium transition-colors hover:text-primary border-b-[3px] border-border pb-3 w-full ${
				activeSection === key ? "text-primary" : "text-muted-foreground"
			}`}
		>
			{t(`sections.${key}`)}
		</a>
	));

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${
				scrolled ? "bg-background/95 backdrop-blur-sm border-b-[3px] border-border" : ""
			}`}
		>
			<div className="max-w-7xl mx-auto px-6 sm:px-8 flex h-16 items-center justify-between">
				<a href="/" className="text-2xl font-black uppercase tracking-[-0.02em]">
					{t("header.brand")}
					<span className="text-primary">.</span>
				</a>

				<nav className="hidden md:flex items-center gap-8 relative">
					{desktopLinks}
					{activeSection && (
						<span
							className="absolute bottom-0 h-[3px] bg-primary"
							style={{
								left: desktopUnderline.left,
								width: desktopUnderline.width,
								transition: underlineTransition,
							}}
						/>
					)}
				</nav>

				<div className="flex items-center gap-1">
					<ThemeToggle />
					<div className="h-5 w-[3px] bg-border mx-2 hidden sm:block" />
					<LocaleSwitcher />
					<Button
						size="sm"
						className="hidden md:inline-flex ml-3 cursor-pointer font-mono uppercase tracking-wider text-[0.75rem] border-[3px] border-primary font-bold"
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
						<SheetContent side="right" className="w-72 px-6 pt-10 border-l-[3px] border-border">
							<SheetTitle className="text-2xl font-black uppercase mb-8">
								{t("header.brand")}
								<span className="text-primary">.</span>
							</SheetTitle>
							<nav className="flex flex-col gap-2 relative">
								{mobileLinks}
								{activeSection && (
									<span
										className="absolute bottom-0 h-[3px] bg-primary"
										style={{
											left: mobileUnderline.left,
											width: mobileUnderline.width,
											transition: underlineTransition,
										}}
									/>
								)}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
