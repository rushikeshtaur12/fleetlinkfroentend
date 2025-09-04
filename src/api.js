import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
});

// Vehicle APIs
export const addVehicle = (data) => API.post("/vehicles", data);
export const getAvailableVehicles = (params) => API.get("/vehicles/available", { params });

// Booking APIs
export const bookVehicle = (data) => API.post("/bookings", data);

export default API;
