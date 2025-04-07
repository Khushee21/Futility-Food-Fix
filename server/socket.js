const { Server } = require("socket.io");
const StudentSubmission = require("./models/StudentSubmission");
const MealForm = require("./models/MealForm");

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // 🔹 Student Form Submission
    socket.on("submitStudentForm", async (submissionData, callback) => {
      try {
        console.log("📩 Received submission data:", submissionData);
    
        const { studentId, studentName, meals, myDate } = submissionData;
    
        console.log("📌 studentId:", studentId);
        console.log("📌 studentName:", studentName);
        console.log("📌 meals:", meals);
        console.log("📌 myDate:", myDate);
    
        // Validate presence of fields
        if (
          !studentId?.trim() ||
          !studentName?.trim() ||
          // !Date ||
          !myDate?.trim() ||
          typeof meals !== 'object' ||
          meals === null
        ) {
          console.log("❌ Validation failed: Missing fields");
          return callback?.({ success: false, message: "Missing required fields" });
        }
    
        // Optional: You can validate if at least one meal is true
        const hasAtLeastOneMeal = Object.values(meals).some(Boolean);
        if (!hasAtLeastOneMeal) {
          console.log("❌ No meal selected");
          return callback?.({ success: false, message: "Please select at least one meal" });
        }
    
        // Check for existing submission
        const existingSubmission = await StudentSubmission.findOne({ studentId, date: myDate });
        if (existingSubmission) {
          return callback?.({ success: false, message: "Already submitted" });
        }
    
        // Save to DB
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

        if (typeof callback === "function") {
          callback({ success: true, message: "Meal form submitted successfully!" });
        }
      } catch (error) {
        console.error("❌ Error saving meal:", error);
        if (typeof callback === "function") {
          callback({ success: false, message: "Server error while submitting meal." });
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
}

module.exports = { setupSocket };
