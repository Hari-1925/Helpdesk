import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

// Initialize transporter
const initTransporter = async () => {
    if (process.env.EMAIL_SERVICE === 'gmail' || process.env.EMAIL_USER) {
        try {
            console.log('[Email Service] Initializing with Gmail settings (IPv4 forced)...');
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                tls: {
                    rejectUnauthorized: false // Helps if there are certificate chain issues, but use with caution
                },
                family: 4, // Force IPv4
                logger: true, // Log to console
                debug: true // Include SMTP traffic in logs
            });

            // Verify connection
            try {
                await transporter.verify();
                console.log('[Email Service] Server is ready to take our messages');
                return transporter;
            } catch (error) {
                console.error('[Email Service] Connection Error:', error);
                // Return transporter anyway, maybe transient error or config issue that will show up on send
                return transporter;
            }

        } catch (err) {
            console.error('[Email Service] Failed to create transporter:', err);
            return null;
        }
    } else {
        // Ethereal/Dev
        return nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'ethereal.user@example.com',
                pass: 'ethereal_pass'
            }
        });
    }
};

// Singleton promise
const transporterPromise = initTransporter();

export const sendEmail = async ({ to, subject, html }) => {
    try {
        console.log(`[Email Service] Attempting to send email to: ${to}`);

        const transporter = await transporterPromise;

        if (!transporter) {
            throw new Error("Transporter not initialized");
        }

        // Mock sending by default if no real credentials are set and not in production
        if (!process.env.EMAIL_USER && !process.env.ETHEREAL_USER && process.env.NODE_ENV !== 'production') {
            console.log('---------------------------------------------------');
            console.log('[MOCK EMAIL CONTENT]');
            console.log(`To: ${to}`);
            console.log(`Subject: ${subject}`);
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
