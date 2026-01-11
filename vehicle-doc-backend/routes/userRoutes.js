import express from "express";
import { getUsers, createUser, updateUser, deleteUser ,approveUser} from "../controllers/userController.js";
import { protect, adminOnly,adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getUsers);
router.post("/", protect, adminOnly, createUser);
router.put("/:id", protect, adminOnly, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);
router.put("/approve/:userId", adminMiddleware, approveUser);

export default router;
