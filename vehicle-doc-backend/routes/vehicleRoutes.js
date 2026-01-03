import express from "express";
import { getVehicles, createVehicle, updateVehicle, deleteVehicle, searchVehicle } from "../controllers/vehicleController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getVehicles);
router.post("/", protect, adminOnly, createVehicle);
router.put("/:id", protect, adminOnly, updateVehicle);
router.delete("/:id", protect, adminOnly, deleteVehicle);

// user search
router.get("/search", protect, searchVehicle);

export default router;
