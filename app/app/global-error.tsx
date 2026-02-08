"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
	return (
		<html lang="en">
			<body>
				<div className="min-h-screen flex items-center justify-center px-6">
					<div className="text-center">
						<p className="text-[5rem] font-bold leading-none">500</p>
						<h1 className="mt-4 text-[1.5rem] font-bold tracking-tight">Something went wrong</h1>
						<p className="mt-2 text-gray-500">An unexpected error occurred.</p>
						<button
							onClick={reset}
							type="button"
							className="mt-6 inline-block rounded-lg bg-black text-white px-6 py-2.5 text-[0.9375rem] font-medium hover:opacity-90 transition-opacity"
						>
							Try again
						</button>
					</div>
				</div>
			</body>
		</html>
	);
}
