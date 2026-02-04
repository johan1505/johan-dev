"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
	const locale = useLocale();
	const t = useTranslations("localeSwitcher");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="h-8 gap-1.5 rounded-full px-3 cursor-pointer"
					aria-label={t("label")}
				>
					<Globe className="h-3.5 w-3.5" />
					<span className="text-[0.8125rem] font-medium">{t(locale as "en" | "es")}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{routing.locales.map((loc) => (
					<DropdownMenuItem
						key={loc}
						className={`cursor-pointer ${loc === locale ? "font-semibold" : ""}`}
						onClick={() => {
							if (loc === locale) return;
							window.location.href = `/${loc}/${window.location.hash}`;
						}}
					>
						{t(loc)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
