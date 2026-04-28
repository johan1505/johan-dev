import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import type { ContactFormPayload } from "./types";

const sqsClient = new SQSClient({});

const QUEUE_URL = process.env.QUEUE_URL;

function validatePayload(body: ContactFormPayload): string[] {
	const errors: string[] = [];

	if (!body.name || body.name.trim() === "") {
		errors.push("name is required");
	}

	if (!body.email || body.email.trim() === "") {
		errors.push("email is required");
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
		errors.push("email is invalid");
	}

	if (!body.phone || body.phone.trim() === "") {
		errors.push("phone is required");
	}

	if (!body.subject || body.subject.trim() === "") {
		errors.push("subject is required");
	}

	if (!body.message || body.message.trim() === "") {
		errors.push("message is required");
	} else if (body.message.length > 5000) {
		errors.push("message must be 5000 characters or fewer");
	}

	if (typeof body.agreedToContact !== "boolean" || !body.agreedToContact) {
		errors.push("agreedToContact must be true");
	}

	return errors;
}

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
	const headers = { "Content-Type": "application/json" };

	try {
		let body: ContactFormPayload;
		try {
			body = JSON.parse(event.body || "{}");
		} catch {
			return {
				statusCode: 400,
				headers,
				body: JSON.stringify({
					success: false,
					error: "Invalid JSON in request body",
				}),
			};
		}

		const validationErrors = validatePayload(body);
		if (validationErrors.length > 0) {
			return {
				statusCode: 400,
				headers,
				body: JSON.stringify({
					success: false,
					error: "Validation failed",
					details: validationErrors,
				}),
			};
		}

		console.log("Putting contact request in queue...");
		console.log(`Source ip: ${event.requestContext?.http?.sourceIp || "unknown"}`);
		console.log(`User agent: ${event.headers?.["user-agent"] || "unknown"}`);

		const command = new SendMessageCommand({
			QueueUrl: QUEUE_URL,
			MessageBody: JSON.stringify(body),
			MessageAttributes: {
				email: {
					DataType: "String",
					StringValue: body.email,
				},
			},
		});

		await sqsClient.send(command);

		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({
				success: true,
				message: "Message submitted successfully",
			}),
		};
	} catch (error) {
		console.error("Error processing contact request:", error);

		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({
				success: false,
				error: "Internal server error. Please try again later.",
			}),
		};
	}
};
