import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  vehicle_number: { type: String, required: true, unique: true },

  rto: { type: String },
  wheel: { type: String },
  chassis_no: { type: String },

  status: { type: String, default: "Active" },

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document"
  }]
}, { timestamps: true });

export default mongoose.model("Vehicle", vehicleSchema);
