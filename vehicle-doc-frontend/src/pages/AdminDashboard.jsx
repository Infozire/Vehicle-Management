import { useEffect, useState,useMemo  } from "react";
import API from "../api";
import {
  File,
  Clock,
  ShieldCheck,
  BadgeCheck,
  Upload,
  Eye,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faUser } from "@fortawesome/free-solid-svg-icons";

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

 useEffect(() => {
  // Vehicles
  API.get("/api/vehicles").then((r) => {
    const data = Array.isArray(r.data) ? r.data : r.data?.data || [];
    setVehicles(data);
  });

  // Users
  API.get("/api/users").then((r) => {
    const data = Array.isArray(r.data) ? r.data : r.data?.data || [];
    setUsers(data);
  });

  // Documents
  API.get("/api/documents").then((r) => {
    const data = Array.isArray(r.data) ? r.data : r.data?.data || [];
    setDocuments(data);
  });
}, []);


const getDocPath = (type) => {
  if (!selectedVehicle || documents.length === 0) return null;

  const doc = documents.find((d) => {
    const vehicleId = typeof d.vehicle === "object" ? d.vehicle._id : d.vehicle;
    return d.document_type === type && vehicleId === selectedVehicle;
  });

  return doc?.file_path ? doc.file_path.replace(/\\/g, "/") : null;
};



const vehiclePhotoPath = useMemo(() => getDocPath("Vehicle Photo"), [selectedVehicle, documents]);
useEffect(() => {
  console.log("Selected Vehicle:", selectedVehicle);
  console.log("Documents:", documents);
  console.log("RC Book Path:", getDocPath("RC Book"));
}, [selectedVehicle, documents]); // only run when these change


  // Handle file upload
const handleFileUpload = async (file, docType) => {
  if (!selectedVehicle) {
    alert("Please select a vehicle first");
    return;
  }

  const formData = new FormData();
  formData.append("document", file);
  formData.append("vehicle", selectedVehicle);
  formData.append("document_type", docType);

  try {
    setUploading(true);
    const res = await API.post("/api/documents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Upload successful!");

    // **Add uploaded document to state immediately**
    setDocuments((prevDocs) => [...prevDocs, res.data]);
  } catch (err) {
    console.error(err);
    alert("Upload failed");
  } finally {
    setUploading(false);
  }
};


  // Handle preview
const handlePreview = (filePath) => {
  const url = filePath.startsWith("http")
    ? filePath
    : `${API.defaults.baseURL}/${filePath.replace(/^\/+/, "")}`;
  setPreviewFile(url);
};


  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#F4F6FF] via-[#EEF1FA] to-[#E9EDFF]">
      <Sidebar />

      <main className="flex-1 px-10 py-8">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-10">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vehicle by number..."
            className="w-[440px] px-6 py-3 rounded-2xl bg-white shadow-lg outline-none"
          />

          <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-full shadow-lg">
            <img
              src="https://i.pravatar.cc/40"
              className="rounded-full w-9 h-9"
            />
            <span className="text-sm font-medium">Admin</span>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          <Stat
            color="from-[#4E7BFF] to-[#2B57E5]"
            icon={<FontAwesomeIcon icon={faCar} />}
            label="Total Vehicles"
            value={vehicles.length}
          />
          <Stat
            color="from-[#37B2A4] to-[#1F8E82]"
            icon={<FontAwesomeIcon icon={faUser} />}
            label="Total Users"
            value={users.length}
          />
          <Stat
            color="from-[#FF9F43] to-[#F77F1E]"
            icon={<File />}
            label="Total Documents"
            value={documents.length}
          />
          <Stat
            color="from-[#FF6A6A] to-[#E23C3C]"
            icon={<Clock />}
            label="Expiring Soon"
            value="15"
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-[1.1fr_1fr] gap-10">
          {/* VEHICLE DETAILS */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-lg font-semibold mb-6">Vehicle Details</h2>
            <div className="mb-6">
              <p className="text-gray-500 mb-1">Select Vehicle</p>
              <select
                value={selectedVehicle}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedVehicle(id);
                  const found = vehicles.find((v) => v._id === id);
                  setVehicleDetails(found || null);
                }}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border"
              >
                <option value="">-- Select Vehicle --</option>
                {vehicles.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.vehicle_number}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4 text-sm">
              <Input label="Vehicle Number" value={vehicleDetails?.vehicle_number || ""} />
              <Input label="RTO" value={vehicleDetails?.rto || ""} />
              <Input label="Wheel" value={vehicleDetails?.wheel || ""} />
              <Input label="Chassis No" value={vehicleDetails?.chassis_no || ""} />
              <Input label="Status" value={vehicleDetails?.status || ""} />
            </div>
          </div>

          {/* DOCUMENT UPLOAD */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Documents Upload</h2>

            <div className="grid grid-cols-2 gap-8 min-w-[520px]">
              {[
                { title: "RC Book", color: "linear-gradient(135deg, #5B7CFA 0%, #4E6EEA 100%)", icon: <File />, expiry: "01/01/2024" },
                { title: "Insurance", color: "linear-gradient(135deg, #6FB1A6 0%, #4FA295 100%)", icon: <ShieldCheck />, expiry: "15/11/2024" },
                { title: "Fitness", color: "linear-gradient(135deg, #9C6ADE 0%, #8B58CF 100%)", icon: <BadgeCheck />, expiry: "01/08/2024" },
                { title: "Pollution", color: "linear-gradient(135deg, #F2A35C 0%, #E88A3C 100%)", icon: <File />, expiry: "10/12/2024" },
                { title: "Tamil Nadu Permit", color: "linear-gradient(135deg, #E07A97 0%, #D56585 100%)", icon: <File />, expiry: "05/09/2024" },
                { title: "Pondicherry Permit", color: "linear-gradient(135deg, #5AA8BF 0%, #3F96AF 100%)", icon: <File />, expiry: "20/11/2024" },
                { title: "Vehicle Photo", color: "linear-gradient(135deg, #444 0%, #111 100%)", icon: <File />, expiry: "—" }
              ].map((doc) => (
                <DocCard
                  key={doc.title}
                  title={doc.title}
                  color={doc.color}
                  icon={doc.icon}
                  expiryDate={doc.expiry}
                  onUpload={(file) => handleFileUpload(file, doc.title)}
                  onPreview={() => {
                    const path = getDocPath(doc.title);
                    if (!path) return alert("No file uploaded");
                    handlePreview(path);
                  }}
                  uploading={uploading}
                />
              ))}

              {/* VEHICLE PHOTO DISPLAY */}
              <div className="bg-white rounded-2xl shadow-lg p-4 col-span-2">
                <p className="text-sm font-semibold mb-2">Vehicle Photo</p>
                {vehiclePhotoPath ? (
                  /\.(jpg|jpeg|png|webp)$/i.test(vehiclePhotoPath) ? (
                    <img
                      src={`${API.defaults.baseURL}/${vehiclePhotoPath}`}
                      className="rounded-xl object-cover h-[160px] w-full"
                      alt="Vehicle"
                    />
                  ) : (
                    <iframe
                      src={`${API.defaults.baseURL}/${vehiclePhotoPath}`}
                      className="w-full h-[160px] rounded-xl"
                      title="PDF Document"
                    />
                  )
                ) : (
                  <div className="h-[160px] w-full flex items-center justify-center bg-gray-100 rounded-xl text-gray-400 text-sm">
                    No vehicle photo uploaded
                  </div>
                )}
              </div>
            </div>

            {/* PREVIEW MODAL */}
            {previewFile && (
              <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div className="bg-white rounded-xl p-4 max-w-3xl w-full max-h-[80vh] relative overflow-auto">
                  <button
                    className="absolute top-2 right-2 text-gray-600 text-xl font-bold"
                    onClick={() => setPreviewFile(null)}
                  >
                    ✕
                  </button>

                  {/\.(jpg|jpeg|png|webp)$/i.test(previewFile) && (
                    <img src={previewFile} alt="Preview" className="w-full object-contain rounded-xl" />
                  )}

                  {previewFile.endsWith(".pdf") && (
                    <iframe src={previewFile} title="PDF Preview" className="w-full h-[80vh] rounded-xl" />
                  )}

                  {!/\.(jpg|jpeg|png|webp|pdf)$/i.test(previewFile) && (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Preview not supported.{" "}
                      <a href={previewFile} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 underline">
                        Download file
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

const Stat = ({ color, icon, label, value }) => (
  <div className={`bg-gradient-to-r ${color} rounded-2xl px-6 py-5 flex items-center gap-4 shadow-lg`}>
    <div className="bg-white/20 p-3 rounded-xl text-white">{icon}</div>
    <div>
      <p className="text-sm text-white/90">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const Input = ({ label, value }) => (
  <div>
    <p className="text-gray-500 mb-1">{label}</p>
    <input value={value} disabled className="w-full px-4 py-3 rounded-xl bg-gray-50 border" />
  </div>
);

const DocCard = ({ title, color, icon, expiryDate, onUpload, onPreview, uploading }) => (
  <div className="bg-white rounded-2xl shadow-lg">
    <div className="flex items-center gap-3 px-4 py-3 h-[48px] text-white rounded-t-2xl" style={{ backgroundImage: color }}>
      <div className="bg-white/20 p-2 rounded-lg">{icon}</div>
      <h3 className="font-semibold text-sm">{title}</h3>
    </div>

    <div className="p-4 space-y-3">
      <div className="flex w-full gap-3">
        <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-[#4E73DF] text-white rounded-lg text-sm font-medium cursor-pointer">
          <Upload size={16} /> {uploading ? "Uploading..." : "Upload"}
          <input
            type="file"
            hidden
            onChange={(e) => e.target.files[0] && onUpload(e.target.files[0])}
          />
        </label>

        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium"
          onClick={onPreview}
        >
          <Eye size={16} /> Preview
        </button>
      </div>

      <p className="text-sm text-gray-600">
        Expiry Date: <span className="font-medium">{expiryDate}</span>
      </p>
    </div>
  </div>
);
