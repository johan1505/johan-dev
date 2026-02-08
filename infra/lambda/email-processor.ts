import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import type { SQSEvent } from "aws-lambda";
import type { ContactFormPayload } from "./types";

const sesClient = new SESClient({});

function getRequiredEnv(key: string): string {
	const value = process.env[key];
	if (!value) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
	return value;
}

const RECIPIENT_EMAIL = getRequiredEnv("RECIPIENT_EMAIL");
const SENDER_EMAIL = getRequiredEnv("SENDER_EMAIL");

function generateEmailContent(contact: ContactFormPayload): {
	subject: string;
	htmlBody: string;
	textBody: string;
} {
	const subject = `New Contact Form Submission from ${contact.name}`;

	const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #b45309; color: white; padding: 20px; text-align: center; }
        .section { margin: 20px 0; padding: 15px; background-color: #f9fafb; border-radius: 8px; }
        .section-title { font-weight: bold; margin-bottom: 10px; color: #1f2937; }
        .info-row { margin: 5px 0; }
        .label { font-weight: 600; }
        .message-content { white-space: pre-wrap; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
        </div>

        <div class="section">
          <div class="section-title">Contact Information</div>
          <div class="info-row"><span class="label">Name:</span> ${contact.name}</div>
          <div class="info-row"><span class="label">Email:</span> <a href="mailto:${contact.email}">${contact.email}</a></div>
        </div>

        <div class="section">
          <div class="section-title">Subject</div>
          <p>${contact.subject}</p>
        </div>

        <div class="section">
          <div class="section-title">Message</div>
          <p class="message-content">${contact.message}</p>
        </div>

        <div class="footer">
          <p>This is an automated message from the johan5.com contact form.</p>
          <p>The sender has agreed to be contacted.</p>
        </div>
      </div>
    </body>
    </html>
  `;

	const textBody = `
NEW CONTACT FORM SUBMISSION
============================

Contact Information
-------------------
Name: ${contact.name}
Email: ${contact.email}

Subject
-------------------
${contact.subject}

Message
-------------------
${contact.message}

---
This is an automated message from the johan5.com contact form.
The sender has agreed to be contacted.
  `.trim();

	return { subject, htmlBody, textBody };
}

export const handler = async (event: SQSEvent): Promise<void> => {
	console.log("Processing", event.Records.length, "contact request(s)");

	for (const record of event.Records) {
		try {
			const contact: ContactFormPayload = JSON.parse(record.body);
			const { subject, htmlBody, textBody } = generateEmailContent(contact);

			const command = new SendEmailCommand({
				Source: SENDER_EMAIL,
				Destination: {
					ToAddresses: [RECIPIENT_EMAIL],
				},
				ReplyToAddresses: [contact.email],
				Message: {
					Subject: {
						Data: subject,
						Charset: "UTF-8",
					},
					Body: {
						Html: {
							Data: htmlBody,
							Charset: "UTF-8",
						},
						Text: {
							Data: textBody,
							Charset: "UTF-8",
						},
					},
				},
			});

			await sesClient.send(command);
			console.log("Email sent successfully");
		} catch (error) {
			console.error("Error processing record:", error);
			throw error;
		}
	}
};
