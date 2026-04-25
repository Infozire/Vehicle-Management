import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";   // note the .js extension is required in ESM
import nodemailer from "nodemailer";

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

// helper function
const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Login OTP",
      text: `Your OTP is: ${otp}`,
    });

    console.log("SMTP RESULT:", result);
    return result;
  } catch (err) {
    console.log("EMAIL ERROR:", err);
    throw err;
  }
};


// LOGIN → STEP 1 (Send OTP)
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

    // ✅ Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ Save OTP in DB
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min
    await user.save();

    // ✅ Send Email
    // await sendOTPEmail(user.email, otp);
console.log("OTP:", otp);
await sendOTPEmail(user.email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});
// VERIFY OTP → STEP 2 (FINAL LOGIN)
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const user = await User.findOne({ email });

    if (
      !user ||
      user.otp !== otp ||
      user.otpExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // ✅ Clear OTP
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // ✅ Generate token AFTER OTP verify
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        role: user.role,
        isApproved: user.isApproved,
        profileImage:
          typeof user.profileImage === "string"
            ? user.profileImage
            : user.profileImage?.path || "",
      },
      token,
    });

  } catch (err) {
    console.error("OTP Verify Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;