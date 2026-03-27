import axios from "axios";

export const sendWhatsAppImage = async (req, res) => {
  try {
    const { number, imageUrl, caption } = req.body;

    const payload = {
      type: "image",
      image: {
        url: imageUrl,   // Publicly accessible URL
        caption: caption
      }
    };

    const response = await axios.post(
      "https://api.gupshup.io/wa/api/v1/msg",
      new URLSearchParams({
        channel: "whatsapp",
        source: "15559128406",      // Your Gupshup number
        destination: `91${number}`, // Recipient number
        message: JSON.stringify(payload)
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey: "sk_ef69e139f8114fe6a6bba62a318bc459"
        }
      }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "WhatsApp send failed" });
  }
};
