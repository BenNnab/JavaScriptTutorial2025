const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const PORT = process.env.PORT || 5000;

// Debugging: Check if MONGO_URI is loaded
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

// Validate MONGO_URI
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MongoDB URI is not defined. Check your .env file.");
  process.exit(1); // Exit the application if MONGO_URI is not defined
}

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/tasks", taskRoutes); // Task routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});