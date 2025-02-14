import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

dotenv.config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,  // Your Gmail
		pass: process.env.EMAIL_PASS,  // Your App Password
	},
});

// Send Email Function
const sendEmail = async (to, subject, html) => {
	try {
		const response = await transporter.sendMail({
			from: `"Farm Shop" <${process.env.EMAIL_USER}>`,
			to,
			subject,
			html,
		});
		console.log(`Email sent to ${to}:`, response.messageId);
	} catch (error) {
		console.error(`Error sending email to ${to}:`, error);
		throw new Error(`Email sending failed: ${error}`);
	}
};

// Email functions
export const sendVerificationEmail = async (email, verificationToken) => {
	const html = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken);
	await sendEmail(email, "Verify your email", html);
};

export const sendWelcomeEmail = async (email, name) => {
	await sendEmail(email, "Welcome to Farm Shop", WELCOME_EMAIL_TEMPLATE);
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);
	await sendEmail(email, "Reset your password", html);
};

export const sendResetSuccessEmail = async (email) => {
	await sendEmail(email, "Password Reset Successful", PASSWORD_RESET_SUCCESS_TEMPLATE);
};
