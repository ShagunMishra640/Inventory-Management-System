import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaBoxOpen,
  FaReceipt,
  FaSignOutAlt,
  FaSearch,
  FaPlus,
  FaMinus,
  FaTrash,
} from "react-icons/fa";

function CashierDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-pink-600 to-purple-700 text-white p-5 shadow-2xl">
        {/* LOGO */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Cashier Panel</h1>

          <p className="text-sm text-gray-200 mt-2">Billing & Sales System</p>
        </div>

        {/* MENU */}
        <ul className="space-y-4">
          <li className="flex items-center gap-3 p-3 rounded-xl bg-white/20 cursor-pointer">
            <FaShoppingCart />
            <span>Dashboard</span>
          </li>

          <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition cursor-pointer">
            <FaReceipt />
            <span>Billing</span>
          </li>

          <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition cursor-pointer">
            <FaBoxOpen />
            <span>Products</span>
          </li>
        </ul>

        {/* LOGOUT */}
        <div className="absolute bottom-5 left-5">
          <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl shadow-lg transition">
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
              Welcome Cashier 👋
            </h2>

            <p className="text-gray-500 mt-1">
              Manage billing and customer sales easily.
            </p>
          </div>

          <div className="h-12 w-12 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
            C
          </div>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* CARD 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm">Today's Sales</h3>

                <h1 className="text-3xl font-bold text-pink-600 mt-2">
                  ₹12,500
                </h1>
              </div>

              <FaMoneyBillWave size={35} className="text-pink-500" />
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm">Total Orders</h3>

                <h1 className="text-3xl font-bold text-purple-600 mt-2">120</h1>
              </div>

              <FaReceipt size={35} className="text-purple-500" />
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm">Products Sold</h3>

                <h1 className="text-3xl font-bold text-green-600 mt-2">340</h1>
              </div>

              <FaBoxOpen size={35} className="text-green-500" />
            </div>
          </div>

          {/* CARD 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm">Customers</h3>

                <h1 className="text-3xl font-bold text-orange-500 mt-2">85</h1>
              </div>

              <FaShoppingCart size={35} className="text-orange-400" />
            </div>
          </div>
        </div>

        {/* BILLING SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* PRODUCT SEARCH */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-700">
                Billing Counter
              </h2>

              <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl">
                <FaSearch className="text-gray-500 mr-2" />

                <input
                  type="text"
                  placeholder="Search product..."
                  className="bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* PRODUCT TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="p-3">Product</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b">
                    <td className="p-3">Laptop</td>
                    <td className="p-3">₹45,000</td>

                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button className="bg-red-100 p-1 rounded">
                          <FaMinus />
                        </button>

                        <span>1</span>

                        <button className="bg-green-100 p-1 rounded">
                          <FaPlus />
                        </button>
                      </div>
                    </td>

                    <td className="p-3">
                      <button className="bg-red-500 text-white p-2 rounded-lg">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="p-3">Keyboard</td>
                    <td className="p-3">₹1,200</td>

                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button className="bg-red-100 p-1 rounded">
                          <FaMinus />
                        </button>

                        <span>2</span>

                        <button className="bg-green-100 p-1 rounded">
                          <FaPlus />
                        </button>
                      </div>
                    </td>

                    <td className="p-3">
                      <button className="bg-red-500 text-white p-2 rounded-lg">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* BILL SUMMARY */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-5">
              Bill Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>

                <span className="font-semibold">₹47,400</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>

                <span className="font-semibold">₹2,600</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span className="text-pink-600">₹50,000</span>
              </div>

              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition">
                Generate Bill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashierDashboard;
