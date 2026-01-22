import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  // ---------------- LOAD USER SAFELY ----------------
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored && typeof stored === "object") {
        setUser(stored);
        setName(stored.name || "");
        setEmail(stored.email || "");

        if (stored.profileImage) {
          setPreview(`${API.defaults.baseURL}/${stored.profileImage}`);
        }
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  const handlePhotoChange = (file) => {
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  // ---------------- SAVE PROFILE (FULLY FIXED) ----------------
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (photo) formData.append("profileImage", photo);

      const res = await API.put("/api/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 🔥 YOUR API RETURNS res.data.user (THIS WAS THE BUG)
      const apiUser = res.data.user;

      // ✅ NORMALIZE IMAGE STRING
      const normalizedUser = {
        ...apiUser,
        profileImage:
          typeof apiUser.profileImage === "string"
            ? apiUser.profileImage
            : apiUser.profileImage?.path || "",
      };

      localStorage.setItem("user", JSON.stringify(normalizedUser));
      setUser(normalizedUser);

      setPreview(
        normalizedUser.profileImage
          ? `${API.defaults.baseURL}/${normalizedUser.profileImage}`
          : ""
      );

      // Sync dashboard instantly
      window.dispatchEvent(new Event("storage"));

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F4F6FF]">
      <Sidebar />

      <main className="flex-1 px-10 py-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl">
          <div className="flex items-center gap-6 mb-8">
            <img
              src={preview || "https://i.pravatar.cc/100"}
              onError={(e) =>
                (e.currentTarget.src = "https://i.pravatar.cc/100")
              }
              className="w-24 h-24 rounded-full object-cover border"
              alt="Profile"
            />

            <label className="px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700">
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handlePhotoChange(e.target.files[0])}
              />
            </label>
          </div>

          <div className="space-y-5">
            <Input label="Name" value={name} onChange={setName} />
            <Input label="Email" value={email} onChange={setEmail} />

            <button
              onClick={handleSave}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const Input = ({ label, value, onChange }) => (
  <div>
    <p className="text-gray-500 mb-1">{label}</p>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none"
    />
  </div>
);
