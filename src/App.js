
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddVehicle from "./pages/AddVehicle";
import SearchBook from "./pages/SearchBook";

function App() {
  return (
    <Router>
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">FleetLink</h1>
          <div className="space-x-6">
            <Link
              to="/"
              className="hover:text-gray-200 font-medium transition"
            >
              Add Vehicle
            </Link>
            <Link
              to="/search"
              className="hover:text-gray-200 font-medium transition"
            >
              Search & Book
            </Link>
          </div>
        </div>
      </nav>

      {/* Pages */}
      <div className="min-h-screen bg-gray-100 p-6">
        <Routes>
          <Route path="/" element={<AddVehicle />} />
          <Route path="/search" element={<SearchBook />} />
        </Routes>
      </div>
    </Router>

  
    



  );
}

export default App;
