import axios from "axios";

export const sendWhatsAppImage = async (req, res) => {
  try {
    const { number, fileName, vehicleNumber, documentType } = req.body;

    const destination = number.startsWith("91")
      ? number
      : `91${number}`;

    const fileUrl = `https://sprtransports.com/uploads/${fileName}`;

    // =========================
    // ✅ TEMPLATE MESSAGE
    // =========================
    const templateResponse = await axios.post(
      "https://api.gupshup.io/sm/api/v1/msg",
      new URLSearchParams({
        channel: "whatsapp",
        source: process.env.GUPSHUP_SOURCE_NUMBER,
        destination,
        message: JSON.stringify({
          type: "text",
          text: `Document for ${vehicleNumber} - ${documentType}`
        })
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey: process.env.GUPSHUP_API_KEY
        }
      }
    );

    console.log("✅ SENT:", templateResponse.data);

    return res.json({
      success: true,
      data: templateResponse.data
    });

  } catch (err) {
    console.error("❌ ERROR:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error: err.response?.data || err.message
    });
  }
};
