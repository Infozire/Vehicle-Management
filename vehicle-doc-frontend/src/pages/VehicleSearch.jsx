import React, { useState, useEffect } from "react";
import {
  FileCheck,
  BookOpen,
  Eye,
  Download,
  LogOut,
  User,
  Search,
  ShieldCheck,
  Cloud,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import API from "../api";
import bgImage from "../assets/bgImage.png";
import useVehicleSearch from "../hooks/useVehicleSearch";
import Header from "../components/Header";

export default function VehicleSearch() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { query, setQuery, results, error, loading, searchVehicle } =
    useVehicleSearch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        fetch(`/api/users/${decoded.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => setUser(data))
          .catch((err) => console.error(err));
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchVehicle();
  };
const getIconByType = (type) => {
  switch (type) {
    case "RC Book":
      return BookOpen;
    case "Insurance":
      return ShieldCheck;
    case "Fitness":
      return FileText;
    case "Pondicherry Permit":
      return FileCheck;
    default:
      return FileText;
  }
};

const getExpiryByType = (vehicle, type) => {
  switch (type) {
    case "RC Book":
      return vehicle.rc_expiry;
    case "Insurance":
      return vehicle.insurance_expiry;
    case "Fitness":
      return vehicle.fitness_expiry;
    case "Road Tax":
      return vehicle.road_tax_expiry;
    case "Pondicherry Permit":
      return vehicle.py_permit_expiry;
    default:
      return null;
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showLogout />

      {/* Hero / User Bar */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B3A]/85 via-[#1a2f5a]/80 to-[#0B1B3A]/85" />

        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-16 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/70">
                Vehicle Search
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
                Find Vehicle Documents Instantly
              </h1>
              <p className="mt-3 text-white/80 max-w-2xl">
                Enter a vehicle number to fetch permits, RC book and other
                documents in one place.
              </p>
            </div>

            {user && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-xl border border-white/15">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-500/90 rounded-full p-3">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {user.name || "User"}
                    </p>
                    <p className="text-sm text-white/80">
                      {user.email || "—"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-3 flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Search Card */}
          <div className="mt-10 bg-white text-gray-900 rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex items-center gap-2">
              <ShieldCheck size={18} className="opacity-90" />
              <p className="text-sm font-semibold">
                Secure document lookup for authorized users
              </p>
            </div>

            <div className="p-6 md:p-8">
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex-1 relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter vehicle number (e.g., TN16H7204)"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <button
                  className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-lg"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {results.length === 0 && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
            <p className="text-lg text-gray-600">
              Search for a vehicle to see documents here.
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid gap-8">
            {results.map((v) => {
              const docs = v.documents || [];
              return (
                <div
                  key={v._id}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                        Vehicle Number
                      </p>
                      <h2 className="text-3xl font-bold text-[#0B1B3A]">
                        {v.vehicle_number}
                      </h2>
                      <p className="text-gray-600">
                        Customer:{" "}
                        <span className="font-semibold">
                          {v.customer?.name || "N/A"}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                      <Cloud size={16} />
                      Auto-synced documents
                    </div>
                  </div>

               <div className="p-6 space-y-4">
  {docs.length > 0 ? (
    docs.map((doc) => (
      <DocRow
        key={doc._id}
        icon={getIconByType(doc.document_type)}
        title={doc.document_type}
       date={
  getExpiryByType(v, doc.document_type)
    ? new Date(
        getExpiryByType(v, doc.document_type)
      ).toDateString()
    : "No expiry"
}

        fileUrl={`${API.defaults.baseURL}/${doc.file_path}`}
      />
    ))
  ) : (
    <p className="text-gray-500 text-sm">No documents available</p>
  )}
</div>

                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

/* UI COMPONENT */
function DocRow({ icon: Icon, title, date, fileUrl }) {
  const handleView = () => window.open(fileUrl, "_blank");

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch file");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = title;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download file");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 p-3 rounded-lg">
          <Icon size={22} className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-600">Expiry: {date}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleView}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
        >
          <Eye size={16} />
          View
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center gap-2"
        >
          <Download size={16} />
          Download
        </button>
      </div>
    </div>
  );
}
