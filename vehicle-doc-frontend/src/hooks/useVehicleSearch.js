import { useState } from "react";
import API from "../api";

export default function useVehicleSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchVehicle = async () => {
    if (!query) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        `/api/vehicles/search?number=${query}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResults(Array.isArray(res.data) ? res.data : [res.data]);
    } catch {
      setError("No vehicle found");
    } finally {
      setLoading(false);
    }
  };

  return {
    query,
    setQuery,
    results,
    error,
    loading,
    searchVehicle,
  };
}
