// sendReferralEmail.js
const nodemailer = require('nodemailer');

const sendReferralEmail = async (referrerName, referrerEmail, refereeName, refereeEmail) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: refereeEmail,
    subject: 'You have been referred!',
    text: `Dear ${refereeName},\n\n${referrerName} has referred you to our platform.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Referral email sent successfully!');
  } catch (error) {
    console.error('Error sending referral email:', error);
  }
};

module.exports = sendReferralEmail;
