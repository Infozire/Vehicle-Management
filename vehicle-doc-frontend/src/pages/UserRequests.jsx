import { useEffect, useState } from "react";
import API from "../api";

export default function UserRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await API.get("/api/admin/user-requests");
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveUser = async (id) => {
    await API.put(`/api/admin/approve-user/${id}`);
    fetchRequests(); // refresh list
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">User Requests</h1>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => approveUser(user._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
