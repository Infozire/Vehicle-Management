import { useEffect, useState, useMemo } from "react";
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
  const [pendingUsers, setPendingUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // ✅ Current logged-in user

  const DOC_COLORS = {
    "RC Book": "from-[#4E7BFF] to-[#2B57E5]",
    Insurance: "from-[#37B2A4] to-[#1F8E82]",
    Fitness: "from-[#9C6ADE] to-[#7B4DD8]",
    Pollution: "from-[#FF9F43] to-[#F77F1E]",
    "Tamil Nadu Permit": "from-[#E07A97] to-[#D56585]",
    "Pondicherry Permit": "from-[#5AA8BF] to-[#3F96AF]",
    "Road Tax": "from-[#16A34A] to-[#15803D]",
    "Vehicle Photo": "from-[#555] to-[#222]",
  };

  // ---------------- LOAD INITIAL DATA ----------------
  useEffect(() => {
    // // Load current user from localStorage
    // const storedUser = JSON.parse(localStorage.getItem("user"));
    // if (storedUser) setCurrentUser(storedUser);

    // Fetch Vehicles
    API.get("/api/vehicles").then((r) => {
      const data = Array.isArray(r.data) ? r.data : r.data?.data || [];
      setVehicles(data);
    });

    // Fetch Users
    API.get("/api/users").then((r) => {
      const data = Array.isArray(r.data) ? r.data : r.data?.data || [];
      setUsers(data);
    });

    // Fetch Documents
    API.get("/api/documents").then((r) => {
      const data = Array.isArray(r.data) ? r.data : r.data?.data || [];
      setDocuments(data);
    });

    // Fetch Pending User Requests
    fetchPendingUsers();
  }, []);

  // ---------------- LISTEN FOR LOCALSTORAGE CHANGES ----------------

  useEffect(() => {
    const loadUser = async () => {
      // 1️⃣ Load instantly from localStorage
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored) {
        setCurrentUser(normalizeUser(stored));
      }

      // 2️⃣ Sync with backend (authoritative)
      try {
        const res = await API.get("/api/auth/me");
        const apiUser = normalizeUser(res.data.user);

        setCurrentUser(apiUser);
        localStorage.setItem("user", JSON.stringify(apiUser));
      } catch (err) {
        console.error("Auth sync failed", err);
      }
    };

    loadUser();
  }, []);



  // ---------------- VEHICLE SEARCH ----------------
  const handleVehicleSearch = async () => {
    const value = searchTerm.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().trim();
    if (!value) {
      alert("Enter vehicle number");
      clearVehicleUI();
      return;
    }

    try {
      const res = await API.get(`/api/vehicles/search?number=${value}`);
      const vehicle = res.data;
      setSelectedVehicle(vehicle._id);
      setVehicleDetails(vehicle);
    } catch (err) {
      alert(err?.response?.data?.message || "Vehicle not found");
      clearVehicleUI();
    }
  };

  const clearVehicleUI = () => {
    setSelectedVehicle("");
    setVehicleDetails(null);
  };

  // ---------------- DOCUMENT HELPERS ----------------
  const getDocPath = (type) => {
    if (!selectedVehicle || documents.length === 0) return null;

    const doc = documents.find((d) => {
      if (!d || !d.vehicle) return false;

      const vehicleId = typeof d.vehicle === "object" ? d.vehicle?._id : d.vehicle;
      return d.document_type === type && vehicleId === selectedVehicle;
    });

    return doc?.file_path ? doc.file_path.replace(/\\/g, "/") : null;
  };

  const vehiclePhotoPath = useMemo(() => getDocPath("Vehicle Photo"), [selectedVehicle, documents]);

  const getExpiryDate = (docType) => {
    if (!vehicleDetails) return "—";

    const map = {
      "RC Book": vehicleDetails.rc_expiry,
      Insurance: vehicleDetails.insurance_expiry,
      Fitness: vehicleDetails.fitness_expiry,
      Pollution: vehicleDetails.pollution_expiry,
      "Tamil Nadu Permit": vehicleDetails.tn_permit_expiry,
      "Pondicherry Permit": vehicleDetails.py_permit_expiry,
      "Road Tax": vehicleDetails.road_tax_expiry,
    };

    const date = map[docType];
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-GB");
  };

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
      setDocuments((prevDocs) => [...prevDocs, res.data]);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handlePreview = (filePath) => {
    const url = filePath.startsWith("http")
      ? filePath
      : `${API.defaults.baseURL}/${filePath.replace(/^\/+/, "")}`;
    setPreviewFile(url);
  };
  const normalizeUser = (user) => {
    if (!user) return null;

    return {
      ...user,
      profileImage:
        typeof user.profileImage === "string"
          ? user.profileImage
          : user.profileImage?.path || "",
    };
  };

  // ---------------- PENDING USERS ----------------
  const fetchPendingUsers = async () => {
    try {
      const res = await API.get("/api/admin/user-requests");
      setPendingUsers(res.data);
    } catch (err) {
      console.error("Error fetching pending users:", err);
    }
  };

  const approveUser = async (id) => {
    try {
      await API.put(`/api/admin/approve-user/${id}`);
      fetchPendingUsers();
    } catch (err) {
      console.error("Error approving user:", err);
    }
  };
  const safeProfileImage =
    typeof currentUser?.profileImage === "string"
      ? currentUser.profileImage
      : currentUser?.profileImage?.path || "";
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#F4F6FF] via-[#EEF1FA] to-[#E9EDFF]">
      <Sidebar pendingRequests={pendingUsers.length} />

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
              src={
                currentUser?.profileImage
                  ? `${API.defaults.baseURL}/${currentUser.profileImage.replace(/^\/+/, "")}`
                  : "https://i.pravatar.cc/40"
              }
              onError={(e) => {
                e.currentTarget.src = "https://i.pravatar.cc/40";
              }}
              className="rounded-full w-9 h-9 object-cover"
              alt="User Avatar"
            />




            <span className="text-sm font-medium">
              {currentUser?.name || "Admin"}
            </span>
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
            color="from-[#9C6ADE] to-[#7B4DD8]"
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

            {/* SEARCH TOOL */}
            <div className="mb-6">
              <p className="text-gray-500 mb-1">Search Vehicle Number</p>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter full vehicle number (TN16H72666)"
                  value={searchTerm}
                  maxLength={10}
                  onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && handleVehicleSearch()}
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border"
                />
                <button
                  onClick={handleVehicleSearch}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700"
                >
                  Search
                </button>
              </div>
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
                "RC Book",
                "Insurance",
                "Fitness",
                "Pollution",
                "Tamil Nadu Permit",
                "Pondicherry Permit",
                "Road Tax",
                "Vehicle Photo",
              ].map((title) => (
                <DocCard
                  key={title}
                  title={title}
                  color={`linear-gradient(135deg, ${DOC_COLORS[title]?.split(" ")[0]?.replace("from-[", "").replace("]", "")
                    } 0%, ${DOC_COLORS[title]?.split(" ")[1]?.replace("to-[", "").replace("]", "")
                    } 100%)`}
                  icon={
                    title === "Insurance" ? (
                      <ShieldCheck className="text-white" size={20} />
                    ) : title === "Fitness" ? (
                      <BadgeCheck className="text-white" size={20} />
                    ) : (
                      <File className="text-white" size={20} />
                    )
                  }
                  expiryDate={getExpiryDate(title)}
                  onUpload={(file) => handleFileUpload(file, title)}
                  onPreview={() => {
                    const path = getDocPath(title);
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
          </div>
        </div>

        {/* ---------------- PENDING USER REQUESTS ---------------- */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mt-10" id="user-requests">
          <h2 className="text-lg font-semibold mb-4">Pending User Requests</h2>

          {pendingUsers.length === 0 ? (
            <p>No pending requests</p>
          ) : (
            <table className="w-full table-auto border-collapse border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => approveUser(user._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ---------------- PREVIEW MODAL ---------------- */}
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
  <div className="rounded-2xl shadow-lg overflow-hidden">
    <div className="px-4 py-3 flex flex-col gap-2" style={{ background: color }}>
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-lg flex items-center justify-center">{icon}</div>
        <h3 className="font-semibold text-white text-sm">{title}</h3>
      </div>
      <div className="flex w-full gap-2 mt-2">
        <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg text-xs font-medium cursor-pointer transition shadow-sm">
          <Upload size={14} /> {uploading ? "Uploading..." : "Upload"}
          <input type="file" hidden onChange={(e) => e.target.files[0] && onUpload(e.target.files[0])} />
        </label>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/20 text-white rounded-lg text-xs font-medium hover:bg-white/30 transition"
          onClick={onPreview}
        >
          <Eye size={14} /> Preview
        </button>
      </div>
    </div>
    <div className="px-4 py-2 bg-white text-gray-800 text-xs font-medium">
      Expiry Date: <span className="font-semibold">{expiryDate}</span>
    </div>
  </div>
);
