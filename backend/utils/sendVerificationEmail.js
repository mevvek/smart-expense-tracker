const axios = require("axios");

const sendVerificationEmail = async (email, otp) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Welcome to Smart Expense Tracker 👋</h2>

      <p>Thank you for creating your account.</p>

      <p>Your 6-digit verification OTP is:</p>

      <div style="
        font-size:32px;
        font-weight:bold;
        letter-spacing:8px;
        color:#2563eb;
        margin:20px 0;
      ">
        ${otp}
      </div>

      <p>
        This OTP will expire in <b>10 minutes</b>.
      </p>

      <p>
        If you didn't create this account, you can safely ignore this email.
      </p>
    </div>
  `;

  await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: {
        name: "Smart Expense Tracker",
        email: process.env.EMAIL_USER,
      },
      to: [{ email }],
      subject: "Your Smart Expense Tracker Verification OTP",
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

  console.log("✅ Verification OTP sent to:", email);
};

module.exports = sendVerificationEmail;