import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center px-6">
			<div className="text-center">
				<p className="text-[5rem] font-bold text-primary leading-none">404</p>
				<h1 className="mt-4 text-[1.5rem] font-bold tracking-tight">Page not found</h1>
				<p className="mt-2 text-muted-foreground">The page you are looking for does not exist.</p>
				<Link
					href="/en/"
					className="mt-6 inline-block rounded-lg bg-primary text-primary-foreground px-6 py-2.5 text-[0.9375rem] font-medium hover:opacity-90 transition-opacity"
				>
					Go home
				</Link>
			</div>
		</div>
	);
}
