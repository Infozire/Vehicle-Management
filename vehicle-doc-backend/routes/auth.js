import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";   // note the .js extension is required in ESM

const router = express.Router();

// REGISTER
// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, company, email, password, role } = req.body; // include role from request

    if (!name || !company || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Allow only valid roles, default to "user"
    const validRoles = ["user", "admin"];
    const userRole = validRoles.includes(role) ? role : "user";

    const newUser = new User({
      name,
      company,
      email,
      password: hashedPassword,
      role: userRole, // store role properly
      isApproved: false
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: userRole },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        company: newUser.company,
        role: newUser.role, // include role in response
      },
      token,
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      user: { name: user.name, email: user.email, company: user.company, role: user.role, isApproved: user.isApproved },
      token,
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;