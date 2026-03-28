import axios from "axios";

export const sendWhatsAppImage = async (req, res) => {
  try {
    const { number, fileName, vehicleNumber, documentType } = req.body;

    // ✅ Public image URL
    const imageUrl = `https://sprtransports.com/uploads/${fileName}`;

    // ✅ TEMPLATE PAYLOAD (FIXED)
    const payload = {
      type: "template",
      template: {
        name: "vehicle_document_final_v2", // ✅ UPDATED TEMPLATE NAME
        language: {
          code: "en"
        },
        components: [
          {
            type: "header",
            parameters: [
              {
                type: "image",
                image: {
                  link: imageUrl // ✅ image URL
                }
              }
            ]
          },
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: vehicleNumber // {{1}}
              },
              {
                type: "text",
                text: documentType // {{2}}
              }
            ]
          }
        ]
      }
    };

    // ✅ SEND REQUEST
    const response = await axios.post(
      "https://api.gupshup.io/wa/api/v1/msg",
      new URLSearchParams({
        channel: "whatsapp",
        source: "15559128406", // your Gupshup number
        destination: `91${number}`, // user number
        message: JSON.stringify(payload)
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey: "sk_ef69e139f8114fe6a6bba62a318bc459" // 🔴 move to env in production
        }
      }
    );

    console.log("✅ GUPSHUP RESPONSE:", response.data);

    res.json({
      success: true,
      data: response.data
    });

  } catch (err) {
    console.error("❌ ERROR:", err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: "WhatsApp send failed",
      error: err.response?.data || err.message
    });
  }
};