"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const t = useTranslations("theme");
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	return (
		<Button
			variant="outline"
			size="icon"
			className="h-8 w-8 rounded-full cursor-pointer"
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
			aria-label={
				mounted
					? resolvedTheme === "dark"
						? t("switchToLight")
						: t("switchToDark")
					: t("switchToDark")
			}
		>
			<Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		</Button>
	);
}
