// src/pages/VehicleLookup.jsx
import React, { useState } from 'react';
import API from '../api';

export default function VehicleLookup() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  const handleLookup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.get(`/public/vehicle/${encodeURIComponent(vehicleNumber)}`);
      setData(res.data);
      setErr('');
    } catch (err) {
      setErr(err.response?.data?.message || 'Lookup failed');
      setData(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Lookup Vehicle</h1>
      <form onSubmit={handleLookup} className="flex gap-2 mb-4">
        <input value={vehicleNumber} onChange={e=>setVehicleNumber(e.target.value)} placeholder="Vehicle number" className="border p-2 rounded" />
        <button className="bg-blue-600 text-white px-3 rounded">Search</button>
      </form>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      {data && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Vehicle: {data.vehicle.vehicle_number}</h2>
          <div>Owner: {data.vehicle.customer.name} ({data.vehicle.customer.email})</div>
          <div className="mt-3">
            <h3 className="font-medium">Documents</h3>
            <ul className="mt-2 space-y-2">
              {data.documents.map(d => (
                <li key={d._id} className="flex justify-between items-center border p-2 rounded">
                  <div>{d.document_type} - {d.original_name || ''}</div>
                  <div>
                    <a className="text-blue-600 underline mr-2" href={`http://localhost:5000/${d.file_path}`} target="_blank" rel="noreferrer">View</a>
                    <a className="text-gray-700" href={`http://localhost:5000/${d.file_path}`} download>Download</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
