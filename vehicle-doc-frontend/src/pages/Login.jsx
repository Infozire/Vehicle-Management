import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { Eye, EyeOff } from "lucide-react";
import bgImage from "../assets/bgImage.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // ✅ STEP CONTROL
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ STEP 1: SEND OTP
      if (step === 1) {
        await API.post("/api/auth/login", { email, password });
        setStep(2); // move to OTP screen
      }

      // ✅ STEP 2: VERIFY OTP
      else {
        const res = await API.post("/api/auth/verify-otp", {
          email,
          otp,
        });

        const { token, user } = res.data;

        // Normalize user
        const normalizedUser = {
          ...user,
          profileImage:
            typeof user.profileImage === "string"
              ? user.profileImage
              : user.profileImage?.path || "",
        };

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(normalizedUser));

        window.dispatchEvent(new Event("storage"));

        navigate(
          normalizedUser.role === "admin" ? "/admin" : "/dashboard",
          { replace: true }
        );
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
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
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20"
          >
            <h2
              className="text-3xl font-bold mb-6 text-center"
              style={{ color: "#7A4421" }}
            >
              {step === 1 ? "Login" : "Enter OTP"}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* ✅ STEP 1: EMAIL + PASSWORD */}
            {step === 1 && (
              <>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative mb-6">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </>
            )}

            {/* ✅ STEP 2: OTP INPUT */}
            {step === 2 && (
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-center tracking-widest"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  OTP sent to {email}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg font-semibold"
              style={{ backgroundColor: "#7A4421" }}
            >
              {step === 1 ? "Send OTP" : "Verify & Login"}
            </button>

            {/* Back button */}
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-3 w-full text-sm text-gray-600 underline"
              >
                Back to Login
              </button>
            )}

            <p className="mt-6 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
