// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import VehicleSearch from "./components/VehicleSearch";
import CreateVehicle from "./pages/CreateVehicle";
import VehiclesPage from "./pages/VehiclesPage";
import UsersPage from "./pages/UsersPage";
import DocumentsPage from "./pages/DocumentsPage";

// Service Pages
import DhanushMines from "./pages/services/DhanushMines";
import SPRTransport from "./pages/services/SPRTransport";
import SPRMotors from "./pages/services/SPRMotors";
import SPRJKTyres from "./pages/services/SPRJKTyres";
import SPRParadise from "./pages/services/SPRParadise";
import ScrollToTop from "./components/ScrollToTop";

// About Pages
import AboutHistory from "./pages/about/History";
import AboutVision from "./pages/about/Vision";

// Contact Page
import Contact from "./pages/Contact";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return children;
};

export default function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
        <ScrollToTop />
      <Routes>

        {/* ROOT */}
        <Route
          path="/"
          element={
            token && user
              ? <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* USER */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* VEHICLE SEARCH */}
        <Route
          path="/vehicleSearch"
          element={
            <ProtectedRoute>
              <VehicleSearch />
            </ProtectedRoute>
          }
        />

        {/* PUBLIC PAGES */}
        <Route path="/createVehicles" element={<CreateVehicle />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/documents" element={<DocumentsPage />} />

        {/* SERVICES */}
        <Route path="/services/dhanush-mines" element={<DhanushMines />} />
        <Route path="/services/spr-transport" element={<SPRTransport />} />
        <Route path="/services/spr-motors" element={<SPRMotors />} />
        <Route path="/services/spr-jk-tyres" element={<SPRJKTyres />} />
        <Route path="/services/spr-paradise" element={<SPRParadise />} />

        {/* ABOUT */}
        <Route path="/about/history" element={<AboutHistory />} />
        <Route path="/about/vision" element={<AboutVision />} />

        {/* CONTACT */}
        <Route path="/contact" element={<Contact />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}
