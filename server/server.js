require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
// const helmet = require("helmet"); // For security headers
// const morgan = require("morgan"); // For request logging

// Import routes
const authRoutes = require("./routes/authRoutes");
const voteRoutes = require("./routes/voteRoutes"); // Vote routes
const occasionRoutes = require("./routes/occasionRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5066;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/femine-food-fix";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

// Middleware
// app.use(helmet()); // Security headers
// app.use(morgan("dev")); // Request logging
app.use(express.json({ limit: "50mb" })); // Parse JSON requests
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Parse URL-encoded requests
app.use(cors({ origin: CORS_ORIGIN, credentials: true })); // CORS configuration

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the Server!");
});

// Mount routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api", voteRoutes); // Voting routes
app.use("/api/occasional", occasionRoutes); // Occasion routes
app.use("/api/student", studentRoutes);  //profile

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

// Create HTTP server
const server = http.createServer(app);

// Socket.io setup
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
});

// Attach Socket.io to app locals
app.locals.io = io;

// Socket.io connection handler
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Example: Handle custom events
  socket.on("customEvent", (data) => {
    console.log("Received data:", data);
    io.emit("broadcastEvent", { message: "Hello from server!" });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
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