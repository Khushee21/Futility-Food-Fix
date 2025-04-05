require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Server } = require("socket.io");  // Import Server from socket.io
const { sendMail } = require("./utils/mailer");


// Route imports
const authRoutes = require("./routes/authRoutes");
const voteRoutes = require("./routes/voteRoutes");
// const occasionRoutes = require("./routes/occasionRoutes");
// const studentRoutes = require("./routes/studentRoutes");
const mailRoutes = require('./routes/mailRoutes');

// Create express app
const app = express();
const server = http.createServer(app);  // Create HTTP server using express app
const io = new Server(server, {         // Initialize socket.io server
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Make sure the frontend URL is allowed
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 5066;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/femine-food-fix";

// Middleware to log all API requests
app.use((req, res, next) => {
  console.log(`📡 ${req.method} request to ${req.url}`);
  next();
});

// Increase payload size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
// Mount routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api", voteRoutes); // Voting routes
// app.use("/api/occasional", occasionRoutes); // Occasion routes
// app.use("/api/student", studentRoutes); // Student routes
app.use('/api', mailRoutes); // Mail routes

// 404 Route - Handles invalid routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("🔗 User connected:", socket.id);

  // Handling the sendReport event
// In your server.js (or wherever sendMail is called):
const Student = require('./models/Student');  // Import the Student model
const { sendMail } = require('./utils/mailer'); // Assuming sendMail is in utils/mailer.js
console.log("juhi");
socket.on("sendReport", async (data, callback) => {
  console.log("📬 Received request to send report");

  try {
    
    // Fetch all students from the database to get their parent's email addresses
    const students = await Student.find({}); // Fetch all students, adjust the query if needed to limit which students
    const parentEmails = students.map(student => student.parentEmail); // Extract parent emails
    console.log("Found students: ", students);

    console.log("Sending email to: ", parentEmails); // Log the emails to be sent to

    // Ensure that parentEmails is an array and send emails to all parents
    if (parentEmails.length > 0) {
      console.log("📧 Sending email to parents..."); // Debugging log
      await sendMail(parentEmails, data.subject, data.message); // Send mail to all parent emails
      callback({ success: true, message: "Emails sent successfully!" });
    } else {
      callback({ success: false, message: "No parent emails found." });
    }
  } catch (error) {
    console.error("Error in sendReport:", error);
    callback({ success: false, message: "Failed to send emails." });
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
    server.listen(PORT, () => {   // Use server instance to listen for connections
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);  // Exit if database connection fails
  });

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});
