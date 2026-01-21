// src/pages/Register.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { Eye, EyeOff } from "lucide-react";
import bgImage from "../assets/bgImage.png";

const Register = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [company, setCompany] = useState("");
  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(registerUser({ name, email, password, company, role })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    });
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
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Register Form Card */}
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
            <h2 
              className="text-3xl font-bold mb-6 text-center"
              style={{ color: "#7A4421" }}
            >
              Register
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7A4421] focus:ring-2 focus:ring-[#7A4421]/30 transition"
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7A4421] focus:ring-2 focus:ring-[#7A4421]/30 transition"
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7A4421] focus:ring-2 focus:ring-[#7A4421]/30 transition bg-white"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              {/* Password field with eye icon */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-[#7A4421] focus:ring-2 focus:ring-[#7A4421]/30 transition"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Confirm password field with eye icon */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-[#7A4421] focus:ring-2 focus:ring-[#7A4421]/30 transition"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700 transition"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <input
                type="text"
                placeholder="Enter your company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#7A4421] focus:ring-2 focus:ring-[#7A4421]/30 transition"
              />

              <button
                type="submit"
                className="w-full text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                style={{ backgroundColor: "#7A4421" }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#6a3a1a"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#7A4421"}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="font-semibold hover:underline transition"
                style={{ color: "#7A4421" }}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
