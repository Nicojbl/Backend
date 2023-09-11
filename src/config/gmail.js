import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const gmail = process.env.GMAIL;
const pass = process.env.PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: gmail,
    pass: pass,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

export { transporter };
