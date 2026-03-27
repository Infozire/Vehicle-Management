import axios from "axios";

export const sendWhatsAppImage = async (req, res) => {
  try {
    const { number, fileName, caption } = req.body;

    // ✅ Public image URL (VERY IMPORTANT)
    const imageUrl = `https://sprtransports.com/uploads/${fileName}`;

    // ✅ Gupshup payload (NO base64)
    const payload = {
      type: "image",
      originalUrl: imageUrl,
      previewUrl: imageUrl,
      caption: caption,
    };

    const response = await axios.post(
      "https://api.gupshup.io/wa/api/v1/msg",
      new URLSearchParams({
        channel: "whatsapp",
        source: "15559128406",        // your Gupshup number
        destination: `91${number}`,   // driver number
        message: JSON.stringify(payload),
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey: "sk_ef69e139f8114fe6a6bba62a318bc459",
        },
      }
    );

    res.json({ success: true, data: response.data });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: "WhatsApp send failed" });
  }
};
