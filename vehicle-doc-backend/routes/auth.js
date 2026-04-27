import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import axios from "axios";

const router = express.Router();

/* =========================
   REGISTER (UNCHANGED)
========================= */
router.post("/register", async (req, res) => {
  try {
    const { name, company, email, password, role, phone } = req.body;

    if (!name || !company || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      company,
      email,
      password: hashedPassword,
      role: ["user", "admin"].includes(role) ? role : "user",
      phone: phone || "",
      isApproved: false,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        company: newUser.company,
        role: newUser.role,
        phone: newUser.phone,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   EMAIL OTP (EXISTING)
========================= */
const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"SPR Transport" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Login OTP",
      html: `<h2>Your OTP is ${otp}</h2>`,
    });

    console.log("📧 Email sent");
  } catch (err) {
    console.log("EMAIL ERROR:", err.message);
  }
};

/* =========================
   🔥 NEW: WHATSAPP OTP (GUPSHUP)
========================= */
const sendWhatsAppOTP = async (mobile, otp) => {
  try {
    if (!mobile) throw new Error("Mobile missing");

    let formattedMobile = mobile.toString().replace("+", "");

    if (!formattedMobile.startsWith("91")) {
      formattedMobile = "91" + formattedMobile;
    }

    const response = await axios.post(
      "https://api.gupshup.io/sm/api/v1/msg",
      null,
      {
        params: {
          channel: "whatsapp",
          source: process.env.GUPSHUP_SOURCE_NUMBER,
          destination: formattedMobile,
          message: JSON.stringify({
            type: "text",
            text: `Your OTP is: ${otp}. Valid for 5 minutes.`,
          }),
        },
        headers: {
          apikey: process.env.GUPSHUP_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("📱 WhatsApp OTP sent:", response.data);
    return response.data;
  } catch (err) {
    console.log("WHATSAPP ERROR:", err.response?.data || err.message);
    throw err;
  }
};

/* =========================
   LOGIN (UPDATED - WHATSAPP + EMAIL FALLBACK)
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // =========================
    // ❌ COMMENT OTP FLOW TEMPORARILY
    // =========================

    /*
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    console.log("Generated OTP:", otp);

    setImmediate(async () => {
      try {
        await sendWhatsAppOTP(user.phone, otp);
      } catch (err) {
        console.log("⚠ WhatsApp failed → fallback email");
        await sendOTPEmail(user.email, otp);
      }
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent",
    });
    */

    // =========================
    // ✅ DIRECT LOGIN (NEW)
    // =========================

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      user,
      token,
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});


/* =========================
   VERIFY OTP (UNCHANGED)
========================= */
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
