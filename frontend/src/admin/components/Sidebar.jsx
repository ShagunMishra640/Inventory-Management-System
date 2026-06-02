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
  BarChart3,
  Building2,
  KeyRound,
  Percent,
  Shield,
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
    { name: "Manage User Roles", path: "/admin/roles", icon: Shield },
    { name: "Tax Configuration", path: "/admin/tax", icon: Percent },
    { name: "Store Management", path: "/admin/store", icon: Building2 },
    { name: "Business Analytics", path: "/admin/analytics", icon: BarChart3 },
    { name: "API Control", path: "/admin/api-control", icon: KeyRound },
    { name: "Reports", path: "/admin/report", icon: FileText },
    { name: "Settings", path: "/admin/setting", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 bg-[#071a33] border-r border-[#0b2545] flex flex-col justify-between p-4 h-full flex-shrink-0 shadow-xl">
      <div>
        <div className="mb-8 px-2 py-1">
          <h1 className="text-xl font-bold text-white tracking-tight">
            RetailPOS
          </h1>
          <p className="text-xs text-blue-200/80">Admin Panel</p>
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
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-950/30"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
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
        className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium text-blue-100 hover:bg-red-500/15 hover:text-red-100 transition-colors"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
