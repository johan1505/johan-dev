import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigatewayv2";
import * as apigatewayIntegrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ses from "aws-cdk-lib/aws-ses";
import * as lambdaEventSources from "aws-cdk-lib/aws-lambda-event-sources";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import type { Construct } from "constructs";
import type * as route53 from "aws-cdk-lib/aws-route53";
import * as path from "node:path";

const LAMBDA_TIMEOUT_SECONDS = 30;
const SQS_VISIBILITY_TIMEOUT_SECONDS = LAMBDA_TIMEOUT_SECONDS * 6;

interface ContactFormStackProps extends cdk.StackProps {
	recipientEmail: string;
	allowedOrigins: string[];
	hostedZone: route53.IHostedZone;
}

export class ContactFormStack extends cdk.Stack {
	public readonly apiUrl: string;

	constructor(scope: Construct, id: string, props: ContactFormStackProps) {
		super(scope, id, props);

		const senderEmail = `noreply@${props.hostedZone.zoneName}`;

		const contactQueue = new sqs.Queue(this, "ContactRequestQueue", {
			queueName: "johan-dev-contact-requests",
			visibilityTimeout: cdk.Duration.seconds(SQS_VISIBILITY_TIMEOUT_SECONDS),
			retentionPeriod: cdk.Duration.days(7),
			deadLetterQueue: {
				queue: new sqs.Queue(this, "ContactRequestDLQ", {
					queueName: "johan-dev-contact-requests-dlq",
					retentionPeriod: cdk.Duration.days(14),
				}),
				maxReceiveCount: 3,
			},
		});

		new ses.EmailIdentity(this, "SesDomainIdentity", {
			identity: ses.Identity.publicHostedZone(props.hostedZone),
		});

		const emailProcessorLambda = new NodejsFunction(this, "EmailProcessorLambda", {
			functionName: "johan-dev-contact-email-processor",
			runtime: Runtime.NODEJS_LATEST,
			entry: path.join(__dirname, "../lambda/email-processor.ts"),
			handler: "handler",
			timeout: cdk.Duration.seconds(LAMBDA_TIMEOUT_SECONDS),
			memorySize: 256,
			environment: {
				RECIPIENT_EMAIL: props.recipientEmail,
				SENDER_EMAIL: senderEmail,
			},
			bundling: {
				minify: true,
				sourceMap: true,
			},
		});

		emailProcessorLambda.addToRolePolicy(
			new iam.PolicyStatement({
				actions: ["ses:SendEmail", "ses:SendRawEmail"],
				resources: [
					`arn:aws:ses:${this.region}:${this.account}:identity/${props.hostedZone.zoneName}`,
				],
			})
		);

		emailProcessorLambda.addEventSource(
			new lambdaEventSources.SqsEventSource(contactQueue, {
				batchSize: 1,
			})
		);

		const apiHandlerLambda = new NodejsFunction(this, "ApiHandlerLambda", {
			functionName: "johan-dev-contact-api-handler",
			runtime: Runtime.NODEJS_LATEST,
			entry: path.join(__dirname, "../lambda/api-handler.ts"),
			handler: "handler",
			timeout: cdk.Duration.seconds(10),
			memorySize: 256,
			environment: {
				QUEUE_URL: contactQueue.queueUrl,
			},
			bundling: {
				minify: true,
				sourceMap: true,
			},
		});

		contactQueue.grantSendMessages(apiHandlerLambda);

		const httpApi = new apigateway.HttpApi(this, "ContactApi", {
			apiName: "johan-dev-contact-api",
			description: "API for johandev.net contact form submissions",
			corsPreflight: {
				allowOrigins: props.allowedOrigins,
				allowMethods: [apigateway.CorsHttpMethod.POST],
				allowHeaders: ["Content-Type"],
				maxAge: cdk.Duration.days(1),
			},
		});

		httpApi.addRoutes({
			path: "/contact",
			methods: [apigateway.HttpMethod.POST],
			integration: new apigatewayIntegrations.HttpLambdaIntegration(
				"ContactApiIntegration",
				apiHandlerLambda
			),
		});

		const stage = httpApi.defaultStage?.node.defaultChild as apigateway.CfnStage;
		stage.addPropertyOverride("DefaultRouteSettings", {
			ThrottlingBurstLimit: 50,
			ThrottlingRateLimit: 25,
		});

		if (!httpApi.url) {
			throw new Error("API Gateway URL could not be retrieved");
		}

		this.apiUrl = httpApi.url;

		new cdk.CfnOutput(this, "ApiEndpoint", {
			value: `${httpApi.url}contact`,
			description: "Contact Form API endpoint",
		});
	}
}
