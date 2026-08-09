const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.authentications["apiKey"].apiKey = process.env.BREVO_API_KEY;

const sendVerificationEmail = async (email, token) => {
  const verifyLink = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${token}`;

  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "Verify your Smart Expense Tracker Account";
  sendSmtpEmail.sender = {
    name: "Smart Expense Tracker",
    email: process.env.EMAIL_USER,
  };
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.htmlContent = `
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
  `;

  await apiInstance.sendTransacEmail(sendSmtpEmail);

  console.log("✅ Verification email sent to:", email);
};

module.exports = sendVerificationEmail;