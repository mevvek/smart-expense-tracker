const axios = require("axios");

const sendResetPasswordEmail = async (email, token) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const htmlContent = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
      <h2>Reset Password 🔐</h2>
      <p>We received a request to reset your password.</p>
      <p>Click the button below to create a new password.</p>
      <a href="${resetLink}"
        style="
          background:#dc2626;
          color:white;
          padding:12px 22px;
          text-decoration:none;
          border-radius:6px;
          display:inline-block;
          font-weight:bold;
        ">
        Reset Password
      </a>
      <p style="margin-top:20px;">
        This link will expire in <b>30 minutes</b>.
      </p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    </div>
  `;

  await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: { name: "Smart Expense Tracker", email: process.env.EMAIL_USER },
      to: [{ email }],
      subject: "Reset Your Smart Expense Tracker Password",
      htmlContent,
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  console.log("✅ Password reset email sent to:", email);
};

module.exports = sendResetPasswordEmail;