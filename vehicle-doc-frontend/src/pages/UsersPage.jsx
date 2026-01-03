import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import { Search, UserCheck, UserX } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/users")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];
        setUsers(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ❌ HIDE ADMIN USERS + 🔍 SEARCH */
  const filteredUsers = users
    .filter((u) => u.role?.toLowerCase() !== "admin")
    .filter((u) =>
      [u.name, u.email, u.phone]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#F4F6FF] via-[#EEF1FA] to-[#E9EDFF]">
      <Sidebar />

      <main className="flex-1 px-10 py-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Users
          </h1>

          <div className="relative w-[320px]">
            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />
            <input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white shadow outline-none"
            />
          </div>
        </div>

        {/* USERS TABLE */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading users...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No users found
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Phone</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Joined</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/40?u=${user._id}`}
                        className="w-9 h-9 rounded-full"
                        alt="avatar"
                      />
                      <span className="font-medium">
                        {user.name || "Unnamed"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {user.email || "—"}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {user.phone || "—"}
                    </td>

                    <td className="px-6 py-4">
                      {user.status === "active" ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                          <UserCheck size={14} /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">
                          <UserX size={14} /> Inactive
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
