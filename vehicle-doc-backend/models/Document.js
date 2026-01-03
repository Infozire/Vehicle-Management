import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    document_type: {
      type: String,
      enum: [
        "RC Book",
        "Insurance",
        "Fitness",               // ✅ ADDED
        "Road Tax",
        "Pollution",
        "Tamil Nadu Permit",
        "Pondicherry Permit",
         "Vehicle Photo", 
        "ID",
        "Other",
      ],
      required: true,
    },

    original_name: {
      type: String,
      required: true,
    },

    file_path: {
      type: String,
      required: true,
    },

    uploaded_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);
