import { env } from '../config/env.js';

/**
 * MOCK Email Service
 * 
 * Since the deployment environment (Render Free Tier) blocks outbound SMTP,
 * we are mocking the email service to simply log the email content to the console.
 * This allows us to see OTPs and other notifications without crashing the server.
 */

export const sendEmail = async ({ to, subject, html }) => {
    try {
        console.log('---------------------------------------------------');
        console.log('[MOCK EMAIL SERVICE - OUTBOUND BLOCKED]');
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log('[HTML Content]:');
        console.log(html);
        console.log('---------------------------------------------------');

        // Return a mock success response compatible with nodemailer's info object
        return {
            messageId: `mock-${Date.now()}`,
            accepted: [to],
            rejected: []
        };
    } catch (error) {
        console.error("Error in mock email service:", error);
        // We generally don't want to throw here to avoid crashing the flow, but logging is critical
        return null;
    }
};
