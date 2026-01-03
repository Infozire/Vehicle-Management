import { useEffect, useState } from "react";
import API from "../api";

export default function VehicleList({ refresh }) {
  const [vehicles, setVehicles] = useState([]);

  const loadVehicles = async () => {
    const res = await API.get("/vehicles");
    setVehicles(res.data || []);
  };

  useEffect(() => {
    loadVehicles();
  }, [refresh]);

  return (
    <table className="w-full bg-white rounded-xl shadow mt-6">
      <thead className="bg-gray-100">
        <tr className="text-left text-sm text-gray-600">
          <th className="px-4 py-3">Vehicle No</th>
          <th className="px-4 py-3">RTO</th>
          <th className="px-4 py-3">Wheel</th>
          <th className="px-4 py-3">Chassis No</th>
          <th className="px-4 py-3">Status</th>
        </tr>
      </thead>

      <tbody>
        {vehicles.map(v => (
          <tr key={v._id} className="border-t text-sm">
            <td className="px-4 py-3 font-medium">
              {v.vehicle_number}
            </td>

            <td className="px-4 py-3">
              {v.rto || "-"}
            </td>

            <td className="px-4 py-3">
              {v.wheel || "-"}
            </td>

            <td className="px-4 py-3">
              {v.chassis_no || "-"}
            </td>

            <td className="px-4 py-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${v.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"}`}
              >
                {v.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
