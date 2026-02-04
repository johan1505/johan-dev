"use client";

import { useRef, useState, type FormEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ContactFormPayload } from "@johan-dev/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type ContactFormTranslations = {
	form: {
		labels: { name: string; email: string; subject: string; message: string };
		placeholders: { name: string; email: string; subject: string; message: string };
		agree: string;
		submit: string;
	};
	toast: { title: string; description: string };
	error: { title: string; description: string };
};

function RequiredDot() {
	return <span className="text-primary ml-0.5">*</span>;
}

export function ContactFormClient({ translations: t }: { translations: ContactFormTranslations }) {
	const [loading, setLoading] = useState(false);
	const [agreed, setAgreed] = useState(false);
	const [attempted, setAttempted] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setAttempted(true);

		const form = e.currentTarget;
		if (!form.checkValidity() || !agreed) {
			return;
		}

		const formData = new FormData(form);

		const payload: ContactFormPayload = {
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			subject: formData.get("subject") as string,
			message: formData.get("message") as string,
			agreedToContact: agreed,
		};

		setLoading(true);

		try {
			const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL;
			const res = await fetch(`${apiUrl}/contact`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!res.ok) throw new Error("Request failed");

			toast.success(t.toast.title, { description: t.toast.description });
			form.reset();
			setAgreed(false);
			setAttempted(false);
		} catch {
			toast.error(t.error.title, { description: t.error.description });
		} finally {
			setLoading(false);
		}
	}

	return (
		<form
			ref={formRef}
			onSubmit={onSubmit}
			noValidate
			className={`space-y-6 ${attempted ? "show-validation" : ""}`}
		>
			<div className="grid sm:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="name">
						{t.form.labels.name}
						<RequiredDot />
					</Label>
					<Input
						id="name"
						name="name"
						placeholder={t.form.placeholders.name}
						required
						disabled={loading}
						className="invalid-field"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">
						{t.form.labels.email}
						<RequiredDot />
					</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder={t.form.placeholders.email}
						required
						disabled={loading}
						className="invalid-field"
					/>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="subject">
					{t.form.labels.subject}
					<RequiredDot />
				</Label>
				<Input
					id="subject"
					name="subject"
					placeholder={t.form.placeholders.subject}
					required
					disabled={loading}
					className="invalid-field"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="message">
					{t.form.labels.message}
					<RequiredDot />
				</Label>
				<Textarea
					id="message"
					name="message"
					placeholder={t.form.placeholders.message}
					rows={5}
					required
					disabled={loading}
					className="invalid-field"
				/>
			</div>

			<div className="flex items-center gap-2">
				<Checkbox
					id="agree"
					checked={agreed}
					onCheckedChange={(checked) => setAgreed(checked === true)}
					disabled={loading}
					className={attempted && !agreed ? "border-destructive" : ""}
				/>
				<Label
					htmlFor="agree"
					className={`text-[0.875rem] cursor-pointer ${
						attempted && !agreed ? "text-destructive" : "text-muted-foreground"
					}`}
				>
					{t.form.agree}
				</Label>
			</div>

			<Button type="submit" className="w-full text-[0.9375rem]" size="lg" disabled={loading}>
				{loading ? (
					<Loader2 className="h-4 w-4 animate-spin mr-2" />
				) : (
					<Send className="h-4 w-4 mr-2" />
				)}
				{t.form.submit}
			</Button>
		</form>
	);
}
