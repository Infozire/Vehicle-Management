import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import CreateVehicle from "./CreateVehicle";
import { BulkUpload } from "../components/BulkUpload";
import { ExportVehicles } from "../components/exportVehicles";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/vehicles");
      setVehicles(res.data || []);
    } catch (err) {
      console.error("Fetch vehicles error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#F4F6FF] via-[#EEF1FA] to-[#E9EDFF] font-sans">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 px-10 py-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Vehicles</h1>

          <div className="flex gap-3">
            <BulkUpload onDone={fetchVehicles} />
            <ExportVehicles vehicles={vehicles} />
          </div>
        </div>

        {/* CREATE VEHICLE */}
        <CreateVehicle onCreated={fetchVehicles} />

        {/* VEHICLE TABLE */}
        <div className="mt-8 bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="px-6 py-4">Vehicle Number</th>
                <th className="px-6 py-4">Make</th>
                <th className="px-6 py-4">Model</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    Loading vehicles...
                  </td>
                </tr>
              ) : vehicles.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No vehicles found
                  </td>
                </tr>
              ) : (
                vehicles.map((v) => (
                  <tr key={v._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      {v.vehicle_number}
                    </td>
                    <td className="px-6 py-4">{v.make || "-"}</td>
                    <td className="px-6 py-4">{v.model || "-"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            v.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
