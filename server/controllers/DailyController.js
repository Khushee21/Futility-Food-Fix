const MealForm = require("../models/MealForm");
const StudentSubmission = require("../models/StudentSubmission");
const today= new Date().toISOString().split("T")[0];

const createDailyMealForm = async (req, res) => {
  try {
    const {
      myDate,
      Breakfast,
      Lunch_Daal,
      Lunch_Sabji,
      Lunch_Chapati,
      High_Tea,
      Dinner_Daal,
      Dinner_Sabji,
      Dinner_Chapati,
    } = req.body;

    console.log("🔍 Received myDate:", myDate);

    // Validate inputs (also check for empty strings)
    if (
      !myDate?.trim() ||
      !Breakfast?.trim() ||
      !Lunch_Daal?.trim() ||
      !Lunch_Sabji?.trim() ||
      !Lunch_Chapati?.trim() ||
      !High_Tea?.trim() ||
      !Dinner_Daal?.trim() ||
      !Dinner_Sabji?.trim() ||
      !Dinner_Chapati?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All meal fields are required!",
      });
    }

    // Update existing meal form or insert a new one
    const updatedForm = await MealForm.findOneAndUpdate(
      { myDate }, 
      { $set: req.body }, 
      { new: true, upsert: true } 
    );
    
    // Emit event via Socket.IO to notify all clients
    const io = req.app.get("socketio");
    if (io) {
      io.emit("newMealForm", { data: updatedForm });
    } else {
      console.warn("⚠️ Socket.IO instance not found in app");
    }

    res.status(200).json({
      success: true,
      message: ` meal form for ${today} saved successfully`,
      data: updatedForm,
    });
  } catch (error) {
    console.error("❌ Error creating meal form:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to create meal form", 
      error: error.message 
    });
  }
};

const getDailyMealForm = async (req, res) => {
    try {
        const form = await MealForm.findOne({ myDate:today });
        if(!form) {
          return res.status(400).json({ success: true , data: form});
        }
        res.status(200).json({ success: true , data: form});
      }
    catch(error) {
      console.error("❌ Error fetching meal form:", error);
      res.status(500).json({success: false , message: `Failed to fetch meal form: ${error.message}`});
    }
};




const submitStudentForm = async (req, res) => {
  try {
    console.log("📥 Received request:", req.body);

    const { studentId, studentName, mealSelections, myDate } = req.body;

    if (!studentId || !studentName || !mealSelections || !myDate) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Validate mealSelections to match schema fields (breakfast, lunch, highTea, dinner)
    const validMeals = ["breakfast", "lunch", "highTea", "dinner"];
    const meals = {
      breakfast: mealSelections.includes("breakfast"),
      lunch: mealSelections.includes("lunch"),
      highTea: mealSelections.includes("highTea"),
      dinner: mealSelections.includes("dinner"),
    };

    // Check if the student has already submitted for the same date
    const existingSubmission = await StudentSubmission.findOne({ studentId, date: myDate });
    if (existingSubmission) {
      return res.status(400).json({ success: false, message: "You have already submitted your meal selection for today." });
    }

    // Save the new submission
    const submission = new StudentSubmission({
      studentId,
      studentName,
      date: myDate,
      meals, // Store the meal selections
    });

    await submission.save();
    console.log("✅ Data saved successfully:", submission);

    res.status(201).json({ success: true, message: "Meal selection submitted successfully!", data: submission });
  } catch (error) {
    console.error("❌ Error submitting student form:", error);
    res.status(500).json({ success: false, message: "Server error.", error: error.message });
  }
};


const getStudentSubmissions =  async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

    const submissions = await StudentSubmission.find({ date: today });

    res.status(200).json(submissions);
  } catch (err) {
    console.error("Error fetching today's submissions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMonthlyFormSubmissionCount = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ success: false, message: "Month and year are required" });
    }

    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const submissions = await StudentSubmission.aggregate([
      {
        $match: {
          date: {
            $gte: startDate.toISOString().split("T")[0],
            $lt: endDate.toISOString().split("T")[0]
          }
        }
      },
      {
        $group: {
          _id: "$studentId",
          studentName: { $first: "$studentName" },
          submissionCount: { $sum: 1 }
        }
      },
      {
        $sort: { submissionCount: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      message: `Monthly submission count for ${month}-${year}`,
      data: submissions
    });

  } catch (error) {
    console.error("❌ Error fetching monthly submission count:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  createDailyMealForm,
  getDailyMealForm,
  submitStudentForm,
  getStudentSubmissions,
  getMonthlyFormSubmissionCount
};
