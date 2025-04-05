const express = require("express");
// const { sendMail } = require("../utils/mailer"); // Import sendMail function
// const studentController = require("../controllers/studentController");

// const router = express.Router();

// Fetch student data by ID
router.get("/:id", studentController.getStudentById);

// Send report to student emails
// router.post('/sendReport', async (req, res) => {
//   try {
//     const { studentEmails, subject, message } = req.body; // Get email details from the request

//     if (!studentEmails || studentEmails.length === 0) {
//       return res.status(400).json({ success: false, message: 'No email addresses provided' });
//     }

//     // Call the sendMail function
//     await sendMail(studentEmails, subject, message);

//     // If everything goes well, respond with success
//     res.status(200).json({ success: true, message: 'Emails sent successfully!' });
//   } catch (error) {
//     console.error('Error in /sendReport route:', error);
//     res.status(500).json({ success: false, message: 'Failed to send emails.' });
//   }
// });

// module.exports = router;

// routes/studentRoutes.js
// const express = require('express');
const { sendReport } = require('../controllers/studentController');

const router = express.Router();

// POST route for sending the report
router.post('/sendReport', sendReport);

module.exports = router;

