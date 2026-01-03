import Document from "../models/Document.js";

// GET all documents
export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find().populate("vehicle", "vehicle_number");
    res.json(docs);
  } catch (err) {
    console.error("Get Documents Error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// UPLOAD a new document
export const uploadDocument = async (req, res) => {
  try {
    const { vehicle, document_type } = req.body;

    if (!vehicle || !document_type || !req.file) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const doc = new Document({
      vehicle,
      document_type,
      original_name: req.file.originalname,
      file_path: req.file.path,
      uploaded_by: req.user?._id, // optional if using auth
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error("Upload Document Error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// UPDATE document (with optional file replacement)
export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicle, document_type } = req.body;

    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    // update fields if provided
    if (vehicle) doc.vehicle = vehicle;
    if (document_type) doc.document_type = document_type;

    // update file if uploaded
    if (req.file) {
      doc.original_name = req.file.originalname;
      doc.file_path = req.file.path;
    }

    await doc.save();
    res.json(doc);
  } catch (err) {
    console.error("Update Document Error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// DELETE document
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    res.json({ message: "Document deleted" });
  } catch (err) {
    console.error("Delete Document Error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};
