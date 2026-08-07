import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (to: string, token: string) => {
  const link = `${process.env.BACKEND_URL}/users/verify?token=${token}`;

  console.log(`Verification link for ${to}: ${link}`);

  await transporter.sendMail({
    from: `"Brodić" <${process.env.SMTP_USER}>`,
    to,
    subject: "Verify your Brodić account",
    html: `
      <p>Welcome to Brodić!</p>
      <p><a href="${link}">Click here to verify your account</a></p>
      <p>This link expires in 24 hours.</p>`,
  });
};