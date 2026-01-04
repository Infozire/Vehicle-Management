import { useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import API from "../api";

export function BulkUpload({ onDone }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let rows = [];

    setUploading(true);

    try {
      if (file.name.endsWith(".csv")) {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: async (res) => {
            rows = res.data;
            await uploadRows(rows);
          },
        });
      } else {
        const data = await file.arrayBuffer();
        const wb = XLSX.read(data);
        const sheet = wb.Sheets[wb.SheetNames[0]];
        rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        await uploadRows(rows);
      }
    } catch (err) {
      console.error("File read error:", err);
      alert("Invalid file format");
      setUploading(false);
    }

    // reset file input so same file can be uploaded again
    e.target.value = "";
  };

  const clean = (v) => (typeof v === "string" ? v.trim() : v);

  const uploadRows = async (rows) => {
    let success = 0;
    let failed = 0;

    for (const row of rows) {
      const vehicleNumber =
        row.vehicleNumber ||
        row["Vehicle Number"] ||
        row["vehicle_number"];

      const rto = row.rto || row.RTO;
      const wheel = row.wheel || row.Wheel;
      const chassisNo =
        row.chassisNo ||
        row["Chassis No"] ||
        row["ChassisNo"];

      const status = row.status || row.Status || "Active";

      if (!vehicleNumber) {
        failed++;
        continue;
      }

      try {
        await API.post("/api/vehicles", {
          vehicleNumber: clean(vehicleNumber),
          rto: clean(rto),
          wheel: clean(wheel),
          chassisNo: clean(chassisNo),
          status: clean(status),
        });

        success++;
      } catch (err) {
        console.error(
          "Upload failed:",
          vehicleNumber,
          err.response?.data || err.message
        );
        failed++;
      }
    }

    setUploading(false);

    alert(
      `Upload completed ✅\nSuccess: ${success}\nFailed: ${failed}`
    );

    onDone?.();
  };

  return (
    <label
      className={`px-4 py-2 rounded-lg cursor-pointer text-sm text-white ${
        uploading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
      }`}
    >
      {uploading ? "Uploading..." : "Bulk Upload"}
      <input
        type="file"
        hidden
        accept=".csv,.xlsx"
        disabled={uploading}
        onChange={handleFile}
      />
    </label>
  );
}
