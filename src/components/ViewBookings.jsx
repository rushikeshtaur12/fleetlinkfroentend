import { useState, useEffect } from "react";
import { getAllBookings, cancelBooking } from "../api";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all"); // all, booked, cancelled

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getAllBookings();
      setBookings(res.data);
      setMessage("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await cancelBooking(id);

      // Show backend message
      setMessage(res.data.message);

      // Update booking list locally
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, isCancelled: true } : b
        )
      );
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  // Filter bookings based on selected status
  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true;
    if (filter === "booked") return !b.isCancelled;
    if (filter === "cancelled") return b.isCancelled;
    return true;
  });

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">All Bookings</h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="all">All</option>
          <option value="booked">Booked</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {message && <p className="text-green-600 mb-3">{message}</p>}

      {loading ? (
        <p>Loading bookings...</p>
      ) : filteredBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-3">
          {filteredBookings.map((b) => (
            <li
              key={b._id}
              className={`border p-3 rounded ${b.isCancelled ? "bg-red-100" : ""}`}
            >
              <p><strong>Vehicle:</strong> {b.vehicleId?.name || "Unknown"}</p>
              <p><strong>From:</strong> {b.fromPincode} <strong>To:</strong> {b.toPincode}</p>
              <p><strong>Start:</strong> {new Date(b.startTime).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(b.endTime).toLocaleString()}</p>
              <p><strong>Customer ID:</strong> {b.customerId}</p>
              <p><strong>Status:</strong> {b.isCancelled ? "Cancelled" : "Booked"}</p>
              {!b.isCancelled && (
                <button
                  onClick={() => handleCancel(b._id)}
                  className="mt-2 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                >
                  Cancel Booking
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewBookings;
