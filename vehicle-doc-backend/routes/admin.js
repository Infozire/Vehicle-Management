const express = require("express");
const router = express.Router();
const User = require("../models/User"); // make sure path is correct

// GET pending users
router.get("/user-requests", async (req, res) => {
  try {
    // find users where isApproved is false AND role is 'user'
    const pendingUsers = await User.find({ isApproved: false,  isRejected: false,  role: "user" });
    res.json(pendingUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT approve a user

router.put("/approve-user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        isApproved: true,
        isRejected: false, // ✅ reset reject flag
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User approved successfully", user });
  } catch (err) {
    console.error("Error approving user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT reject a user
router.put("/reject-user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        isApproved: false,
        isRejected: true,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User rejected successfully", user });
  } catch (err) {
    console.error("Error rejecting user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
