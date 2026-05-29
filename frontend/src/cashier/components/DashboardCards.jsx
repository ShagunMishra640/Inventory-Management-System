import {
  FaMoneyBillWave,
  FaReceipt,
  FaBoxOpen,
  FaShoppingCart,
} from "react-icons/fa";

function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* CARD 1 */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Today's Sales</h3>

            <h1 className="text-3xl font-bold text-pink-600 mt-2">₹12,500</h1>
          </div>

          <FaMoneyBillWave size={35} className="text-pink-500" />
        </div>
      </div>

      {/* CARD 2 */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Total Orders</h3>

            <h1 className="text-3xl font-bold text-purple-600 mt-2">120</h1>
          </div>

          <FaReceipt size={35} className="text-purple-500" />
        </div>
      </div>

      {/* CARD 3 */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Products Sold</h3>

            <h1 className="text-3xl font-bold text-green-600 mt-2">340</h1>
          </div>

          <FaBoxOpen size={35} className="text-green-500" />
        </div>
      </div>

      {/* CARD 4 */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Customers</h3>

            <h1 className="text-3xl font-bold text-orange-500 mt-2">85</h1>
          </div>

          <FaShoppingCart size={35} className="text-orange-400" />
        </div>
      </div>
    </div>
  );
}

export default DashboardCards;
