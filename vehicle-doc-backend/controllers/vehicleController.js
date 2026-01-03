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
      customer
    } = req.body;

    if (!vehicleNumber || !chassisNo) {
      return res.status(400).json({
        message: "Vehicle number and chassis number are required"
      });
    }

    const exists = await Vehicle.findOne({
      vehicle_number: vehicleNumber.toUpperCase()
    });

    if (exists) {
      return res.status(409).json({ message: "Vehicle already exists" });
    }

    const vehicle = await Vehicle.create({
      vehicle_number: vehicleNumber.toUpperCase(),
      rto,
      wheel,
      chassis_no: chassisNo,
      status: status || "Active",
      customer
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
      return res.status(400).json({ message: "Vehicle number is required" });
    }

    // Find the vehicle
    const vehicle = await Vehicle.findOne({
      vehicle_number: new RegExp(number, "i")
    }).populate("customer", "name email");

    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    // Fetch documents separately
    const documents = await Document.find({ vehicle: vehicle._id })
      .select("document_type original_name file_path createdAt")
      .sort({ createdAt: -1 });

    // Attach documents to vehicle object
    const vehicleWithDocs = {
      ...vehicle.toObject(),
      documents
    };

    res.json(vehicleWithDocs);

  } catch (err) {
    console.error("Search Vehicle Error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

