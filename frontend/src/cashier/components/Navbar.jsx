import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left Side */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Cashier Dashboard</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        <button className="text-2xl text-gray-700">
          <FaBell />
        </button>

        <div className="flex items-center gap-2">
          <FaUserCircle className="text-3xl text-gray-700" />

          <div>
            <h3 className="font-semibold">Cashier</h3>

            <p className="text-sm text-gray-500">Employee</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
