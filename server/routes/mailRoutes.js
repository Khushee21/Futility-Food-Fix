// routes/mailRoutes.js
const express = require('express');
const { sendMail } = require('../utils/mailer'); // Import the sendMail function

const router = express.Router();

// POST route for sending reports
router.post('/sendReport', async (req, res) => {
  try {
    const { studentEmails, subject, message } = req.body; // Extract details from the request body

    if (!studentEmails || studentEmails.length === 0) {
      return res.status(400).json({ success: false, message: 'No email addresses provided' });
    }

    // Call sendMail to send the report
    await sendMail(studentEmails, subject, message);

    // If everything is good, respond with success
    res.status(200).json({ success: true, message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error in /sendReport route:', error);
    res.status(500).json({ success: false, message: 'Failed to send emails.' });
  }
});

module.exports = router;
