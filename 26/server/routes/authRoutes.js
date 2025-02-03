const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET; // Read from environment variable

// User Signup
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("Signup request for email:", email); // Debugging

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            console.log("User already exists for email:", email); // Debugging
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword); // Debugging

        const newUser = new User({ username, email: email.toLowerCase(), password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error("Signup error:", err); // Debugging
        res.status(500).json({ error: "Server error" });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const trimmedEmail = email.trim().toLowerCase(); // Trim and lowercase email
        const trimmedPassword = password.trim(); // Trim password

        console.log("Login attempt for email:", trimmedEmail); // Debugging

        const user = await User.findOne({ email: trimmedEmail });
        if (!user) {
            console.log("User not found for email:", trimmedEmail); // Debugging
            return res.status(400).json({ error: "Invalid credentials" });
        }

        console.log("Stored hashed password:", user.password); // Debugging
        console.log("Entered password:", trimmedPassword); // Debugging

        const isMatch = await bcrypt.compare(trimmedPassword, user.password);
        if (!isMatch) {
            console.log("Password does not match for email:", trimmedEmail); // Debugging
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        console.error("Login error:", err); // Debugging
        res.status(500).json({ error: "Server error" });
    }
});

// User Logout (Handled on frontend by removing token)
router.post("/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
});

module.exports = router;