import nodemailer from 'nodemailer';
import dns from 'dns';
import { promisify } from 'util';
import { env } from './src/config/env.js';

const resolve4 = promisify(dns.resolve4);

const testEmail = async () => {
    console.log('Testing SMTP connectivity with Manual IPv4 Resolution and Port 587...');
    try {
        console.log('[Test Script] Resolving smtp.gmail.com...');
        const addresses = await resolve4('smtp.gmail.com');
        const ip = addresses[0];
        console.log(`[Test Script] Resolved to: ${ip}`);

        const transportConfig = {
            host: ip,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false,
                servername: 'smtp.gmail.com'
            },
            logger: true,
            debug: true,
            connectionTimeout: 20000,
        };

        const transporter = nodemailer.createTransport(transportConfig);

        await transporter.verify();
        console.log('✅ SMTP Connection Successful!');
    } catch (error) {
        console.error('❌ SMTP Connection Failed:', error);
    }
};

testEmail();
