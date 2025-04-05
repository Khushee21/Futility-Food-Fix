// controllers/mailController.js

const nodemailer = require('nodemailer');
require('dotenv').config();

// Function to send email
const sendMail = async (req, res) => {
  const { studentEmails, subject, message } = req.body; // Extract email details from the request body

  if (!studentEmails || studentEmails.length === 0) {
    return res.status(400).json({ success: false, message: 'No email addresses provided' });
  }

  try {
    // Create a Nodemailer transporter using SMTP service (e.g., Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use a different email service if needed
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or App Password (for Gmail)
      },
    });

    // Send email to each address in the list
    const sendPromises = studentEmails.map(async (email) => {
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender email address
        to: email, // Recipient email address
        subject: subject, // Email subject
        text: message, // Email body message
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}`);
    });

    // Wait for all emails to be sent
    await Promise.all(sendPromises);

    // Respond with success if all emails are sent
    res.status(200).json({ success: true, message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ success: false, message: 'Failed to send emails' });
  }
};

module.exports = { sendMail };
