import { useEffect, useMemo, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import { File, Eye, Search } from "lucide-react";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null); // ✅ NEW
  const [mobileNumber, setMobileNumber] = useState(""); // ✅ NEW
  const [loading, setLoading] = useState(true);
const [editVehicle, setEditVehicle] = useState(null);
const [expiryData, setExpiryData] = useState({});

  /* 📦 Fetch documents & vehicles */
  useEffect(() => {
    Promise.all([
      API.get("/api/documents"),
      API.get("/api/vehicles"),
    ])
      .then(([docsRes, vehiclesRes]) => {
        const docs = Array.isArray(docsRes.data)
          ? docsRes.data
          : docsRes.data?.data || [];

        const vehs = Array.isArray(vehiclesRes.data)
          ? vehiclesRes.data
          : vehiclesRes.data?.data || [];

        setDocuments(docs);
        setVehicles(vehs);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getVehicleId = (vehicle) => {
    if (!vehicle) return null;

    if (typeof vehicle === "object" && vehicle._id) {
      return vehicle._id.toString();
    }

    if (typeof vehicle === "object" && vehicle.$oid) {
      return vehicle.$oid;
    }

    return vehicle.toString();
  };

  /* 🚀 Vehicle Map */
  const vehicleMap = useMemo(() => {
    const map = {};
    vehicles.forEach((v) => {
      map[v._id.toString()] = v.vehicle_number;
    });
    return map;
  }, [vehicles]);

  /* 🔍 Search */
  const filteredDocs = useMemo(() => {
    return documents.filter((d) =>
      `${d.document_type} ${vehicleMap[getVehicleId(d.vehicle)] || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [documents, vehicleMap, search]);

  /* 👁️ Preview */
  const handlePreview = (doc) => {
    const filePath = doc.file_path;

    const url = filePath.startsWith("http")
      ? filePath
      : `${API.defaults.baseURL}/${filePath.replace(/\\/g, "/")}`;

    setPreviewFile(url);
    setSelectedDoc(doc);     // ✅ STORE DOC
    setMobileNumber("");     // ✅ RESET INPUT
  };

  /* 📲 WhatsApp Share */
  const handleShare = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      alert("Enter valid mobile number");
      return;
    }

    const vehicleNumber =
      vehicleMap[getVehicleId(selectedDoc?.vehicle)] || "Unknown";

    const message = `
🚚 Vehicle: ${vehicleNumber}
📄 Document: ${selectedDoc?.document_type}

🔗 View Document:
${previewFile}
    `;

    const whatsappUrl = `https://wa.me/91${mobileNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };
const handleDirectShare = (doc) => {
  const number = prompt("Enter Driver WhatsApp Number");

  if (!number || number.length < 10) {
    alert("Enter valid mobile number");
    return;
  }

  const vehicleNumber =
    vehicleMap[getVehicleId(doc.vehicle)] || "Unknown";

  const filePath = doc.file_path;

  const url = filePath.startsWith("http")
    ? filePath
    : `${API.defaults.baseURL}/${filePath.replace(/\\/g, "/")}`;

  const message = `
🚚 Vehicle: ${vehicleNumber}
📄 Document: ${doc.document_type}

🔗 View Document:
${url}
  `;

  const whatsappUrl = `https://wa.me/91${number}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
};
const handleUpdateExpiry = async () => {
  try {
    await API.put(`/api/vehicles/${editVehicle._id}`, expiryData);

    alert("Updated successfully");

    setEditVehicle(null);

    // refresh vehicles
    const res = await API.get("/api/vehicles");
    setVehicles(res.data);

  } catch (err) {
    console.error(err);
    alert("Update failed");
  }
};

const handleEdit = (doc) => {
  const vehicleId = getVehicleId(doc.vehicle);
  const vehicle = vehicles.find(v => v._id === vehicleId);

  setEditVehicle(vehicle);

  setExpiryData({
    rc_expiry: vehicle?.rc_expiry?.substring(0, 10) || "",
    insurance_expiry: vehicle?.insurance_expiry?.substring(0, 10) || "",
    fitness_expiry: vehicle?.fitness_expiry?.substring(0, 10) || "",
    pollution_expiry: vehicle?.pollution_expiry?.substring(0, 10) || "",
    road_tax_expiry: vehicle?.road_tax_expiry?.substring(0, 10) || "",
  });
};

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#F4F6FF] via-[#EEF1FA] to-[#E9EDFF]">
      <Sidebar />

      <main className="flex-1 px-10 py-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Documents
          </h1>

          <div className="relative w-[320px]">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              placeholder="Search by vehicle or document..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white shadow outline-none"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading documents...
            </div>
          ) : filteredDocs.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No documents found
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="px-6 py-4 text-left">Vehicle No</th>
                  <th className="px-6 py-4 text-left">Document Type</th>
                  <th className="px-6 py-4 text-left">File</th>
                  <th className="px-6 py-4 text-left">Uploaded</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredDocs.map((doc) => (
                  <tr
                    key={doc._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {vehicleMap[getVehicleId(doc.vehicle)] || "—"}
                    </td>

                    <td className="px-6 py-4">
                      {doc.document_type}
                    </td>

                    <td className="px-6 py-4 text-sm flex items-center gap-2">
                      <File size={16} />
                      {doc.original_name || "File"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {doc.createdAt
                        ? new Date(doc.createdAt).toLocaleDateString()
                        : "—"}
                    </td>

                 <td className="px-6 py-4 flex gap-2">
  {/* PREVIEW */}
  <button
    onClick={() => handlePreview(doc)}
    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
  >
    <Eye size={14} /> Preview
  </button>
{editVehicle && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-[500px]">

      <h2 className="text-lg font-semibold mb-4">
        Edit Expiry Dates - {editVehicle.vehicle_number}
      </h2>

      {Object.keys(expiryData).map((key) => (
        <div key={key} className="mb-3">
          <label className="block text-sm mb-1">{key}</label>
          <input
            type="date"
            value={expiryData[key]}
            onChange={(e) =>
              setExpiryData({ ...expiryData, [key]: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      ))}

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setEditVehicle(null)}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdateExpiry}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}

  {/* SHARE */}
  <button
    onClick={() => handleDirectShare(doc)}
    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
  >
    📲 Share
  </button>
    <button
    onClick={() => handleEdit(doc)}
    className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg"
  >
    ✏️ Edit Expiry
  </button>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* PREVIEW MODAL */}
        {previewFile && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-5 max-w-4xl w-full max-h-[85vh] relative overflow-auto">

              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Preview & Share</h2>

                <button
                  onClick={() => setPreviewFile(null)}
                  className="text-xl font-bold text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* MOBILE INPUT + SHARE */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter Driver Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg outline-none"
                />

                <button
                  onClick={handleShare}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Share WhatsApp
                </button>
              </div>

              {/* PREVIEW */}
              {/\.(jpg|jpeg|png|webp)$/i.test(previewFile) ? (
                <img
                  src={previewFile}
                  className="w-full rounded-xl"
                  alt="Preview"
                />
              ) : (
                <iframe
                  src={previewFile}
                  className="w-full h-[70vh] rounded-xl"
                  title="Preview"
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}