import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sprLogo from "../assets/logo.png"; 
// 👆 put your generated logo image here

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <header
      className="h-20 px-10 flex items-center justify-between text-white"
      style={{
        background: "linear-gradient(90deg,#1E40AF,#2563EB,#6D28D9)",
      }}
    >
      {/* LOGO */}
  <div className="flex items-center cursor-pointer">
  <div className="h-20 flex items-center">
    <img
      src={sprLogo}
      alt="SPR Logo"
      style={{
        height: "110px",   // 👈 FORCE logo size
        width: "auto",
      }}
    />
  </div>
</div>


      {/* NAV + LOGOUT */}
      <div className="flex items-center gap-6 text-sm">
        <span className="cursor-pointer">Dashboard</span>
        <span className="opacity-80 cursor-pointer">Support</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg flex gap-2 items-center bg-red-500 hover:bg-red-600 transition"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </header>
  );
}
