const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

// Fetch student data by ID
router.get("/:id", studentController.getStudentById);

module.exports = router;