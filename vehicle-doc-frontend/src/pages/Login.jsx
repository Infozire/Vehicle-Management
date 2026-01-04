// src/pages/Login.jsx
import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { Eye, EyeOff } from "lucide-react"; // <- import eye icons

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // <- new state
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/api/auth/login", { email, password });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate(user.role === "admin" ? "/admin" : "/dashboard", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
          <h2 className="text-2xl font-bold mb-4">Login</h2>

          {error && <p className="text-red-500 mb-3">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password input with eye icon */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border px-3 py-2 pr-10" // padding for icon
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-2.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>

          <p className="mt-4 text-sm text-center">
            Don’t have an account? <Link to="/register" className="text-blue-600">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
}
