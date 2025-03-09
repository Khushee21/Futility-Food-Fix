const MealForm = require("../models/MealForm");
const StudentSubmission = require("../models/StudentSubmission");

const createDailyMealForm = async (req, res) => {
  try {
    const formData = req.body;
    const today = new Date().toISOString().split("T")[0];

    // Check if a meal form already exists for today
    const existingForm = await MealForm.findOne({ myDate: today });
    if (existingForm) {
      return res.status(400).json({ success: false, message: "A meal form has already been created for today." });
    }

    // Assign the current date to the new form
    formData.myDate = today;
    const newForm = await MealForm.create(formData);

    // Emit event via Socket.IO to notify all clients
    const io = req.app.get("socketio");
    io.emit("newMealForm", { data: newForm });

    res.status(201).json({ success: true, message: "Daily meal form created", data: newForm });
  } catch (error) {
    console.error("❌ Error creating meal form:", error);
    res.status(500).json({ success: false, message: "Failed to create meal form", error: error.message });
  }
};

const getDailyMealForm = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const form = await MealForm.findOne({ myDate: today });

    if (!form) {
      return res.status(404).json({ success: false, message: "No daily meal form found for today" });
    }

    res.status(200).json({ success: true, data: form });
  } catch (error) {
    console.error("❌ Error fetching meal form:", error);
    res.status(500).json({ success: false, message: `Failed to fetch meal form: ${error.message}` });
  }
};

const submitStudentForm = async (req, res) => {
  try {
    console.log("📥 Received request:", req.body);

    const { studentId, studentName, mealSelections, myDate } = req.body;

    if (!studentId || !studentName || !mealSelections || mealSelections.length === 0 || !myDate) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Check if the student has already submitted for the same date
    const existingSubmission = await StudentSubmission.findOne({ studentId, myDate });
    if (existingSubmission) {
      return res.status(400).json({ success: false, message: "You have already submitted your meal selection for today." });
    }

    // Save the new submission
    const submission = new StudentSubmission({
      studentId,
      studentName,
      mealSelections,
      myDate,
      submissionDate: new Date(), // Store the submission timestamp
    });

    await submission.save();
    console.log("✅ Data saved successfully:", submission);

    res.status(201).json({ success: true, message: "Meal selection submitted successfully!", data: submission });
  } catch (error) {
    console.error("❌ Error submitting student form:", error);
    res.status(500).json({ success: false, message: "Server error.", error: error.message });
  }
};

const getStudentSubmissions = async (req, res) => {
  try {
    const studentId = req.query.studentId || req.params.studentId; // Support both query and URL param

    if (!studentId) {
      return res.status(400).json({ success: false, message: "Student ID is required" });
    }

    const submissions = await StudentSubmission.find({ studentId }).sort({ submissionDate: -1 });

    if (!submissions.length) {
      return res.status(404).json({ success: false, message: "No meal selections found for this student" });
    }

    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    console.error("❌ Error fetching student submissions:", error);
    res.status(500).json({ success: false, message: `Failed to fetch student submissions: ${error.message}` });
  }
};

module.exports = {
  createDailyMealForm,
  getDailyMealForm,
  submitStudentForm,
  getStudentSubmissions,
};
