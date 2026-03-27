import express from "express";
import { sendWhatsAppImage } from "../controllers/whatsappController.js";

const router = express.Router();

router.post("/send-whatsapp", sendWhatsAppImage);

export default router;
