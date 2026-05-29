import {
  FaShoppingCart,
  FaReceipt,
  FaBoxOpen,
  FaUsers,
  FaTags,
  FaMoneyBillWave,
  FaUndo,
  FaFileInvoiceDollar,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 bg-gradient-to-b from-pink-600 to-purple-700 text-white p-5 shadow-2xl min-h-screen">
      {/* LOGO */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Cashier Panel</h1>
        <p className="text-sm text-gray-200 mt-2">Billing & Sales System</p>
      </div>

      {/* MENU */}
      <ul className="space-y-4">
        <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 cursor-pointer">
          <FaShoppingCart /> <span>Dashboard</span>
        </li>
        <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 cursor-pointer">
          <FaReceipt /> <span>Billing / POS</span>
        </li>
        <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 cursor-pointer">
          <FaBoxOpen /> <span>Products</span>
        </li>
        <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 cursor-pointer">
          <FaUsers /> <span>Customers</span>
        </li>
        <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 cursor-pointer">
          <FaTags /> <span>Discounts</span>
        </li>
        <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 cursor-pointer">
          <FaMoneyBillWave /> <span>Payments</span>
        </li>
        <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 cursor-pointer">
          <FaFileInvoiceDollar /> <span>Receipts</span>
        </li>
        <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 cursor-pointer">
          <FaUndo /> <span>Refunds</span>
        </li>
        <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 cursor-pointer">
          <FaChartBar /> <span>Reports</span>
        </li>
      </ul>

      {/* LOGOUT */}
      <div className="mt-10">
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl shadow-lg transition">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
