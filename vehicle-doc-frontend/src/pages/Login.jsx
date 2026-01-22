// src/pages/Login.jsx
import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { Eye, EyeOff } from "lucide-react";
import bgImage from "../assets/bgImage.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/api/auth/login", { email, password });

      const { token, user } = res.data;

      // ✅ NORMALIZE USER (CRITICAL FIX)
      const normalizedUser = {
        ...user,
        profileImage:
          typeof user.profileImage === "string"
            ? user.profileImage
            : user.profileImage?.path || "",
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(normalizedUser));

      // Sync other tabs / dashboard instantly
      window.dispatchEvent(new Event("storage"));

      navigate(
        normalizedUser.role === "admin" ? "/admin" : "/dashboard",
        { replace: true }
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen flex items-center justify-center relative py-12 px-4"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Login Form */}
        <div className="relative z-10 w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20"
          >
            <h2
              className="text-3xl font-bold mb-6 text-center"
              style={{ color: "#7A4421" }}
            >
              Login
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7A4421] focus:ring-2 focus:ring-[#7A4421]/30 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-[#7A4421] focus:ring-2 focus:ring-[#7A4421]/30 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              style={{ backgroundColor: "#7A4421" }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#6a3a1a")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#7A4421")
              }
            >
              Login
            </button>

            <p className="mt-6 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold hover:underline transition"
                style={{ color: "#7A4421" }}
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
