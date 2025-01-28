require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const recordRoutes = require("./routes/recordRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  console.log("CORS Origin:", req.headers.origin);
  next();
});
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"], // Allow multiple origins
    credentials: true, // Allow credentials (if needed)
  })
);
app.options("*", cors()); // Handle preflight requests
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log("Response Headers:", res.getHeaders());
  });
  next();
});
app.use(helmet());
app.use(compression());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Database connection
connectDB();

// Routes
app.use("/api/records", recordRoutes);

// Test CORS route
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));