require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { setupSocket } = require("./socket"); 
const nodemailer = require("nodemailer");

// const moment = require("moment");
// const Student = require('./models/Student'); 
const StudentSubmission = require("./models/StudentSubmission");
const Attendance = require("./models/Attendance");

// Route imports
const authRoutes = require("./routes/authRoutes");
const voteRoutes = require("./routes/voteRoutes");
const occasionRoutes = require("./routes/occasionRoutes");
const dailyRoutes = require("./routes/DailyRoutes");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes =require("./routes/attendanceRoutes");
const resRoutes = require("./routes/repRoutes");

// Environment variables
const PORT = process.env.PORT || 5066;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/femine-food-fix";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

// Create express app
const app = express();
const server = http.createServer(app); 

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies/auth headers
  })
);


// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] 📡 ${req.method} request to ${req.url}`);
  next();
});

// Ensure `uploads` directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });


// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api", voteRoutes);
app.use("/api/occasional", occasionRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/daily", dailyRoutes);
app.use("/api/attendance",attendanceRoutes);
app.use("/api/rep",resRoutes);
// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the Server!");
});

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

// Setup WebSocket (Socket.IO)
setupSocket(server);

app.get("/drop-index/:indexName", async (req, res) => {
  const indexName = req.params.indexName;

  try {
    await Attendance.collection.dropIndex(indexName);
    console.log(`✅ Index '${indexName}' dropped successfully.`);
    res.send(`✅ Index '${indexName}' dropped successfully.`);
  } catch (error) {
    console.error("❌ Error dropping index:", error);
    res.status(500).send("Error: " + error.message);
  }
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
  console.log("🔻 Shutting down server...");
  mongoose.connection.close(() => {
    console.log("✅ MongoDB connection closed.");
    process.exit(0);
  });
});
