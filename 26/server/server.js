// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const taskRoutes = require("./routes/taskRoutes");

const PORT = process.env.PORT || 5000;
require("dotenv").config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);


const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('MongoDB URI is not defined. Check your .env file.');
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));



app.use(cors());
app.use(express.json());  // Middleware to parse JSON bodies

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
