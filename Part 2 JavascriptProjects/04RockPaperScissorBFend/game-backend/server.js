const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to Local MongoDB
// const MONGO_URI = 'mongodb://localhost:27017/gameDB'; // Local MongoDB connection string

// Validate MONGO_URI
const mongoURI = 'mongodb://localhost:27017/gameDB'
//  process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MongoDB URI is not defined. Check your .env file.");
  process.exit(1); // Exit the application if MONGO_URI is not defined
}

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));



// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Update score endpoint
app.post('/update-score', async (req, res) => {
    const { username, score } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { username },
            { score },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Score updated', user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update score' });
    }
});

// Leaderboard endpoint
app.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await User.find({})
            .sort({ score: -1 })
            .limit(5)
            .select('username score');

        res.status(200).json({ leaderboard });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update score' });
    }
});

// Leaderboard endpoint
app.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await User.find({})
            .sort({ score: -1 })
            .limit(5)
            .select('username score');

        res.status(200).json({ leaderboard });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});