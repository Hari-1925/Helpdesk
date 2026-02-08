import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

// Create a transporter
let transporter;

if (process.env.EMAIL_SERVICE === 'gmail') {
    // configured for Gmail
    transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465, // SSL
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        family: 4, // Force IPv4 to prevent ENETUNREACH errors
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000,
        socketTimeout: 10000
    });

    // Verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.error('[Email Service] Connection Error:', error);
        } else {
            console.log('[Email Service] Server is ready to take our messages');
        }
    });
} else {
    // For development/fallback, use Ethereal or just a dummy one that logs to console
    transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ethereal.user@example.com', // Replace with real Ethereal creds if needed
            pass: 'ethereal_pass'
        }
    });
}

export const sendEmail = async ({ to, subject, html }) => {
    try {
        console.log(`[Email Service] Attempting to send email to: ${to}`);
        console.log(`[Email Service] Subject: ${subject}`);

        if (!transporter) {
            throw new Error("Transporter not initialized");
        }

        // Mock sending by default if no real credentials are set
        if (!process.env.EMAIL_USER && !process.env.ETHEREAL_USER) {
            console.log('---------------------------------------------------');
            console.log('[MOCK EMAIL CONTENT]');
            console.log(html);
            console.log('---------------------------------------------------');
            return { messageId: 'mock-id' };
        }

        const info = await transporter.sendMail({
            from: `"Helpdesk Support" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
