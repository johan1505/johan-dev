#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { DomainStack } from "../lib/domain-stack";
import { ContactFormStack } from "../lib/contact-form-stack";
import { AmplifyStack } from "../lib/amplify-stack";
import env from "../lib/env";

const app = new cdk.App();

const cdkEnv = {
	account: env.CDK_DEFAULT_ACCOUNT,
	region: env.CDK_DEFAULT_REGION,
};

const domainStack = new DomainStack(app, "JohanDevDomain", {
	env: cdkEnv,
	description: "johan-dev Route 53 hosted zone and ACM certificate",
	domainName: env.DOMAIN_NAME,
});

const contactFormStack = new ContactFormStack(app, "JohanDevContactForm", {
	env: cdkEnv,
	description: "johan-dev contact form API, SQS queue, and SES email processing",
	recipientEmail: env.RECIPIENT_EMAIL,
	allowedOrigins: env.ALLOWED_ORIGINS,
	hostedZone: domainStack.hostedZone,
});

contactFormStack.addDependency(domainStack);

new AmplifyStack(app, "JohanDevAmplify", {
	env: cdkEnv,
	description: "johan-dev Amplify frontend stack",
	githubToken: cdk.SecretValue.unsafePlainText(env.GITHUB_TOKEN),
	githubOwner: env.GITHUB_OWNER,
	githubRepo: env.GITHUB_REPO,
	githubBranch: env.GITHUB_BRANCH,
	contactApiUrl: contactFormStack.apiUrl,
	domainName: env.DOMAIN_NAME,
});
