import React, { useState, useEffect } from "react";
import API from "../api";
import {
  FileText,
  FileCheck,
  Cloud,
  ShieldCheck,
  BookOpen,
  Eye,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bgImage.png";
import Header from "../components/Header";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
  }, [navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]); // ✅ clear old data

    try {
      const token = localStorage.getItem("token");
      const res = await API.get(`/api/vehicles/search?number=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResults(Array.isArray(res.data) ? res.data : [res.data]);
    } catch {
      setError("No vehicle found");
    }
  };

  // helper
  const getDoc = (docs, type) =>
    docs?.find((d) => d.document_type === type);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header />

      <div className="max-w-6xl mx-auto mt-16 px-6">
        <div
          className="rounded-3xl p-10"
          style={{ border: "1px solid rgba(255,255,255,0.35)" }}
        >
          <form onSubmit={handleSearch} className="flex gap-4 mb-10">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter vehicle number (eg: TN16H7204)"
              className="flex-1 px-6 py-3 rounded-xl bg-white/90 outline-none"
            />
            <button
              className="px-8 py-3 rounded-xl text-white"
              style={{ backgroundColor: "#2563EB" }}
            >
              Search
            </button>
          </form>

          {error && <p className="text-red-500">{error}</p>}

          {results.map((v) => {
            const docs = v.documents || [];

            return (
              <div key={v._id}>
                <h2 className="text-2xl font-bold text-[#1E40AF]">
                  {v.vehicle_number}
                </h2>
                <p className="mb-6 text-gray-600">
                  Customer: {v.customer?.name || "0"}
                </p>

                {/* ✅ Render ONLY if document exists */}

                {getDoc(docs, "Pondicherry Permit") && (
                  <DocRow
                    icon={FileCheck}
                    title="Pondicherry Permit"
                    date={new Date(getDoc(docs, "Pondicherry Permit").expiry_date).toDateString()}
                    bg="linear-gradient(90deg, rgba(23,58,232,.65), rgba(120,150,255,.55), rgba(252,252,252,.45))"
                    fileUrl={`${API.defaults.baseURL}/${getDoc(docs, "Pondicherry Permit").file_path}`}
                  />
                )}

                {getDoc(docs, "Tamil Nadu Permit") && (
                  <DocRow
                    icon={FileText}
                    title="Tamil Nadu Permit"
                    date={new Date(getDoc(docs, "Tamil Nadu Permit").expiry_date).toDateString()}
                    bg="linear-gradient(90deg, rgba(188,197,225,.35), rgba(240,244,255,1))"
                    fileUrl={`${API.defaults.baseURL}/${getDoc(docs, "Tamil Nadu Permit").file_path}`}
                  />
                )}

                {getDoc(docs, "Pollution") && (
                  <DocRow
                    icon={Cloud}
                    title="Pollution"
                    date={new Date(getDoc(docs, "Pollution").expiry_date).toDateString()}
                    bg="linear-gradient(90deg, rgba(241,93,24,.49), rgba(255,255,255,.77))"
                    fileUrl={`${API.defaults.baseURL}/${getDoc(docs, "Pollution").file_path}`}
                  />
                )}

                {getDoc(docs, "Insurance") && (
                  <DocRow
                    icon={ShieldCheck}
                    title="Insurance"
                    date={new Date(getDoc(docs, "Insurance").expiry_date).toDateString()}
                    bg="linear-gradient(90deg, rgba(58,175,169,.48), rgba(255,255,255,1))"
                    fileUrl={`${API.defaults.baseURL}/${getDoc(docs, "Insurance").file_path}`}
                  />
                )}

                {getDoc(docs, "RC Book") && (
                  <DocRow
                    icon={BookOpen}
                    title="RC Book"
                    date={new Date(getDoc(docs, "RC Book").expiry_date).toDateString()}
                    bg="linear-gradient(90deg, rgba(205,63,244,.59), rgba(165,170,255,.55))"
                    fileUrl={`${API.defaults.baseURL}/${getDoc(docs, "RC Book").file_path}`}
                  />
                )}

                {docs.length === 0 && (
                  <p className="text-white/80 text-center py-6">
                    No documents uploaded for this vehicle
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* UI UNCHANGED */
function DocRow({ icon: Icon, title, date, bg, fileUrl }) {
  const handleView = () => {
    if (!fileUrl) return alert("File not available");
    window.open(fileUrl, "_blank");
  };

  const handleDownload = async () => {
    if (!fileUrl) return alert("File not available");

    const res = await fetch(fileUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.${fileUrl.split(".").pop()}`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="flex justify-between items-center p-5 mb-4 rounded-2xl"
      style={{
        background: bg,
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      }}
    >
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-white/80">
          <Icon size={22} className="text-gray-800" />
        </div>
        <div>
          <p className="font-semibold text-white">{title}</p>
          <p className="text-sm text-white/80">Expiry Date: {date}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleView} className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/80 text-gray-800 text-sm">
          <Eye size={16} /> View
        </button>
        <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-white text-sm bg-emerald-700">
          <Download size={16} /> Download
        </button>
      </div>
    </div>
  );
}
