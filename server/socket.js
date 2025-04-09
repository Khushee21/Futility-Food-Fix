const { Server } = require("socket.io");
const StudentSubmission = require("./models/StudentSubmission");
const MealForm = require("./models/MealForm");

function setupSocket(server, app) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // ✅ Attach io to app.locals for use in controllers
  app.locals.io = io;

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // 🔹 Student Form Submission
    socket.on("submitStudentForm", async (submissionData, callback) => {
      try {
        console.log("📩 Received submission data:", submissionData);

        const { studentId, studentName, meals, myDate } = submissionData;

        // Validate fields
        if (
          !studentId?.trim() ||
          !studentName?.trim() ||
          !myDate?.trim() ||
          typeof meals !== "object" ||
          meals === null
        ) {
          console.log("❌ Validation failed: Missing fields");
          return callback?.({
            success: false,
            message: "Missing required fields",
          });
        }

        const hasAtLeastOneMeal = Object.values(meals).some(Boolean);
        if (!hasAtLeastOneMeal) {
          console.log("❌ No meal selected");
          return callback?.({
            success: false,
            message: "Please select at least one meal",
          });
        }

        // Check if already submitted
        const existingSubmission = await StudentSubmission.findOne({
          studentId,
          date: myDate,
        });
        if (existingSubmission) {
          return callback?.({ success: false, message: "Already submitted" });
        }

        // Save new submission
        const newSubmission = new StudentSubmission({
          studentId,
          studentName,
          date: myDate,
          meals,
          submissionDate: new Date(),
        });

        await newSubmission.save();
        console.log("✅ Submission saved");

        callback?.({ success: true, message: "Submission successful" });
        io.emit("formSubmitted", { success: true });
      } catch (error) {
        console.error("🔥 Server error:", error);
        callback?.({ success: false, message: "Server error" });
      }
    });

    // 🔹 Meal Form Submission
    socket.on("submitMeal", async (formData, callback) => {
      try {
        const newMeal = await MealForm.create(formData);
        io.emit("mealUpdate", newMeal); // Notify all clients

        callback?.({ success: true, message: "Meal form submitted successfully!" });
      } catch (error) {
        console.error("❌ Error saving meal:", error);
        callback?.({ success: false, message: "Server error while submitting meal." });
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
}

module.exports = { setupSocket };
