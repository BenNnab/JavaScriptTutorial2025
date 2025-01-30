// Import required dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");

// Initialize dotenv for environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for handling cross-origin requests
app.use(bodyParser.json()); // Middleware to parse incoming JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set up routes
app.use("/api/tasks", taskRoutes); // Route for task-related APIs

// Root route (optional, just for testing)
app.get("/", (req, res) => {
  res.send("Welcome to the To-Do List API!");
});

// Error handling middleware (catch-all for unhandled routes)
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Global error handler (for all routes)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

// Export the app for use in `server.js`
module.exports = app;
