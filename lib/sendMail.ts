"use server";
import nodemailer from "nodemailer";
import { conf } from "@/conf/conf";
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: conf.NEXT_PUBLIC_SMTP_SERVER_USERNAME,
    pass: conf.NEXT_PUBLIC_SMTP_SERVER_PASSWORD,
  },
  secure: false, // Disable secure connection to avoid self-signed cert issue
  tls: {
    rejectUnauthorized: false, // Ignore unauthorized certificates
  },
});

export async function sendMail({
  subject,
  text,
  email,
  sendTo,
  html,
}: {
  subject: string;
  text: string;
  email: string;
  sendTo?: string;
  html?: string;
}) {
  try {
    await transporter.verify();
    const message = `Message from ${email} \n ${text}`;
    const info = await transporter.sendMail({
      from: conf.NEXT_PUBLIC_SMTP_SERVER_USERNAME,
      to: conf.NEXT_PUBLIC_SITE_MAIL_RECIEVER,
      subject,
      text: message,
      html: html ?? "",
    });
    console.log("Message Sent", info.messageId);
    console.log("Mail sent to", conf.NEXT_PUBLIC_SITE_MAIL_RECIEVER);
    return info;
  } catch (error) {
    console.error(
      "Something Went Wrong",
      conf.NEXT_PUBLIC_SMTP_SERVER_USERNAME,
      conf.NEXT_PUBLIC_SMTP_SERVER_PASSWORD,
      error
    );
    throw error;
  }
}
