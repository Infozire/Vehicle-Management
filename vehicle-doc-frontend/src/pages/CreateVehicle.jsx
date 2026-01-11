import { useState } from "react";
import API from "../api";

export default function CreateVehicle({ onCreated }) {
  const [form, setForm] = useState({
    vehicleNumber: "",
    rto: "",
    wheel: "",
    chassisNo: "",
    status: "Active",

    rcExpiry: "",
    insuranceExpiry: "",
    fitnessExpiry: "",
    pollutionExpiry: "",

    // ✅ NEW
    tnPermitExpiry: "",
    pyPermitExpiry: "",
    roadTaxExpiry: ""
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
      status: "Active",

      rcExpiry: "",
      insuranceExpiry: "",
      fitnessExpiry: "",
      pollutionExpiry: "",

      tnPermitExpiry: "",
      pyPermitExpiry: "",
      roadTaxExpiry: ""
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
      <h2 className="text-lg font-semibold mb-6">Create Vehicle</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-6">
        {/* BASIC DETAILS */}
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

        {/* EXPIRY DETAILS */}
        <Input
          label="RC Expiry Date"
          type="date"
          name="rcExpiry"
          value={form.rcExpiry}
          onChange={handleChange}
        />

        <Input
          label="Insurance Expiry Date"
          type="date"
          name="insuranceExpiry"
          value={form.insuranceExpiry}
          onChange={handleChange}
        />

        <Input
          label="Fitness Expiry Date"
          type="date"
          name="fitnessExpiry"
          value={form.fitnessExpiry}
          onChange={handleChange}
        />

        <Input
          label="Pollution Expiry Date"
          type="date"
          name="pollutionExpiry"
          value={form.pollutionExpiry}
          onChange={handleChange}
        />

        {/* ✅ NEW PERMIT & TAX */}
        <Input
          label="Tamil Nadu Permit Expiry"
          type="date"
          name="tnPermitExpiry"
          value={form.tnPermitExpiry}
          onChange={handleChange}
        />

        <Input
          label="Pondicherry Permit Expiry"
          type="date"
          name="pyPermitExpiry"
          value={form.pyPermitExpiry}
          onChange={handleChange}
        />

        <Input
          label="Road Tax Expiry"
          type="date"
          name="roadTaxExpiry"
          value={form.roadTaxExpiry}
          onChange={handleChange}
        />

        {/* STATUS */}
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

        {/* SUBMIT */}
        <div className="col-span-4 flex justify-end">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">
            Create Vehicle
          </button>
        </div>
      </form>
    </div>
  );
}

/* ===========================
   INPUT COMPONENT
=========================== */
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
