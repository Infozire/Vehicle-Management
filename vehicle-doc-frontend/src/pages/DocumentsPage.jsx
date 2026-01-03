import { useEffect, useMemo, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import { File, Eye, Search } from "lucide-react";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // If populated
  if (typeof vehicle === "object" && vehicle._id) {
    return vehicle._id.toString();
  }

  // If Mongo $oid format
  if (typeof vehicle === "object" && vehicle.$oid) {
    return vehicle.$oid;
  }

  // If already string
  return vehicle.toString();
};

  /* 🚀 Vehicle ID → Vehicle Number map (KEY FIX) */
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
  const handlePreview = (filePath) => {
    if (!filePath) return;

    const url = filePath.startsWith("http")
      ? filePath
      : `${API.defaults.baseURL}/${filePath.replace(/\\/g, "/")}`;

    setPreviewFile(url);
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

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handlePreview(doc.file_path)}
                        className="inline-flex items-center gap-2 px-4 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        <Eye size={14} /> Preview
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
            <div className="bg-white rounded-xl p-4 max-w-4xl w-full max-h-[85vh] relative overflow-auto">
              <button
                onClick={() => setPreviewFile(null)}
                className="absolute top-2 right-3 text-xl font-bold text-gray-600"
              >
                ✕
              </button>

              {/\.(jpg|jpeg|png|webp)$/i.test(previewFile) ? (
                <img
                  src={previewFile}
                  className="w-full rounded-xl"
                  alt="Preview"
                />
              ) : (
                <iframe
                  src={previewFile}
                  className="w-full h-[80vh] rounded-xl"
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
