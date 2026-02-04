export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-8">
			<div className="max-w-2xl text-center">
				<h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
					Johan Dev
				</h1>
				<p className="text-lg text-muted-foreground mb-8">
					Next.js SSG app deployed on AWS Amplify via CDK,
					managed with Turborepo.
				</p>
				<div className="flex gap-4 justify-center">
					<a
						href="https://nextjs.org/docs"
						className="rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium hover:opacity-90 transition-opacity"
						target="_blank"
						rel="noopener noreferrer"
					>
						Next.js Docs
					</a>
					<a
						href="https://turbo.build/repo/docs"
						className="rounded-lg border border-border bg-secondary text-secondary-foreground px-6 py-3 font-medium hover:bg-accent transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						Turborepo Docs
					</a>
				</div>
			</div>
		</main>
	);
}
