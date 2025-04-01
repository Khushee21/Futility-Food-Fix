const { Server } = require("socket.io");
const StudentSubmission = require("./models/StudentSubmission");
// const Attendance = require("./models/Attendance");
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

    // Student Form Submission
    socket.on("submitStudentForm", async (submissionData, callback) => {
      try {
        const { studentId, studentName, mealSelections, myDate } = submissionData;
        if (!studentId || !studentName || !mealSelections || !myDate) {
          return callback({ success: false, message: "Missing required fields" });
        }

        const existingSubmission = await StudentSubmission.findOne({ studentId, myDate });
        if (existingSubmission) {
          return callback({
            success: false,
            message: "You have already submitted your meal selection for today.",
          });
        }

        const submission = new StudentSubmission({
          studentId,
          studentName,
          mealSelections,
          myDate,
          submissionDate: new Date(),
        });

        await submission.save();
        callback({
          success: true,
          message: "Meal selection submitted successfully!",
          data: submission,
        });

        io.emit("formSubmitted", { success: true, message: "Student form submitted!" });
      } catch (error) {
        callback({ success: false, message: "Server error.", error: error.message });
      }
    });

    // Attendance Submission
    // socket.on("submitAttendance", async (data, callback) => {
    //   try {
    //     const { studentId, studentName, status, date } = data;
    //     if (!studentId || !studentName || !status || !date) {
    //       return callback({ success: false, message: "Missing required fields" });
    //     }

    //     const existingAttendance = await Attendance.findOne({ id: studentId, date });
    //     if (existingAttendance) {
    //       return callback({
    //         success: false,
    //         message: "Attendance already marked for today.",
    //       });
    //     }

    //     const attendanceEntry = new Attendance({
    //       id: studentId,
    //       name: studentName,
    //       meals: [status, null, null, null, null],
    //       submitted: true,
    //     });

    //     await attendanceEntry.save();
    //     callback({ success: true, message: "Attendance submitted successfully!" });

    //     io.emit("updateAttendance", attendanceEntry);
    //   } catch (error) {
    //     callback({ success: false, message: "Server error." });
    //   }
    // });

  
  //   socket.on("submitMeal", async (formData) => {
  //     try {
  //         await MealForm.create(formData); 
  //         io.emit("mealUpdate", formData); 
  //     } catch (error) {
  //         console.error("Error saving meal:", error);
  //     }
  // });
  


  socket.on("submitMeal", async (formData) => {
      try {
          const newMeal = await MealForm.create(formData); // Save to database
          io.emit("mealUpdate", newMeal); // Broadcast meal update to all clients
      } catch (error) {
          console.error("Error saving meal:", error);
      }
  });
   
    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
}

module.exports = { setupSocket };