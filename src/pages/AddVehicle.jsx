import React, { useState } from "react";
import { addVehicle } from "../api";

const AddVehicle = () => {
  const [form, setForm] = useState({ name: "", capacityKg: "", tyres: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVehicle(form);
      setMessage("✅ Vehicle added successfully!");
      setForm({ name: "", capacityKg: "", tyres: "" });
    } catch (err) {
      setMessage(
        "❌ Error: " + (err.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Add Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Vehicle Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="capacityKg"
          placeholder="Capacity (kg)"
          value={form.capacityKg}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="tyres"
          placeholder="Tyres"
          value={form.tyres}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Vehicle
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AddVehicle;
