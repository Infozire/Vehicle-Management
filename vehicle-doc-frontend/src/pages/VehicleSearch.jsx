import React from "react";
import {
  FileText,
  FileCheck,
  Cloud,
  ShieldCheck,
  BookOpen,
  Eye,
  Download
} from "lucide-react";
import API from "../api";
import bgImage from "../assets/bgImage.png";
import useVehicleSearch from "../hooks/useVehicleSearch";

export default function VehicleSearch() {
  const {
    query,
    setQuery,
    results,
    error,
    loading,
    searchVehicle
  } = useVehicleSearch();

  const handleSearch = (e) => {
    e.preventDefault();
    searchVehicle();
  };

  const getDoc = (docs, type) =>
    docs?.find((d) => d.document_type === type);

  return (
    <div
      className="min-h-screen bg-cover bg-center "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-6xl mx-auto mt-16 px-6">
        <div className="rounded-3xl p-10 border border-white/30">

          {/* 🔍 SEARCH FORM */}
          <form onSubmit={handleSearch} className="flex gap-4 mb-10">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter vehicle number (eg: TN16H7204)"
              className="flex-1 px-6 py-3 rounded-xl bg-white/90 outline-none"
            />
            <button className="px-8 py-3 rounded-xl bg-blue-600 text-white">
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {error && <p className="text-red-500">{error}</p>}

          {/* 📄 RESULTS */}
          {results.map((v) => {
            const docs = v.documents || [];

            return (
              <div key={v._id}>
                <h2 className="text-2xl font-bold text-blue-800">
                  {v.vehicle_number}
                </h2>
                <p className="mb-6 text-gray-600">
                  Customer: {v.customer?.name || "N/A"}
                </p>

                {getDoc(docs, "Pondicherry Permit") && (
                  <DocRow
                    icon={FileCheck}
                    title="Pondicherry Permit"
                    date={new Date(getDoc(docs, "Pondicherry Permit").expiry_date).toDateString()}
                    fileUrl={`${API.defaults.baseURL}/${getDoc(docs, "Pondicherry Permit").file_path}`}
                  />
                )}

                {getDoc(docs, "RC Book") && (
                  <DocRow
                    icon={BookOpen}
                    title="RC Book"
                    date={new Date(getDoc(docs, "RC Book").expiry_date).toDateString()}
                    fileUrl={`${API.defaults.baseURL}/${getDoc(docs, "RC Book").file_path}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* UI COMPONENT */
function DocRow({ icon: Icon, title, date, fileUrl }) {
  const handleView = () => window.open(fileUrl, "_blank");

  const handleDownload = async () => {
    const res = await fetch(fileUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = title;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-between items-center p-5 mb-4 rounded-2xl bg-white/20">
      <div className="flex items-center gap-4">
        <Icon size={22} />
        <div>
          <p className="font-semibold text-white">{title}</p>
          <p className="text-sm text-white/80">Expiry: {date}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={handleView} className="px-4 py-1 bg-white rounded">
          <Eye size={16} />
        </button>
        <button onClick={handleDownload} className="px-4 py-1 bg-green-600 text-white rounded">
          <Download size={16} />
        </button>
      </div>
    </div>
  );
}
