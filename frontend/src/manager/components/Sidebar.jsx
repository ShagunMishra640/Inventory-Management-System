import { Link, useLocation } from "react-router-dom";
import {
  FaBell,
  FaBoxes,
  FaChartLine,
  FaClipboardList,
  FaCog,
  FaExclamationTriangle,
  FaFileAlt,
  FaLayerGroup,
  FaPlus,
  FaShoppingCart,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTruck,
  FaUserCircle,
  FaUsers,
  FaWarehouse,
} from "react-icons/fa";

const menus = [
  { name: "Dashboard", path: "/manager/dashboard", icon: <FaTachometerAlt /> },
  { name: "Employees", path: "/manager/employees", icon: <FaUsers /> },
  { name: "Products", path: "/manager/products", icon: <FaBoxes /> },
  { name: "Add Product", path: "/manager/products/add", icon: <FaPlus /> },
  { name: "Categories", path: "/manager/categories", icon: <FaLayerGroup /> },
  { name: "Orders", path: "/manager/orders", icon: <FaClipboardList /> },
  { name: "Inventory", path: "/manager/inventory", icon: <FaWarehouse /> },
  { name: "Stock", path: "/manager/stock", icon: <FaShoppingCart /> },
  { name: "Low Stock", path: "/manager/low-stock", icon: <FaExclamationTriangle /> },
  { name: "Purchase Orders", path: "/manager/purchase-orders", icon: <FaFileAlt /> },
  { name: "Suppliers", path: "/manager/suppliers", icon: <FaTruck /> },
  { name: "Sales", path: "/manager/sales", icon: <FaChartLine /> },
  { name: "Reports", path: "/manager/reports", icon: <FaFileAlt /> },
  { name: "Notifications", path: "/manager/notifications", icon: <FaBell /> },
  { name: "Settings", path: "/manager/settings", icon: <FaCog /> },
  { name: "Profile", path: "/manager/profile", icon: <FaUserCircle /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed flex h-screen w-[280px] flex-col justify-between overflow-y-auto bg-[#061539] text-white">
      <div>
        <div className="flex items-center justify-between px-7 py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl">
              <FaBoxes />
            </div>

            <h1 className="text-3xl font-bold">Manager Panel</h1>
          </div>
        </div>

        <div className="mt-4 space-y-2 px-4 pb-4">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl px-5 py-3 transition-all duration-300 ${
                location.pathname === menu.path
                  ? "bg-gradient-to-r from-blue-600 to-indigo-700"
                  : "hover:bg-white/10"
              }`}
            >
              <span className="text-xl">{menu.icon}</span>
              <span className="text-lg font-medium">{menu.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <Link
        to="/login"
        className="m-5 flex items-center gap-4 rounded-3xl border border-red-400/20 bg-white/10 px-5 py-4 text-lg font-semibold text-red-100 shadow-lg shadow-black/10 transition-all duration-300 hover:border-red-300/50 hover:bg-red-500/20"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500 text-white">
          <FaSignOutAlt />
        </span>
        <span>Logout</span>
      </Link>
    </div>
  );
};

export default Sidebar;
