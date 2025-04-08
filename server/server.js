require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Route imports
const authRoutes = require("./routes/authRoutes");
const voteRoutes = require("./routes/voteRoutes"); // Vote routes
const occasionRoutes = require("./routes/occasionRoutes");
const dailyRoutes = require("./routes/DailyRoutes"); // Ensure correct file name
const studentRoutes = require("./routes/studentRoutes");

// Create express app
const app = express();
const PORT = process.env.PORT || 5066;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/femine-food-fix";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

// Increase payload size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// CORS configuration
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

// Middleware to log all API requests
app.use((req, res, next) => {
  console.log(`📡 ${req.method} request to ${req.url}`);
  next();
});

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the Server!");
});

// Mount routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api", voteRoutes); // Voting routes
app.use("/api/occasional", occasionRoutes); // Occasion routes
app.use("/api/student", studentRoutes);  // Profile routes
app.use("/api/daily", dailyRoutes); // Daily routes
// Request OTP for Password Reset
// app.post("/api/request-otp", authController.requestOtp); // Assuming you're using express


// 404 Route - Handles invalid routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);

// Socket.io setup
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
});

// Attach socket.io instance to app
app.locals.io = io;

// Import models
const MealForm = require("./models/MealForm");
const StudentSubmission = require("./models/StudentSubmission");

// Socket.IO event listeners
io.on("connection", (socket) => {
  console.log("🔗 User connected:", socket.id);

  // Event for student meal form submission
  socket.on("submitStudentForm", async (submissionData, callback) => {
    try {
      console.log("Received student submission data:", submissionData);

      const { studentId, studentName, mealSelections, myDate } = submissionData;

      if (!studentId || !studentName || !mealSelections || mealSelections.length === 0 || !myDate) {
        console.error("⚠️ Missing required fields");
        return callback({ success: false, message: "Missing required fields" });
      }

      const existingSubmission = await StudentSubmission.findOne({ studentId, myDate });
      if (existingSubmission) {
        console.error("⚠️ Duplicate submission detected");
        return callback({ success: false, message: "You have already submitted your meal selection for today." });
      }

      const submission = new StudentSubmission({
        studentId,
        studentName,
        mealSelections,
        myDate,
        submissionDate: new Date(),
      });

      await submission.save();
      console.log("✅ Student submission saved:", submission);

      callback({ success: true, message: "Meal selection submitted successfully!", data: submission });

      io.emit("formSubmitted", { success: true, message: "Form submitted successfully!" });
    } catch (error) {
      console.error("❌ Error saving student submission:", error);
      callback({ success: false, message: "Server error.", error: error.message });
    }
  });

  // Event for daily meal form submission from the warden
  socket.on("submitMeal", async (data) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const existingForm = await MealForm.findOne({ myDate: today });

      if (existingForm) {
        socket.emit("submissionStatus", { success: false, message: "A meal form has already been submitted for today." });
        return;
      }

      const newForm = new MealForm({ ...data, myDate: today });
      await newForm.save();

      io.emit("newMealForm", newForm);
      socket.emit("submissionStatus", { success: true, message: "Form submitted successfully!" });
      console.log("✅ Meal form submitted:", data);
    } catch (error) {
      console.error("❌ Error saving form:", error);
      socket.emit("submissionStatus", { success: false, message: "Failed to submit form. Try again." });
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});
