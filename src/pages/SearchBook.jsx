import React, { useState } from "react";
import { getAvailableVehicles, bookVehicle } from "../api";
import VehicleList from "../components/VehicleList";

const SearchBook = () => {
  const [form, setForm] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: ""
  });
  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSearch = async (e) => {
  if (e && e.preventDefault) e.preventDefault();
  setMessage("");
  setLoadingSearch(true);
  try {
    const res = await getAvailableVehicles({
      capacityRequired: form.capacityRequired,
      fromPincode: form.fromPincode,
      toPincode: form.toPincode,
      startTime: form.startTime,
    });

    // Ensure vehicles is always an array
    const data = Array.isArray(res.data) ? res.data : [];
    setVehicles(data);

    if (data.length === 0) {
      setMessage("No vehicles available for given criteria.");
    }
  } catch (err) {
    setMessage("❌ Error: " + (err.response?.data?.message || "Something went wrong"));
    setVehicles([]); // reset vehicles on error
  } finally {
    setLoadingSearch(false);
  }
};


  const handleBook = async (vehicleId) => {
    setMessage("");
    try {
      // backend will generate customerId
      await bookVehicle({ vehicleId, fromPincode: form.fromPincode, toPincode: form.toPincode, startTime: form.startTime });
      setMessage("✅ Booking successful!");
      // remove booked vehicle from UI list
      setVehicles((prev) => prev.filter((v) => v._id !== vehicleId));
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ Booking failed: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Search & Book Vehicle</h2>
      <form onSubmit={handleSearch} className="space-y-3">
        <input name="capacityRequired" type="number" placeholder="Capacity Required" value={form.capacityRequired} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="fromPincode" placeholder="From Pincode" value={form.fromPincode} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="toPincode" placeholder="To Pincode" value={form.toPincode} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="startTime" type="datetime-local" value={form.startTime} onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">{loadingSearch ? "Searching..." : "Search Availability"}</button>
      </form>

      {message && <p className="mt-4">{message}</p>}

      <VehicleList vehicles={vehicles} onBook={handleBook} />
    </div>
  );
};

export default SearchBook;
