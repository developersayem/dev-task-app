import nodemailer from "nodemailer";

// Configure nodemailer with custom email name
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  from: `"Tasksy" <${process.env.EMAIL_USER}>`,
});
