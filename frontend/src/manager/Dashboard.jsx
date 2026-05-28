import {
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white p-5 shadow-2xl">
        {/* LOGO */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-wide">Manager Panel</h1>

          <p className="text-sm text-gray-200 mt-2">
            Inventory Management System
          </p>
        </div>

        {/* MENU */}
        <ul className="space-y-4">
          <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 cursor-pointer transition duration-300">
            <FaBoxOpen />
            <span>Products</span>
          </li>

          <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 cursor-pointer transition duration-300">
            <FaClipboardList />
            <span>Orders</span>
          </li>

          <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 cursor-pointer transition duration-300">
            <FaUsers />
            <span>Employees</span>
          </li>

          <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 cursor-pointer transition duration-300">
            <FaChartLine />
            <span>Reports</span>
          </li>
        </ul>

        {/* LOGOUT */}
        <div className="absolute bottom-5 left-5">
          <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition duration-300 shadow-lg">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        {/* TOPBAR */}
        <div className="bg-white rounded-2xl shadow-lg p-5 flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-700">
              Welcome Manager 👋
            </h2>

            <p className="text-gray-500 mt-1">
              Manage your inventory and reports easily.
            </p>
          </div>

          <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
            M
          </div>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* CARD 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-gray-500 text-sm">Total Products</h3>

            <h1 className="text-3xl font-bold text-indigo-600 mt-2">250</h1>
          </div>

          {/* CARD 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-gray-500 text-sm">Total Orders</h3>

            <h1 className="text-3xl font-bold text-pink-600 mt-2">180</h1>
          </div>

          {/* CARD 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-gray-500 text-sm">Employees</h3>

            <h1 className="text-3xl font-bold text-green-600 mt-2">15</h1>
          </div>

          {/* CARD 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-gray-500 text-sm">Monthly Revenue</h3>

            <h1 className="text-3xl font-bold text-orange-500 mt-2">₹85K</h1>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Recent Inventory Updates
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="p-3">Laptop</td>
                  <td className="p-3">Electronics</td>
                  <td className="p-3">25</td>
                  <td className="p-3 text-green-600 font-semibold">
                    Available
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-3">Keyboard</td>
                  <td className="p-3">Accessories</td>
                  <td className="p-3">10</td>
                  <td className="p-3 text-yellow-500 font-semibold">
                    Low Stock
                  </td>
                </tr>

                <tr>
                  <td className="p-3">Mouse</td>
                  <td className="p-3">Accessories</td>
                  <td className="p-3">0</td>
                  <td className="p-3 text-red-500 font-semibold">
                    Out of Stock
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
