// src/pages/UserDashboard.js
import React, { useState, useEffect } from "react";
import API from "../api";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VehicleSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Get user info from token
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")); // assume user info stored after login
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
      console.error("Search error:", err);
      setError(err?.response?.data?.message || "No vehicle found");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* HEADER */}
      <header className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 shadow">
        <h1 className="text-xl font-bold">User Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>{user?.name || "User"}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-1 bg-red-600 rounded hover:bg-red-700"
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
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded shadow border"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      {/* SEARCH RESULTS */}
      <main className="flex-1 mt-6 px-6 max-w-4xl mx-auto">
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {results.length === 0 && !error && (
          <p className="text-gray-500">No results yet. Try entering a valid vehicle number.</p>
        )}

        {results.map((vehicle) => (
          <div key={vehicle._id} className="bg-white rounded shadow p-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold">{vehicle.vehicle_number}</h2>
                <p className="text-sm text-gray-600">{vehicle.make} / {vehicle.model}</p>
                <p className="text-sm text-gray-600">
                  Customer: {vehicle.customer?.name || vehicle.customer_name} (
                  {vehicle.customer?.email || vehicle.customer_email})
                </p>
              </div>
            </div>

            {/* DOCUMENTS */}
            <div className="mt-4">
              <h3 className="font-medium mb-2">Documents</h3>
              {vehicle.documents && vehicle.documents.length > 0 ? (
                vehicle.documents.map((doc) => (
                  <div
                    key={doc._id}
                    className="flex justify-between items-center border rounded p-2 mb-2"
                  >
                    <div>
                      <p className="text-sm font-medium">{doc.document_type}</p>
                      <p className="text-xs text-gray-500">{doc.original_name}</p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`${API.defaults.baseURL}/${doc.file_path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 border rounded text-sm"
                      >
                        View
                      </a>
                      <a
                        href={`${API.defaults.baseURL}/${doc.file_path}`}
                        download
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No documents uploaded.</p>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
