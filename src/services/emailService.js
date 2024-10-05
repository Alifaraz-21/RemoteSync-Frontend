const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to send emails");
  }
});


const sendVerificationEmail = async (user, res) => {
  const { _id, email } = user;

  const token = jwt.sign({ id: _id }, process.env.JWT_SECRET, { expiresIn: '6h' });
  const currentUrl = "http://localhost:3000/api/";


  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Verify your email address to complete signup and login.</p>
           <p>This link <b>expires in 6 hours</b>.</p>
           <p>Click <a href="${currentUrl}user/verify/${token}">here</a> to verify your email.<p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error('Could not send verification email.');
  }
};

module.exports = { sendVerificationEmail };
