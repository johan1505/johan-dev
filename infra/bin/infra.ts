#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AmplifyStack } from "../lib/amplify-stack";
import env from "../lib/env";

const app = new cdk.App();

new AmplifyStack(app, "JohanDevAmplify", {
	env: {
		account: env.CDK_DEFAULT_ACCOUNT,
		region: env.CDK_DEFAULT_REGION,
	},
	description: "johan-dev Amplify frontend stack",
	githubToken: cdk.SecretValue.unsafePlainText(env.GITHUB_TOKEN),
	githubOwner: env.GITHUB_OWNER,
	githubRepo: env.GITHUB_REPO,
	githubBranch: env.GITHUB_BRANCH,
});
