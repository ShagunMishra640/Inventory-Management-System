const nodemailer = require("nodemailer");

const requiredMailConfig = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "MAIL_FROM",
];

const assertMailConfig = () => {
  const missingConfig = requiredMailConfig.filter((key) => !process.env[key]);

  if (missingConfig.length > 0) {
    const error = new Error(`Missing mail config: ${missingConfig.join(", ")}`);
    error.code = "MAIL_CONFIG_MISSING";
    error.missingConfig = missingConfig;
    throw error;
  }

  const cleanPassword = process.env.SMTP_PASS.replace(/\s/g, "");
  const placeholderPattern = /PASTE|your|password|app-password/i;

  if (placeholderPattern.test(process.env.SMTP_PASS)) {
    const error = new Error("SMTP_PASS still contains a placeholder value");
    error.code = "MAIL_PASSWORD_PLACEHOLDER";
    throw error;
  }

  if (process.env.SMTP_HOST === "smtp.gmail.com" && cleanPassword.length !== 16) {
    const error = new Error("Gmail SMTP_PASS must be a 16-character App Password");
    error.code = "MAIL_PASSWORD_INVALID";
    throw error;
  }
};

const sendEmail = async ({ to, subject, text, html }) => {
  assertMailConfig();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS.replace(/\s/g, ""),
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text,
    html,
  });
};

module.exports = sendEmail;
