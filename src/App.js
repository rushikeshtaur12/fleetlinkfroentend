import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import AddVehicle from "./pages/AddVehicle";
import SearchBook from "./pages/SearchBook";
import ViewBookings from "./components/ViewBookings";

function App() {
  return (
    <Router>
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">FleetLink</h1>
          <div className="space-x-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-gray-200 font-semibold border-b-2 border-white pb-1 transition"
                  : "hover:text-gray-200 font-medium transition"
              }
            >
              Add Vehicle
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-200 font-semibold border-b-2 border-white pb-1 transition"
                  : "hover:text-gray-200 font-medium transition"
              }
            >
              Search & Book
            </NavLink>
            <NavLink
              to="/view-bookings"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-200 font-semibold border-b-2 border-white pb-1 transition"
                  : "hover:text-gray-200 font-medium transition"
              }
            >
              View Bookings
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100 w-full">
        <Routes>
          <Route path="/" element={<AddVehicle />} />
          <Route path="/search" element={<SearchBook />} />
          <Route path="/view-bookings" element={<ViewBookings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
