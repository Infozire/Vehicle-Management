import React, { useState, useEffect } from "react";
import API from "../api";
import {
  FileText,
  FileCheck,
  Cloud,
  ShieldCheck,
  BookOpen,LogOut, Eye, Download 
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bgImage.png";
import Header from "../components/Header";

export default function Dashboard() {
  const [query, setQuery] = useState("TN16H7204");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
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

  return (
    /* BACKGROUND IMAGE */
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* HEADER */}
  <Header/>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto mt-16 px-6">
        <div
          className="rounded-3xl p-10"
          style={{
            border: "1px solid rgba(255,255,255,0.35)",
          }}
        >
          {/* SEARCH */}
          <form onSubmit={handleSearch} className="flex gap-4 mb-10">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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

          {results.map((v) => (
            <div key={v._id}>
              <h2 className="text-2xl font-bold text-[#1E40AF]">
                {v.vehicle_number}
              </h2>
              <p className="mb-6 text-gray-600">
                Customer: {v.customer?.name || "0"}
              </p>
         <DocRow
  icon={FileCheck}
  title="Pondicherry Permit"
  date="Dec 30, 2025"
  bg="linear-gradient(90deg, rgba(23, 58, 232, 0.65), rgba(120,150,255,0.55), rgba(252,252,252,0.45))"
/>

<DocRow
  icon={FileText}
  title="Tamil Nadu Permit"
  date="Jan 01, 2024"
  bg="linear-gradient(90deg, rgba(188,197,225,0.35), rgba(240,244,255,1))"
/>

<DocRow
  icon={Cloud}
  title="Pollution"
  date="Aug 20, 2023"
  bg="linear-gradient(90deg, rgba(241,93,24,0.49), rgba(255,255,255,0.77))"
/>

<DocRow
  icon={ShieldCheck}
  title="Insurance"
  date="Sep 16, 2023"
  bg="linear-gradient(90deg, rgba(58,175,169,0.48), rgba(255,255,255,1))"
/>

<DocRow
  icon={BookOpen}
  title="RC Book"
  date="Dec 10, 2023"
  bg="linear-gradient(90deg, rgba(205,63,244,0.59), rgba(165,170,255,0.55))"
/>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* DOCUMENT ROW – GLASS + ORANGE SHADOW */
function DocRow({ icon: Icon, title, date, bg }) {
  return (
    <div
      className="flex justify-between items-center p-5 mb-4 rounded-2xl"
      style={{
        background: bg,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      }}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        {/* ICON */}
        <div className="p-2 rounded-lg bg-white/80">
          <Icon size={22} className="text-gray-800" />
        </div>

        {/* TEXT */}
        <div>
          <p className="font-semibold text-white">{title}</p>
          <p className="text-sm text-white/80">
            Expiry Date: {date}
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/80 text-gray-800 text-sm">
          <Eye size={16} /> View
        </button>
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-white text-sm bg-emerald-700">
          <Download size={16} /> Download
        </button>
      </div>
    </div>
  );
}

