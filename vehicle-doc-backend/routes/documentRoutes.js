import express from "express";
import {
  getDocuments,
  uploadDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/documentController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// GET all documents
router.get("/", protect, adminOnly, getDocuments);

// CREATE new document (with file upload)
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("document"), // ✅ FIXED
  uploadDocument
);

// UPDATE document (allow replacing file)
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("document"), // ✅ FIXED
  updateDocument
);

// DELETE document
router.delete("/:id", protect, adminOnly, deleteDocument);

export default router;
