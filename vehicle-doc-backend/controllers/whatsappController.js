import axios from "axios";
import fs from "fs";
import path from "path";

export const sendWhatsAppImage = async (req, res) => {
  try {
    const { number, fileName, caption } = req.body;

    // Read the image from uploads folder
    const filePath = path.join(__dirname, "uploads", fileName); // adjust path
    const buffer = fs.readFileSync(filePath);
    const base64Image = buffer.toString("base64");

    // Gupshup payload
    const payload = {
      type: "image",
      base64: base64Image, // send image as base64
      caption: caption,
    };

    const response = await axios.post(
      "https://api.gupshup.io/wa/api/v1/msg",
      new URLSearchParams({
        channel: "whatsapp",
        source: "15559128406",       // your Gupshup number
        destination: `91${number}`,  // driver number
        message: JSON.stringify(payload),
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey: "sk_ef69e139f8114fe6a6bba62a318bc459", // your API key
        },
      }
    );

    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: "WhatsApp send failed" });
  }
};
