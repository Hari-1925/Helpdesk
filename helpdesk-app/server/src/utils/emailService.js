import nodemailer from 'nodemailer';
import dns from 'dns';
import { promisify } from 'util';
import { env } from '../config/env.js';

const resolve4 = promisify(dns.resolve4);

// Initialize transporter asynchronously to ensure IPv4 resolution
const initTransporter = async () => {
    if (process.env.EMAIL_SERVICE === 'gmail') {
        try {
            // Force IPv4 resolution for Gmail
            const addresses = await resolve4('smtp.gmail.com');
            const ip = addresses[0];
            console.log(`[Email Service] Resolved smtp.gmail.com to IPv4: ${ip}`);

            const transporter = nodemailer.createTransport({
                host: ip,
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                tls: {
                    servername: 'smtp.gmail.com' // Necessary when using IP
                },
                connectionTimeout: 10000,
                greetingTimeout: 10000,
                socketTimeout: 10000
            });

            // Verify connection
            try {
                await transporter.verify();
                console.log('[Email Service] Server is ready to take our messages');
                return transporter;
            } catch (error) {
                console.error('[Email Service] Connection Error:', error);
                // Return transporter anyway, maybe transient error
                return transporter;
            }

        } catch (err) {
            console.error('[Email Service] DNS Resolution failed, falling back to hostname:', err);
            // Fallback
            return nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
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
        console.log(`[Email Service] Subject: ${subject}`);

        const transporter = await transporterPromise;

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
