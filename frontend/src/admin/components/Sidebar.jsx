import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Boxes,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "POS Terminal", path: "/admin/terminal", icon: ShoppingCart },
    { name: "Inventory", path: "/admin/inventory", icon: Boxes },
    { name: "Products", path: "/admin/product", icon: FileText },
    { name: "Orders", path: "/admin/order", icon: FileText },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Reports", path: "/admin/report", icon: FileText },
    { name: "Settings", path: "/admin/setting", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 h-full flex-shrink-0">
      <div>
        <div className="mb-8 px-2 py-1">
          <h1 className="text-xl font-bold text-brand tracking-tight">
            RetailPOS
          </h1>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-brand-light text-brand"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
