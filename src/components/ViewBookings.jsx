import { useState, useEffect } from "react";
import { getAllBookings } from "../api";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await getAllBookings();
        setBookings(res.data);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">All Bookings</h2>
      {loading && <p>Loading bookings...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && bookings.length === 0 && <p>No bookings found.</p>}
      <ul className="space-y-3">
        {bookings.map((b) => (
          <li key={b._id} className="border p-3 rounded">
            <p><strong>Vehicle:</strong> {b.vehicleId?.name || "Unknown"}</p>
            <p><strong>From:</strong> {b.fromPincode} <strong>To:</strong> {b.toPincode}</p>
            <p><strong>Start:</strong> {new Date(b.startTime).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(b.endTime).toLocaleString()}</p>
            <p><strong>Customer ID:</strong> {b.customerId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewBookings;
