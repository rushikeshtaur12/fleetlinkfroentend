import React from "react";

const VehicleList = ({ vehicles, onBook }) => {
  if (!vehicles.length) return null;

  return (
    <div className="mt-6 space-y-4">
      {vehicles.map((v) => (
        <div
          key={v._id}
          className="p-4 border rounded-xl shadow-sm bg-gray-50 flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{v.name}</h3>
            <p className="text-sm text-gray-600">
              Capacity: {v.capacityKg} kg | Tyres: {v.tyres}
            </p>
            <p className="text-sm text-gray-600">
              Ride Duration: {v.estimatedRideDurationHours} hrs
            </p>
          </div>
          <button
            onClick={() => onBook(v._id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
