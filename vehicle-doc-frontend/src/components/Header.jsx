import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sprLogo from "../assets/sprlogo1.png"; // your logo
import { ChevronDown, LogOut, Menu, X } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile menu toggle

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const navItemClass =
    "px-4 py-2 flex items-center gap-1 cursor-pointer hover:text-white transition font-extrabold";

  const dropdownClass =
    "absolute top-full left-0 mt-1 bg-white text-black rounded shadow-lg w-52 py-2 z-50 origin-top transition-all duration-300 ease-in-out transform";

  const goToService = (service) => {
    const route = service.toLowerCase().replace(/\s+/g, "-");
    navigate(`/services/${route}`);
    setMobileOpen(false); // close mobile menu
  };

  return (
    <header className="w-full sticky top-0 z-50">
      <div
        className="h-20 px-6 md:px-10 flex items-center justify-between text-white relative"
        style={{
          background: "#FFFFFF",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={() => navigate("/")}
        >
          <img src={sprLogo} alt="SPR Logo" className="h-16 w-auto md:h-24" />
          <span
            className="text-2xl font-extrabold text-white"
            style={{ color: "#7A4421" }}
          >
            GROUPS
          </span>
        </div>

        {/* Hamburger for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-black focus:outline-none"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 relative text-white font-medium">
          {/* Home */}
          <div
            className={navItemClass}
            style={{ color: "#000000ff" }}
            onClick={() => navigate("/")}
          >
            Home
          </div>

          {/* About */}
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <div className={navItemClass} style={{ color: "#000000ff" }}>
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
            <div className={navItemClass} style={{ color: "#000000ff" }}>
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
            className={navItemClass}
            onClick={() => navigate("/contact")}
            style={{ color: "#000000ff" }}
          >
            Contact
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{ color: "#000000ff" }}
            className="px-4 py-2 rounded-lg bg-[#9B5A2D] text-white hover:bg-[#7A4421] transition flex items-center gap-1"
          >
            <LogOut size={16} /> Logout
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg w-full absolute top-20 left-0 z-40">
          <div className="flex flex-col py-4 px-6 gap-2 text-black">
            <div
              className="px-2 py-2 font-bold hover:bg-gray-100 rounded"
              onClick={() => {
                navigate("/");
                setMobileOpen(false);
              }}
            >
              Home
            </div>

            {/* About Dropdown */}
            <div className="flex flex-col">
              <div
                className="px-2 py-2 font-bold flex justify-between items-center hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => setAboutOpen(!aboutOpen)}
              >
                About <ChevronDown size={16} />
              </div>
              {aboutOpen && (
                <div className="ml-4 flex flex-col mt-1">
                  <div
                    className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => {
                      navigate("/about/history");
                      setMobileOpen(false);
                    }}
                  >
                    History
                  </div>
                  <div
                    className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => {
                      navigate("/about/vision");
                      setMobileOpen(false);
                    }}
                  >
                    Vision & Mission
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="flex flex-col">
              <div
                className="px-2 py-2 font-bold flex justify-between items-center hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services <ChevronDown size={16} />
              </div>
              {servicesOpen && (
                <div className="ml-4 flex flex-col mt-1">
                  {[
                    "Dhanush Mines",
                    "SPR Transport",
                    "SPR Motors",
                    "SPR JK Tyres",
                    "SPR Paradise",
                  ].map((service) => (
                    <div
                      key={service}
                      className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => goToService(service)}
                    >
                      {service}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact */}
            <div
              className="px-2 py-2 font-bold hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => {
                navigate("/contact");
                setMobileOpen(false);
              }}
            >
              Contact
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-[#9B5A2D] text-white hover:bg-[#7A4421] transition flex items-center gap-1 mt-2"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
