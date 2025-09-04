import React, { useState } from "react";
import { getAvailableVehicles, bookVehicle } from "../api";
import VehicleList from "../components/VehicleList";

const SearchBook = () => {
  const [form, setForm] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: "",
  });
  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getAvailableVehicles(form);
      setVehicles(data);
      setMessage(data.length ? "" : "No vehicles available for given criteria.");
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  const handleBook = async (vehicleId) => {
    try {
      await bookVehicle({ ...form, vehicleId, customerId: "CUSTOMER123" });
      setMessage("✅ Booking successful!");
      // Refresh list after booking to hide booked vehicles
      handleSearch({ preventDefault: () => {} });
    } catch (err) {
      setMessage(
        "❌ Booking failed: " + (err.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Search & Book Vehicle</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="number"
          name="capacityRequired"
          placeholder="Capacity Required"
          value={form.capacityRequired}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="fromPincode"
          placeholder="From Pincode"
          value={form.fromPincode}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="toPincode"
          placeholder="To Pincode"
          value={form.toPincode}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="datetime-local"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Search Availability
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}

      <VehicleList vehicles={vehicles} onBook={handleBook} />
    </div>
  );
};

export default SearchBook;
