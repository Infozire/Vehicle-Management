import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Car, FileText, Users, Bell, Settings, LogOut } from "lucide-react";
import API from "../api"; // make sure this points to your axios instance

const Sidebar = () => {
  const navigate = useNavigate();
  const [pendingRequests, setPendingRequests] = useState(0);

  // Fetch pending user requests
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const res = await API.get("/api/admin/user-requests"); // backend route returning users with isApproved: false
        setPendingRequests(res.data.length);
      } catch (err) {
        console.error("Failed to fetch pending requests:", err);
      }
    };

    fetchPendingRequests();
  }, []);

const handleLogout = () => {
  localStorage.clear();   // clear everything
  navigate("/login", { replace: true });
};


  const menuItems = [
    { icon: <Home size={18} />, label: "Dashboard", to: "/admin" },
    { icon: <Car size={18} />, label: "Vehicles", to: "/vehicles" },
    { icon: <FileText size={18} />, label: "Documents", to: "/documents" },
    { icon: <Users size={18} />, label: "Users", to: "/users" },
{ 
  icon: <Bell size={18} />, 
  label: "User Requests", 
  onClick: () => {
    document.getElementById('user-requests')?.scrollIntoView({ behavior: 'smooth' });
  },
  badge: pendingRequests
}
,    { icon: <Settings size={18} />, label: "Settings", to: "/settings" },
    { icon: <LogOut size={18} />, label: "Logout", onClick: handleLogout },
  ];

  return (
    <aside
      className="w-[220px] text-white px-4 py-8 shadow-2xl bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519681393784-d120267933ba')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E1B4B]/90 via-[#312E81]/90 to-[#3730A3]/90" />

      {/* CONTENT */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-[20px] font-semibold mb-12">
          <Car size={20} />
          Admin Panel
        </div>

        <nav className="space-y-2 text-[14px]">
          {menuItems.map((item, index) => (
            <SideItem key={index} {...item} />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

/* --------- SideItem --------- */
const SideItem = ({ icon, label, to, active, badge, onClick }) => {
  const baseClass =
    "flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-300 group";
  const activeClass =
    "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg";
  const hoverClass =
    "hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white";

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${baseClass} ${isActive || active ? activeClass : hoverClass}`
        }
      >
        <span className="text-white group-hover:text-violet-200 transition">{icon}</span>
        <span className="flex-1 truncate text-white group-hover:text-violet-200 transition">{label}</span>
        {badge && (
          <span className="bg-pink-500 text-[11px] px-2 py-0.5 rounded-full">{badge}</span>
        )}
      </NavLink>
    );
  }

  return (
    <div
      className={`${baseClass} ${active ? activeClass : hoverClass}`}
      onClick={onClick}
    >
      <span className="text-violet-200 group-hover:text-white transition">{icon}</span>
      <span className="flex-1 truncate group-hover:text-white transition">{label}</span>
      {badge && (
        <span className="bg-pink-500 text-[11px] px-2 py-0.5 rounded-full">{badge}</span>
      )}
    </div>
  );
};
