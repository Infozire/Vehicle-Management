import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  approveUser,
  updateMyProfile
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import {upload} from "../middlewares/uploadMiddleware.js"; // multer

const router = express.Router();

/* ================= USER SELF ================= */
router.put(
  "/profile",
  protect,
  upload.single("profileImage"),
  updateMyProfile
);

/* ================= ADMIN ================= */
router.get("/", protect, adminOnly, getUsers);
router.post("/", protect, adminOnly, createUser);
router.put("/:id", protect, adminOnly, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);
router.put("/approve/:userId", protect, adminOnly, approveUser);

export default router;
