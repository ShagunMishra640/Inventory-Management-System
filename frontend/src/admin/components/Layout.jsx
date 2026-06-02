import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaBox,
  FaUsers,
  FaBoxes,
  FaClipboardList,
  FaChartBar,
  FaChartLine,
  FaCog,
  FaKey,
  FaSignOutAlt,
  FaBell,
  FaPercent,
  FaStore,
  FaUserShield,
} from "react-icons/fa";

import { useApp } from "../context/AppContext";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: FaTachometerAlt },
    { name: "POS Terminal", path: "/admin/terminal", icon: FaShoppingCart },
    { name: "Inventory", path: "/admin/inventory", icon: FaBox },
    { name: "Products", path: "/admin/product", icon: FaBoxes },
    { name: "Orders", path: "/admin/order", icon: FaClipboardList },
    { name: "Users", path: "/admin/users", icon: FaUsers },
    { name: "Manage User Roles", path: "/admin/roles", icon: FaUserShield },
    { name: "Tax Configuration", path: "/admin/tax", icon: FaPercent },
    { name: "Store Management", path: "/admin/store", icon: FaStore },
    { name: "Business Analytics", path: "/admin/analytics", icon: FaChartLine },
    { name: "API Control", path: "/admin/api-control", icon: FaKey },
    { name: "Reports", path: "/admin/report", icon: FaChartBar },
    { name: "Settings", path: "/admin/setting", icon: FaCog },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC]">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#071a33] border-r border-[#0b2545] flex flex-col justify-between p-4 shadow-xl">

        <div>
          {/* LOGO */}
          <div className="mb-8 px-2">
            <h1 className="text-xl font-bold text-white">RetailPOS</h1>
            <p className="text-xs text-blue-200/80">Omnichannel System</p>
          </div>

          {/* MENU */}
          <nav className="space-y-1 max-h-[calc(100vh-9rem)] overflow-y-auto pr-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              // FIX ACTIVE ROUTE (handles sub routes too)
              const isActive = location.pathname.startsWith(item.path);

              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-950/30"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium text-blue-100 hover:bg-red-500/15 hover:text-red-100"
        >
          <FaSignOutAlt size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">

          <h2 className="text-lg font-bold text-slate-800">
            {menuItems.find((m) =>
              location.pathname.startsWith(m.path)
            )?.name || "Dashboard"}
          </h2>

          <div className="flex items-center space-x-6">

            {/* NOTIFICATION */}
            <div className="relative">
              <FaBell className="text-slate-500" size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>

            {/* USER INFO */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {user?.name ? user.name[0].toUpperCase() : "A"}
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-slate-400">
                  {user?.role || "User"}
                </p>
              </div>
            </div>

          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
