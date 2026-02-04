import * as dotenv from "dotenv";
import * as path from "node:path";

dotenv.config({ path: path.join(__dirname, "../.env") });

interface EnvConfig {
	CDK_DEFAULT_ACCOUNT: string;
	CDK_DEFAULT_REGION: string;
	GITHUB_TOKEN: string;
	GITHUB_OWNER: string;
	GITHUB_REPO: string;
	GITHUB_BRANCH: string;
}

function getRequiredEnv(key: string): string {
	const value = process.env[key];
	if (!value) {
		throw new Error(
			`Missing required environment variable: ${key}. ` +
				`Please copy .env.example to .env and fill in the values.`
		);
	}
	return value;
}

function loadEnvConfig(): EnvConfig {
	return {
		CDK_DEFAULT_ACCOUNT: getRequiredEnv("CDK_DEFAULT_ACCOUNT"),
		CDK_DEFAULT_REGION: getRequiredEnv("CDK_DEFAULT_REGION"),
		GITHUB_TOKEN: getRequiredEnv("GITHUB_TOKEN"),
		GITHUB_OWNER: getRequiredEnv("GITHUB_OWNER"),
		GITHUB_REPO: getRequiredEnv("GITHUB_REPO"),
		GITHUB_BRANCH: getRequiredEnv("GITHUB_BRANCH"),
	};
}

const config = loadEnvConfig();

export default config;
