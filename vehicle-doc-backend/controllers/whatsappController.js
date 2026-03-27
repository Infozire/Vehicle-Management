import axios from "axios";

export const sendWhatsAppImage = async (req, res) => {
  try {
    const { number, fileName, vehicleNumber, documentType } = req.body;

    // ✅ Public image URL
    const imageUrl = `https://sprtransports.com/uploads/${fileName}`;

    // ✅ TEMPLATE PAYLOAD (IMPORTANT CHANGE)
    const payload = {
      type: "template",
      template: {
        name: "vehicle_document_alert_v2", // ✅ exact template name
        language: { code: "en" },
        components: [
          {
            type: "header",
            parameters: [
              {
                type: "image",
                image: {
                  link: imageUrl, // ✅ image comes here
                },
              },
            ],
          },
          {
            type: "body",
            parameters: [
              { type: "text", text: vehicleNumber },
              { type: "text", text: documentType },
            ],
          },
        ],
      },
    };

    const response = await axios.post(
      "https://api.gupshup.io/wa/api/v1/msg",
      new URLSearchParams({
        channel: "whatsapp",
        source: "15559128406",
        destination: `91${number}`,
        message: JSON.stringify(payload),
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey: "sk_ef69e139f8114fe6a6bba62a318bc459",
        },
      }
    );

    console.log("GUPSHUP RESPONSE:", response.data);

    res.json({ success: true, data: response.data });

  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
    res.status(500).json({ message: "WhatsApp send failed" });
  }
};
