import * as cdk from "aws-cdk-lib";
import * as amplify from "aws-cdk-lib/aws-amplify";
import * as iam from "aws-cdk-lib/aws-iam";
import type { Construct } from "constructs";

interface AmplifyStackProps extends cdk.StackProps {
	githubToken: cdk.SecretValue;
	githubOwner: string;
	githubRepo: string;
	githubBranch: string;
	contactApiUrl: string;
	domainName: string;
}

export class AmplifyStack extends cdk.Stack {
	public readonly amplifyApp: amplify.CfnApp;
	public readonly amplifyBranch: amplify.CfnBranch;

	constructor(scope: Construct, id: string, props: AmplifyStackProps) {
		super(scope, id, props);

		const customHeadersYaml = [
			"customHeaders:",
			"- pattern: _next/**",
			"  headers:",
			"    - key: Cache-Control",
			"      value: public, max-age=31536000, immutable",
			'- pattern: "*"',
			"  headers:",
			"    - key: Cache-Control",
			"      value: max-age=0, s-maxage=600, must-revalidate",
		].join("\n");

		const buildSpec = [
			"version: 1",
			"applications:",
			"  - appRoot: app",
			`    ${customHeadersYaml.split("\n").join("\n    ")}`,
			"    frontend:",
			"      phases:",
			"        preBuild:",
			"          commands:",
			"            - npm ci",
			"        build:",
			"          commands:",
			"            - npx turbo run build --filter=app",
			"      artifacts:",
			"        baseDirectory: out",
			"        files:",
			"          - '**/*'",
			"      cache:",
			"        paths:",
			"          - node_modules/**/*",
			"          - app/node_modules/**/*",
		].join("\n");

		const amplifyRole = new iam.Role(this, "AmplifyServiceRole", {
			assumedBy: new iam.CompositePrincipal(
				new iam.ServicePrincipal("amplify.amazonaws.com"),
				new iam.ServicePrincipal(`amplify.${this.region}.amazonaws.com`)
			),
			description: "Service role for Amplify to build and deploy the frontend",
		});

		amplifyRole.addManagedPolicy(
			iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess-Amplify")
		);

		this.amplifyApp = new amplify.CfnApp(this, "AmplifyApp", {
			name: "johan-dev-web",
			description: "johan-dev Next.js frontend application",
			repository: `https://github.com/${props.githubOwner}/${props.githubRepo}`,
			accessToken: props.githubToken.unsafeUnwrap(),
			platform: "WEB",
			buildSpec,
			iamServiceRole: amplifyRole.roleArn,
			environmentVariables: [
				{
					name: "AMPLIFY_MONOREPO_APP_ROOT",
					value: "app",
				},
				{
					name: "AMPLIFY_DIFF_DEPLOY",
					value: "true",
				},
				{
					name: "AMPLIFY_DIFF_DEPLOY_ROOT",
					value: "app",
				},
				{
					name: "NEXT_PUBLIC_CONTACT_API_URL",
					value: props.contactApiUrl,
				},
			],
		});

		this.amplifyBranch = new amplify.CfnBranch(this, "AmplifyBranch", {
			appId: this.amplifyApp.attrAppId,
			branchName: props.githubBranch,
			enableAutoBuild: true,
			stage: "PRODUCTION",
		});

		new amplify.CfnDomain(this, "AmplifyDomain", {
			appId: this.amplifyApp.attrAppId,
			domainName: props.domainName,
			subDomainSettings: [
				{
					branchName: this.amplifyBranch.branchName,
					prefix: "",
				},
				{
					branchName: this.amplifyBranch.branchName,
					prefix: "www",
				},
			],
		});

		new cdk.CfnOutput(this, "AmplifyAppUrl", {
			value: `https://${props.githubBranch}.${this.amplifyApp.attrDefaultDomain}`,
			description: "Amplify App URL",
		});

		new cdk.CfnOutput(this, "AmplifyAppId", {
			value: this.amplifyApp.attrAppId,
			description: "Amplify App ID",
		});
	}
}
