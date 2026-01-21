import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import sprLogo from "../assets/sprlogo1.png";
import { ChevronDown, LogOut, Menu, X } from "lucide-react";

export default function Header({ showLogout = false } = {}) {
  const navigate = useNavigate();

  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const servicesTimerRef = useRef(null);

  useEffect(() => {
    if (!showLogout) return;
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [showLogout]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  /* =====================
     COMMON STYLES
  ====================== */
  const navItemClass =
    "px-4 py-2 flex items-center gap-1 cursor-pointer font-extrabold text-white hover:text-yellow-300 transition-colors duration-200";

  const dropdownClass =
    "absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl w-56 py-2 z-50 origin-top transition-all duration-300 ease-in-out transform border border-gray-100";

  const dropdownItemClass =
    "px-4 py-2 cursor-pointer font-semibold text-[#0B1B3A] hover:bg-[#7A4421] hover:text-white transition-colors duration-200";

  const mobileItemClass =
    "px-2 py-2 font-bold text-white hover:bg-white/20 rounded cursor-pointer transition-colors duration-200";

  const goToService = (service) => {
    const routeMap = {
      "Dhanush Mines": "dhanush-mines",
      "Blue Metal": "spr-bluemetal",
      "SPR Transport": "spr-transport",
      "SPR Motors": "spr-motors",
      "SPR JK Tyres": "spr-jk-tyres",
      "SPR Paradise": "spr-paradise",
    };
    const route =
      routeMap[service] || service.toLowerCase().replace(/\s+/g, "-");

    navigate(`/services/${route}`);
    setMobileOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50">
      <div
        className="h-20 px-6 md:px-10 flex items-center justify-between relative"
        style={{
          background: "linear-gradient(135deg, #0B1B3A 0%, #1a2f5a 50%, #7A4421 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <img 
            src={sprLogo} 
            alt="SPR Logo" 
            className="h-20 md:h-32 transition-transform duration-300 group-hover:scale-105" 
          />
          <span className="text-2xl font-extrabold text-white drop-shadow-lg">
            GROUPS
          </span>
        </div>

        {/* MOBILE MENU ICON */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white hover:text-yellow-300 transition-colors"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-6">
          <div className={navItemClass} onClick={() => navigate("/")}>
            Home
          </div>

          {/* ABOUT */}
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
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div
                className={dropdownItemClass}
                onClick={() => navigate("/about/history")}
              >
                History
              </div>
              <div
                className={dropdownItemClass}
                onClick={() => navigate("/about/vision")}
              >
                Vision & Mission
              </div>
            </div>
          </div>

          {/* SERVICES */}
          <div
            className="relative"
            onMouseEnter={() => {
              clearTimeout(servicesTimerRef.current);
              setServicesOpen(true);
            }}
            onMouseLeave={() => {
              servicesTimerRef.current = setTimeout(
                () => setServicesOpen(false),
                200
              );
            }}
          >
            <div className={navItemClass}>
              Services <ChevronDown size={14} />
            </div>
            <div
              className={`${dropdownClass} ${
                servicesOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {[
                "Dhanush Mines",
                "Blue Metal",
                "SPR Transport",
                "SPR Motors",
                "SPR JK Tyres",
                "SPR Paradise",
              ].map((service) => (
                <div
                  key={service}
                  className={dropdownItemClass}
                  onClick={() => goToService(service)}
                >
                  {service}
                </div>
              ))}
            </div>
          </div>

          <div className={navItemClass} onClick={() => navigate("/contact")}>
            Contact
          </div>

          {showLogout && isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 font-extrabold text-white bg-red-600/80 hover:bg-red-600 rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              <LogOut size={16} /> Logout
            </button>
          )}
        </nav>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div 
          className="md:hidden absolute top-20 left-0 w-full z-40 shadow-xl"
          style={{
            background: "linear-gradient(135deg, #0B1B3A 0%, #1a2f5a 50%, #7A4421 100%)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
          }}
        >
          <div className="flex flex-col px-6 py-4 gap-2">
            <div className={mobileItemClass} onClick={() => navigate("/")}>
              Home
            </div>

            {/* ABOUT */}
            <div>
              <div
                className={`${mobileItemClass} flex justify-between`}
                onClick={() => setAboutOpen(!aboutOpen)}
              >
                About <ChevronDown size={16} />
              </div>
              {aboutOpen && (
                <div className="ml-4">
                  <div
                    className={mobileItemClass}
                    onClick={() => navigate("/about/history")}
                  >
                    History
                  </div>
                  <div
                    className={mobileItemClass}
                    onClick={() => navigate("/about/vision")}
                  >
                    Vision & Mission
                  </div>
                </div>
              )}
            </div>

            {/* SERVICES */}
            <div>
              <div
                className={`${mobileItemClass} flex justify-between`}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services <ChevronDown size={16} />
              </div>
              {servicesOpen && (
                <div className="ml-4">
                  {[
                    "Dhanush Mines",
                    "Blue Metal",
                    "SPR Transport",
                    "SPR Motors",
                    "SPR JK Tyres",
                    "SPR Paradise",
                  ].map((service) => (
                    <div
                      key={service}
                      className={mobileItemClass}
                      onClick={() => goToService(service)}
                    >
                      {service}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={mobileItemClass} onClick={() => navigate("/contact")}>
              Contact
            </div>

            {showLogout && isLoggedIn && (
              <div
                className="flex items-center gap-2 px-2 py-2 font-bold text-white bg-red-600/80 hover:bg-red-600 rounded cursor-pointer transition-colors"
                onClick={handleLogout}
              >
                <LogOut size={16} /> Logout
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
