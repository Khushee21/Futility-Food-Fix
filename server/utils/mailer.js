const nodemailer = require('nodemailer');

const sendMail = async (emails, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can replace this with another email service if needed
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const sendPromises = emails.map(async (email) => {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message,
      });
    });

    // Wait for all email sends to complete
    await Promise.all(sendPromises);
    console.log('Emails sent successfully!');
  } catch (error) {
    console.error('Error sending emails:', error);
    throw new Error('Failed to send emails');
  }
};

module.exports = { sendMail };
