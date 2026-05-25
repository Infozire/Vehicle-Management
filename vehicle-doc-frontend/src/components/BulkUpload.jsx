import { useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import API from "../api";

export function BulkUpload({ onDone }) {
  const [uploading, setUploading] = useState(false);
const parseDate = (value) => {
  if (!value) return null;

  // ✅ Excel numeric date
  if (typeof value === "number") {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const date = new Date(excelEpoch.getTime() + value * 86400000);

    const dayStr = String(date.getDate()).padStart(2, "0");
    const monthStr = date.toLocaleString("en-US", { month: "short" });
    const yearStr = date.getFullYear();

    return `${dayStr}-${monthStr}-${yearStr}`;
  }

  // ✅ Normalize format
  const cleanValue = value.replace(/\./g, "-").replace(/\//g, "-");

  const parts = cleanValue.split("-");
  if (parts.length !== 3) return null;

  let [day, month, year] = parts.map(Number);

  // 🚨 Fix wrong order
  if (year < 100) return null;

  if (day > 31) {
    [year, month, day] = parts.map(Number);
  }

  const date = new Date(year, month - 1, day);

  const dayStr = String(date.getDate()).padStart(2, "0");
  const monthStr = date.toLocaleString("en-US", { month: "short" });
  const yearStr = date.getFullYear();

  return `${dayStr}-${monthStr}-${yearStr}`;
};



const getValue = (row, keys) => {
  for (let key of keys) {
    if (row[key] !== undefined && row[key] !== "") {
      return row[key];
    }
  }
  return null;
};

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
rows = XLSX.utils.sheet_to_json(sheet, {
  defval: "",
  raw: false
});        await uploadRows(rows);
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
        console.log("📄 RAW ROW:", row); // ✅ ADD HERE

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
// ✅ Parse first (IMPORTANT)
const rc = parseDate(getValue(row, ["RC Expiry Date", "RC Expiry"]));
const fitness = parseDate(getValue(row, ["Fitness Expiry Date", "Fitness Expiry"]));
const pollution = parseDate(getValue(row, ["Pollution Expiry Date", "Pollution Expiry"]));
const insurance = parseDate(getValue(row, ["Insurance Expiry Date", "Insurance"]));
const tnPermit = parseDate(getValue(row, ["Tamil Nadu Permit Expiry", "TN Permit"]));
const roadTax = parseDate(getValue(row, ["Road Tax Expiry", "Road Tax"]));
const pyPermit = parseDate(getValue(row, ["Pondicherry Permit Expiry", "PY Permit"]));

// ✅ Log parsed values
console.log("🧪 PARSED DATES:", {
  rc,
  fitness,
  pollution,
  insurance,
  tnPermit,
  roadTax,
  pyPermit
});

// ✅ Prepare payload
const payload = {
  vehicleNumber: clean(vehicleNumber),
  rto: clean(rto),
  wheel: clean(wheel),
  chassisNo: clean(chassisNo),
  status: clean(status),

  rcExpiry: rc,
  fitnessExpiry: fitness,
  pollutionExpiry: pollution,
  insuranceExpiry: insurance,
  tnPermitExpiry: tnPermit,
  roadTaxExpiry: roadTax,
  pyPermitExpiry: pyPermit
};

// ✅ Log final payload
console.log("🚀 FINAL PAYLOAD:", payload);

// ✅ API call
await API.post("/api/vehicles", payload);




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
