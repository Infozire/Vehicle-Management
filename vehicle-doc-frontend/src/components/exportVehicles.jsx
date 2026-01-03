import * as XLSX from "xlsx";

export function ExportVehicles({ vehicles }) {
  const exportExcel = () => {
    const data = vehicles.map(v => ({
      vehicleNumber: v.vehicle_number,
      make: v.make,
      model: v.model,
      status: v.status
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vehicles");
    XLSX.writeFile(wb, "vehicles.xlsx");
  };

  return (
    <button
      onClick={exportExcel}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
    >
      Export
    </button>
  );
}
