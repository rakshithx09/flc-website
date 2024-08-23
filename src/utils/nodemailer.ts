import fs from "fs";
import handlebars from "handlebars";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use false for STARTTLS; true for SSL on port 465
  auth: {
    user: process.env.SMTP_GMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendVerificationEmail = async (
  email: string,
  url: string,
  name: string,
) => {
  const html = fs.readFileSync("src/templates/emailVerification.html", "utf-8");
  const template = handlebars.compile(html);
  const htmlToSend = template({
    url: url,
  });
  const res = await transporter.sendMail({
    from: '"Finite Loop Club" <flc@nmamit.in>',
    to: email,
    subject: "Verify your email",
    text: `Hi ${name}`,
    html: htmlToSend,
  });
};

const sendPasswordResetEmail = async (
  email: string,
  url: string,
  name: string,
) => {
  const html = fs.readFileSync("src/templates/passwordReset.html", "utf-8");
  const template = handlebars.compile(html);
  const htmlToSend = template({
    url: url,
  });
  const res = await transporter.sendMail({
    from: '"Finite Loop Club" <flc@nmamit.in>',
    to: email,
    subject: "Reset your password",
    text: `Hi ${name}`,
    html: htmlToSend,
  });
};

const sendCertificationIsuueForEmail = async (
  email: string,
  certificationType: string,
  eventName: string,
  name: string,
) => {
  async function main() {
    await transporter.sendMail({
      from: '"Finite Loop Club" <flc@nmamit.in>',
      to: email,
      subject: "Flc Certification",
      text: `Hi ${name}`,
      html: `<p>Your ${certificationType} certification for ${eventName} has been isuued</p>`,
    });
  }

  await main().catch((error) => {
    console.error(error);
    throw error;
  });
};

export {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendCertificationIsuueForEmail,
};
