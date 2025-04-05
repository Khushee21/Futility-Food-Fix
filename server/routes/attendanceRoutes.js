const express = require("express");
const router = express.Router();
const {
  updateAttendance
} = require("../controllers/attendanceController"); 

router.post('/update', updateAttendance);

module.exports = router;
