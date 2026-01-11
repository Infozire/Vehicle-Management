// src/pages/UserDashboard.js
import React, { useState, useEffect } from "react";
import API from "../api";
import { LogOut, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Get user info from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) return navigate("/login");
    setUser(userData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]);

    if (!query) return;

    try {
      const token = localStorage.getItem("token");
      const res = await API.get(`/api/vehicles/search?number=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "No vehicle found");
    }
  };

  // ✅ Download single document as blob
  const handleDownload = async (filePath, filename) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API.defaults.baseURL}/${filePath}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch file");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename || "file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download file");
    }
  };

  // ✅ Download all documents sequentially
  const handleDownloadAll = async (docs) => {
    if (!docs || docs.length === 0) return;
    for (const doc of docs) {
      await handleDownload(doc.file_path, doc.original_name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium">{user?.name || "User"}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* SEARCH BAR */}
      <div className="flex justify-center mt-6">
        <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Enter vehicle number..."
            value={query}
            onChange={(e) => setQuery(e.target.value.toUpperCase())}
            className="flex-1 px-4 py-3 rounded shadow border focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* SEARCH RESULTS */}
      <main className="flex-1 mt-6 px-6 max-w-5xl mx-auto">
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {results.length === 0 && !error && (
          <p className="text-gray-500">No results yet. Try entering a valid vehicle number.</p>
        )}

        {results.map((vehicle) => (
          <div
            key={vehicle._id}
            className="bg-white rounded-3xl shadow-lg p-6 mb-8 border border-gray-200"
          >
            {/* VEHICLE HEADER */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{vehicle.vehicle_number}</h2>
                <p className="text-sm text-gray-500">{vehicle.make} / {vehicle.model}</p>
                <p className="text-sm text-gray-500">
                  Customer: {vehicle.customer?.name || vehicle.customer_name} (
                  {vehicle.customer?.email || vehicle.customer_email})
                </p>
              </div>
              {vehicle.documents && vehicle.documents.length > 0 && (
                <button
                  onClick={() => handleDownloadAll(vehicle.documents)}
                  className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  <Download size={16} /> Download All
                </button>
              )}
            </div>

            {/* DOCUMENTS LIST */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicle.documents && vehicle.documents.length > 0 ? (
                vehicle.documents.map((doc) => (
                  <div
                    key={doc._id}
                    className="flex justify-between items-center border rounded-lg p-3 bg-gray-50 hover:shadow-md transition"
                  >
                    <div>
                      <p className="text-sm font-semibold">{doc.document_type}</p>
                      <p className="text-xs text-gray-400 truncate max-w-xs">{doc.original_name}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownload(doc.file_path, doc.original_name)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
                      >
                        Download
                      </button>
                      <a
                        href={`${API.defaults.baseURL}/${doc.file_path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 border rounded text-sm hover:bg-gray-100 transition"
                      >
                        View
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm col-span-2">No documents uploaded.</p>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
