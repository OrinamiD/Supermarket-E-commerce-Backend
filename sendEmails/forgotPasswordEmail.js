const nodemailer = require("nodemailer");
const { isPartOfTypeNode } = require("typescript");

const sendForgotPasswordEmail = async (email, token, otp) => {
  try {
    const mailTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    const emailDetails = {
      from: `${process.env.EMAIL}`,
      to: `${email}`,
      subject: `Reset your password`,
      html: `
    <h4>Here is the token to reset your password.</h4>
    <p>
        Please click the button below:
    </p>
    <p>
        <a href="https://www.yourcareerex.com/reset-password/${token}" style="background-color:#007BFF;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Reset Password</a>
    </p>
    <p>
        If the button doesn’t work for any reason, please use the link below:
    </p>
    <p>
        <a href="https://www.yourcareerex.com/reset-password/${token}">https://www.yourcareerex.com/reset-password/${token}</a>
    </p>

    <hr>

       <p>
        <a href="https://www.yourcareerex.com/reset-password/${otp}">https://www.yourcareerex.com/reset-password/${otp}</a>
    </p>
`,
    };

    mailTransport.sendMail(emailDetails);
  } catch (error) {
    return json({ message: error.message });
  }
};

module.exports = sendForgotPasswordEmail;
