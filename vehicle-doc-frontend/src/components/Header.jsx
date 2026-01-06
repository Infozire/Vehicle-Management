import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sprLogo from "../assets/logo.png"; // your logo
import { ChevronDown, LogOut } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const navItemClass =
    "px-4 py-2 flex items-center gap-1 cursor-pointer hover:text-white transition";

  const dropdownClass =
    "absolute top-full left-0 mt-1 bg-white text-black rounded shadow-lg w-52 py-2 z-50 origin-top transition-all duration-300 ease-in-out transform";

  const goToService = (service) => {
    const route = service.toLowerCase().replace(/\s+/g, "-");
    navigate(`/services/${route}`);
  };

  return (
    <header className="w-full shadow-md">
      <div
        className="h-20 px-10 flex items-center justify-between text-white relative"
        style={{ background: "linear-gradient(90deg,#1E40AF,#2563EB,#6D28D9)" }}
      >
        {/* Logo */}
     {/* Logo */}
<div className="flex items-center cursor-pointer gap-2" onClick={() => navigate("/")}>
  <img src={sprLogo} alt="SPR Logo" className="h-24 w-auto" />
  <span className="text-2xl font-extrabold text-white">GROUPS</span>
</div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 relative text-white font-medium">
          
          {/* Home */}
          <div className={navItemClass} onClick={() => navigate("/")}>
            Home
          </div>

          {/* About */}
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <div className={navItemClass}>
              About <ChevronDown size={14} />
            </div>
            <div
              className={`${dropdownClass} ${
                aboutOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/about/history")}
              >
                History
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/about/vision")}
              >
                Vision & Mission
              </div>
            </div>
          </div>

          {/* Services */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <div className={navItemClass}>
              Services <ChevronDown size={14} />
            </div>
            <div
              className={`${dropdownClass} ${
                servicesOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {[
                "Dhanush Mines",
                "SPR Transport",
                "SPR Motors",
                "SPR JK Tyres",
                "SPR Paradise",
              ].map((service) => (
                <div
                  key={service}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => goToService(service)}
                >
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div
            className="relative"
            onMouseEnter={() => setContactOpen(true)}
            onMouseLeave={() => setContactOpen(false)}
          >
            <div className={navItemClass} onClick={() => navigate("/contact")}>
              Contact {contactOpen && <ChevronDown size={14} />}
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition flex items-center gap-1"
          >
            <LogOut size={16} /> Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
