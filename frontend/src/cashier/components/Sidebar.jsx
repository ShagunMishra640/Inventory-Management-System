import React from "react";

import { Link, useLocation } from "react-router-dom";

import {
  FaTachometerAlt,
  FaShoppingCart,
  FaClipboardList,
  FaUsers,
  FaMoneyBillWave,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

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
      name: "Profile",
      path: "/cashier/profile",
      icon: <FaUserCircle />,
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white p-5">
      {/* Logo */}
      <h1 className="text-3xl font-bold mb-10 text-center">Cashier</h1>

      {/* Menu */}
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition duration-300
              
              ${
                location.pathname === item.path
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <span className="text-lg">{item.icon}</span>

              <span className="text-md">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="mt-10">
        <button className="flex items-center gap-3 w-full bg-red-500 hover:bg-red-600 p-3 rounded-lg transition duration-300">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
