import React from "react";

const VehicleList = ({ vehicles, onBook }) => {
  if (!vehicles.length) return null;

  return (
    <ul className="mt-6 space-y-4">
      {vehicles.map((v) => (
        <li
          key={v._id}
          className="p-4 border rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{v.name}</p>
            <p>Capacity: {v.capacityKg}kg | Tyres: {v.tyres}</p>
            <p>Estimated Duration: {v.estimatedRideDurationHours}h</p>
            {v.booked && <p className="text-red-500 font-medium">Booked</p>}
          </div>
          {!v.booked && (
            <button
              onClick={() => onBook(v._id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Book Now
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default VehicleList;
