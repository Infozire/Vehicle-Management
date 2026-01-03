import * as XLSX from "xlsx";
import Papa from "papaparse";
import API from "../api";

export function BulkUpload({ onDone }) {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let rows = [];

    if (file.name.endsWith(".csv")) {
      Papa.parse(file, {
        header: true,
        complete: async (res) => {
          rows = res.data;
          await uploadRows(rows);
        }
      });
    } else {
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data);
      const sheet = wb.Sheets[wb.SheetNames[0]];
      rows = XLSX.utils.sheet_to_json(sheet);
      await uploadRows(rows);
    }
  };

  const uploadRows = async (rows) => {
    let success = 0;
    let failed = 0;

    for (const row of rows) {
      if (!row.vehicleNumber) {
        failed++;
        continue;
      }

      try {
        await API.post("/api/vehicles", {
          vehicleNumber: row.vehicleNumber,
          make: row.make,
          model: row.model,
          status: row.status || "Active"
        });
        success++;
      } catch {
        failed++;
      }
    }

    alert(`Upload completed ✅\nSuccess: ${success}\nFailed: ${failed}`);
    onDone?.();
  };

  return (
    <label className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer text-sm">
      Bulk Upload
      <input
        type="file"
        hidden
        accept=".csv,.xlsx"
        onChange={handleFile}
      />
    </label>
  );
}
