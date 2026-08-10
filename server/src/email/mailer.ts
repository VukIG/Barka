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
  <div style="background-color:#f1f5f9;padding:40px 0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0"
                 style="background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
            <tr>
              <td style="background-color:#0284c7;padding:28px 32px;">
                <span style="font-size:22px;font-weight:700;color:#ffffff;">⛵ Brodić</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 16px;font-size:20px;color:#0f172a;">Welcome aboard!</h1>
                <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#475569;">
                  Thanks for signing up. Confirm your email address to activate your account and start booking rides along the Adriatic.
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:8px;background-color:#0284c7;">
                      <a href="${link}"
                         style="display:inline-block;padding:12px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">
                        Verify my account
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#94a3b8;">
                  This link expires in 24 hours. If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="margin:8px 0 0;font-size:13px;word-break:break-all;color:#0284c7;">
                  ${link}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:#f8fafc;border-top:1px solid #e2e8f0;">
                <p style="margin:0;font-size:12px;color:#94a3b8;">
                  If you didn't create a Brodić account, you can safely ignore this email.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`,
  });
};
