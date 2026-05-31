import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaShoppingCart,
  FaClipboardList,
  FaUsers,
  FaMoneyBillWave,
  FaCog,
  FaSignOutAlt,
  FaBox,
  FaChartBar,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/cashier/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Billing",
      path: "/cashier/billing",
      icon: <FaShoppingCart />,
    },
    {
      name: "Products",
      path: "/cashier/products",
      icon: <FaBox />,
    },
    {
      name: "Orders",
      path: "/cashier/orders",
      icon: <FaClipboardList />,
    },
    {
      name: "Customers",
      path: "/cashier/customers",
      icon: <FaUsers />,
    },
    {
      name: "Payments",
      path: "/cashier/payments",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Reports",
      path: "/cashier/reports",
      icon: <FaChartBar />,
    },
    {
      name: "Settings",
      path: "/cashier/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-10 text-center">Cashier Panel</h1>

        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition duration-300 ${
                  location.pathname === item.path
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name &&
                item.name.toLowerCase().includes("notifi") ? null : (
                  <span>{item.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-3 w-full bg-red-500 hover:bg-red-600 p-3 rounded-lg transition duration-300"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
