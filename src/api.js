import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// -------------------- Vehicle APIs --------------------
export const addVehicle = (data) => API.post("/vehicles", data);
export const getAvailableVehicles = (params) =>
  API.get("/vehicles/available", { params });

// -------------------- Booking APIs --------------------
export const bookVehicle = (data) => API.post("/bookings", data);

// -------------------- view Booking APIs --------------------
export const getAllBookings = () => API.get("/manage-bookings");

// Cancel booking (mark as cancelled)
export const cancelBooking = (id) => API.patch(`/manage-bookings/${id}/cancel`);


export default API;
