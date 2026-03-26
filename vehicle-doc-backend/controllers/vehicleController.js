import Vehicle from "../models/Vehicle.js";
import Document from "../models/Document.js";

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate("customer", "name email")
      .populate("documents", "document_type original_name file_path");
    res.json(vehicles);
  } catch (err) {
    console.error("Get Vehicles Error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};
// GET documents by vehicle
export const getDocumentsByVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const docs = await Document.find({ vehicle: vehicleId })
      .sort({ createdAt: -1 });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createVehicle = async (req, res) => {
  try {
    const {
      vehicleNumber,
      rto,
      wheel,
      chassisNo,
      status,
      customer,
      rcExpiry,
      insuranceExpiry,
      fitnessExpiry,
      pollutionExpiry,
      tnPermitExpiry,
      pyPermitExpiry,
      roadTaxExpiry
    } = req.body;

    // ✅ Validate required fields
    if (!vehicleNumber || !chassisNo) {
      return res.status(400).json({
        message: "Vehicle number and chassis number are required"
      });
    }

    // ✅ Check duplicate
    const exists = await Vehicle.findOne({
      vehicle_number: vehicleNumber.toUpperCase()
    });

    if (exists) {
      return res.status(409).json({ message: "Vehicle already exists" });
    }

    // 🔥 FIX: Safe date converter
    const toDate = (val) => {
      if (!val) return null;
      const d = new Date(val);
      return isNaN(d.getTime()) ? null : d;
    };

    // 🔥 DEBUG (VERY IMPORTANT)
    console.log("📥 BACKEND RECEIVED:", {
      rcExpiry,
      insuranceExpiry,
      fitnessExpiry,
      pollutionExpiry,
      tnPermitExpiry,
      pyPermitExpiry,
      roadTaxExpiry
    });

    // ✅ Create vehicle with SAFE dates
    const vehicle = await Vehicle.create({
      vehicle_number: vehicleNumber.toUpperCase(),
      rto,
      wheel,
      chassis_no: chassisNo,
      status: status || "Active",
      customer,

      rc_expiry: toDate(rcExpiry),
      insurance_expiry: toDate(insuranceExpiry),
      fitness_expiry: toDate(fitnessExpiry),
      pollution_expiry: toDate(pollutionExpiry),

      tn_permit_expiry: toDate(tnPermitExpiry),
      py_permit_expiry: toDate(pyPermitExpiry),
      road_tax_expiry: toDate(roadTaxExpiry),
    });

    res.status(201).json({
      success: true,
      vehicle
    });

  } catch (err) {
    console.error("Create Vehicle Error:", err);
    res.status(500).json({ message: err.message });
  }
};



export const updateVehicle = async (req, res) => {
  try {
    const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("customer", "name email")
      .populate("documents", "document_type original_name file_path");
    res.json(updated);
  } catch (err) {
    console.error("Update Vehicle Error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    console.error("Delete Vehicle Error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

export const searchVehicle = async (req, res) => {
  try {
    const { number } = req.query;

    if (!number) {
      return res.status(400).json({
        message: "Vehicle number is required",
      });
    }

    const input = number.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

    console.log("🔍 Searching vehicle:", input);

    // 1️⃣ Find vehicle
    const vehicle = await Vehicle.findOne({
      vehicle_number: { $regex: input, $options: "i" },
    }).populate("customer", "name email");

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    // 2️⃣ Find documents linked to this vehicle
    const documents = await Document.find({
      vehicle: vehicle._id,
    }).sort({ createdAt: -1 });

    // 3️⃣ Send combined response
    res.status(200).json({
      ...vehicle.toObject(),
      documents, // ✅ THIS FIXES YOUR ISSUE
    });
  } catch (err) {
    console.error("Search Vehicle Error:", err);
    res.status(500).json({ message: err.message });
  }
};









