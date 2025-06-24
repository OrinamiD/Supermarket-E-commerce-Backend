const { json } = require("express");
const nodemailer = require("nodemailer");

const sendRegistrationEmail = async (name, email, password ) => {
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
      subject: `Registration Notification`,
      html: `
    <h2>Welcome to E-Commerce Superstore!</h2>
    <p>We're excited to have you join us. 

            <hr>

    <p>Thank you,<br/>The E-Commerce Superstore Team</p>
`,
    };

   await mailTransport.sendMail(emailDetails);
   console.log({message: "Check your email:"})
  } catch (error) {
     return json({message: "Email sending error:", error})
  }
};

module.exports = sendRegistrationEmail;

//  html: `
//     <h2>Welcome to E-Commerce Superstore!</h2>
//     <p>We're excited to have you join us. Please verify your email to complete your registration.</p>

//     <p>
//         <a href="https://www.yourcareerex.com/verify-email/${token}" style="background-color:#28a745;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Verify Email</a>
//     </p>

//     <p>If the button doesn't work, please use the link below:</p>
//     <p>
//         <a href="https://www.yourcareerex.com/verify-email/${token}">https://www.yourcareerex.com/verify-email/${token}</a>
//     </p>

//     <hr>

//     <p><strong>Your One-Time Password (OTP):</strong></p>
//     <h3 style="color:#333;background:#f1f1f1;padding:10px;border-radius:5px;text-align:center;">${OTP}</h3>

//     <p>The OTP is valid for a limited time and can be used if the link above doesn’t work.</p>

//     <p>Thank you,<br/>The E-Commerce Superstore Team</p>
// `
