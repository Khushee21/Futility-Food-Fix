const nodemailer = require('nodemailer');

// Handle form submission
const submitForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Send email logic (e.g., using Nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Form Submission Confirmation',
      text: `Hello ${name},\n\nWe received your message: "${message}"\n\nThank you!`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error submitting form' });
  }
};

module.exports = { submitForm };
