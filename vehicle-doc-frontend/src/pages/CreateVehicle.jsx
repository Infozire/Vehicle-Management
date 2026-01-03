import { useState } from "react";
import API from "../api";

export default function CreateVehicle({ onCreated }) {
  const [form, setForm] = useState({
    vehicleNumber: "",
    rto: "",
    wheel: "",
    chassisNo: "",
    status: "Active"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/api/vehicles", form);

    alert("Vehicle created successfully");
    onCreated?.();

    setForm({
      vehicleNumber: "",
      rto: "",
      wheel: "",
      chassisNo: "",
      status: "Active"
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
      <h2 className="text-lg font-semibold mb-6">Create Vehicle</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-6">
        <Input
          label="Vehicle Number"
          name="vehicleNumber"
          value={form.vehicleNumber}
          onChange={handleChange}
        />

        <Input
          label="RTO"
          name="rto"
          value={form.rto}
          onChange={handleChange}
        />

        <Input
          label="Wheel"
          name="wheel"
          value={form.wheel}
          onChange={handleChange}
        />

        <Input
          label="Chassis No"
          name="chassisNo"
          value={form.chassisNo}
          onChange={handleChange}
        />

        <div>
          <label className="text-sm text-gray-500">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-3 rounded-xl border bg-gray-50"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="col-span-4 flex justify-end">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">
            Create Vehicle
          </button>
        </div>
      </form>
    </div>
  );
}

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <input
      {...props}
      required
      className="w-full mt-1 px-4 py-3 rounded-xl border bg-gray-50"
    />
  </div>
);
