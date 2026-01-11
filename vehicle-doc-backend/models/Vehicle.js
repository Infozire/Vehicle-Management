import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  vehicle_number: { type: String, required: true, unique: true },

  rto: { type: String },
  wheel: { type: String },
  chassis_no: { type: String },
  rc_expiry: { type: Date },
  insurance_expiry: { type: Date },
  fitness_expiry: { type: Date },
  pollution_expiry: { type: Date },
  tn_permit_expiry: {
  type: Date,
  required: false,
},

py_permit_expiry: {
  type: Date,
  required: false,
},
road_tax_expiry: {
  type: Date,
  required: false,
},

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
