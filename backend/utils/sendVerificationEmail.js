const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  const verifyLink = `http://localhost:5000/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Smart Expense Tracker" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Smart Expense Tracker Account",

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome to Smart Expense Tracker 👋</h2>

        <p>Thank you for creating your account.</p>

        <p>Please click the button below to verify your email address.</p>

        <a href="${verifyLink}"
          style="
            background:#2563eb;
            color:#ffffff;
            padding:12px 22px;
            text-decoration:none;
            border-radius:6px;
            display:inline-block;
            font-weight:bold;
          ">
          Verify Email
        </a>

        <p style="margin-top:20px;">
          This verification link will expire in <b>30 minutes</b>.
        </p>

        <p>
          If you didn't create this account, you can safely ignore this email.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);

  console.log("✅ Verification email sent to:", email);
};

module.exports = sendVerificationEmail;