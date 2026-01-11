const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
      role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user"  // ✅ default role
  },
  isApproved: {
  type: Boolean,
  default: false, // New users are unapproved by default
},

    savedPosts: [
      {
        title: String,
        content: String,
      },
    ],
  },
  { timestamps: true } // ✅ adds createdAt, updatedAt
);

module.exports = mongoose.model("User", userSchema);
