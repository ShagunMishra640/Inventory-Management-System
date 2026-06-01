import { useEffect, useMemo, useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaUsers,
  FaShoppingCart,
  FaBoxOpen,
  FaDollarSign,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import profileImage from "../../assets/rutika-profile.jpeg";
import { getDashboardData } from "../services/dashboardService";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));

const getOrderProduct = (order) => {
  const firstItem = order.items?.[0];
  return firstItem?.product?.name || `${order.items?.length || 0} items`;
};

const statColors = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-500",
  purple: "bg-purple-100 text-purple-600",
};

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({});
  const [profile, setProfile] = useState({ name: "Rutika Pujari", role: "Manager" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) {
      setProfile({
        name: storedUser.name || "Manager",
        role: storedUser.title || storedUser.role || "Manager",
        avatar: storedUser.avatar,
      });
    }

    const loadDashboard = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await getDashboardData();
        setDashboard(data);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Dashboard data load failed");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const stats = useMemo(
    () => ({
      revenue: dashboard.totalRevenue || 0,
      orders: dashboard.totalPurchaseOrders || 0,
      products: dashboard.totalProducts || 0,
      customers: dashboard.totalCustomers || dashboard.totalSuppliers || 0,
      alerts: dashboard.lowStockCount || 0,
    }),
    [dashboard],
  );

  const chartHeights = useMemo(() => {
    const values = [
      stats.revenue,
      stats.orders,
      stats.products,
      stats.customers,
      dashboard.totalStocks || 0,
      dashboard.totalCategories || 0,
      stats.alerts,
    ];
    const max = Math.max(...values, 1);
    return values.map((value) => Math.max(40, Math.round((value / max) * 280)));
  }, [dashboard, stats]);

  const recentOrders = dashboard.recentPurchaseOrders || [];
  const recentActivity = dashboard.recentActivity || [];

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">
      <Sidebar />

      <div className="ml-[280px] w-full">
        <div className="bg-white px-10 py-6 flex justify-between items-center border-b">
          <div className="relative w-[420px]">
            <FaSearch className="absolute top-5 left-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full bg-[#f5f7fb] rounded-2xl pl-14 pr-5 py-4 outline-none border border-gray-200 text-lg"
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="relative">
              <FaBell className="text-3xl text-gray-600" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center">
                {stats.alerts}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={profile.avatar || profileImage}
                alt={profile.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-xl">{profile.name}</h3>
                <p className="text-gray-500">{profile.role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10">
          <div className="mb-10">
            <h1 className="text-6xl font-bold text-[#061539]">Dashboard</h1>
            <p className="text-gray-500 text-xl mt-3">
              Welcome back, manage your business efficiently.
            </p>
          </div>

          {error && (
            <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-4 gap-8 mb-10">
            {[
              {
                title: "Total Revenue",
                value: formatCurrency(stats.revenue),
                icon: <FaDollarSign />,
                color: "blue",
                trend: "+12.5%",
              },
              {
                title: "Purchase Orders",
                value: stats.orders.toLocaleString("en-IN"),
                icon: <FaShoppingCart />,
                color: "green",
                trend: "+8.2%",
              },
              {
                title: "Products",
                value: stats.products.toLocaleString("en-IN"),
                icon: <FaBoxOpen />,
                color: "orange",
                trend: stats.alerts ? `${stats.alerts} low` : "Healthy",
                down: Boolean(stats.alerts),
              },
              {
                title: "Customers",
                value: stats.customers.toLocaleString("en-IN"),
                icon: <FaUsers />,
                color: "purple",
                trend: "+18.7%",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-xl">{item.title}</p>
                    <h1 className="text-4xl font-bold mt-4">
                      {isLoading ? "..." : item.value}
                    </h1>
                    <div
                      className={`flex items-center gap-2 mt-4 text-lg font-medium ${
                        item.down ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      {item.down ? <FaArrowDown /> : <FaArrowUp />}
                      {item.trend}
                    </div>
                  </div>
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl ${statColors[item.color]}`}
                  >
                    {item.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-[#061539]">
                    Inventory Analytics
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Current backend summary overview
                  </p>
                </div>
                <button className="px-6 py-3 rounded-2xl bg-[#f5f7fb] border">
                  Live Data
                </button>
              </div>

              <div className="flex items-end gap-6 h-[300px]">
                {chartHeights.map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-3xl"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>

              <div className="flex justify-between mt-6 text-gray-500 text-lg">
                {["Revenue", "PO", "Products", "Users", "Stock", "Cats", "Low"].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-[#061539] mb-8">
                Recent Activity
              </h2>

              <div className="space-y-8">
                {(recentActivity.length ? recentActivity : ["No recent activity"]).map(
                  (activity, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-4 h-4 rounded-full bg-blue-600 mt-2" />
                      <div>
                        <h3 className="font-semibold text-lg">{activity}</h3>
                        <p className="text-gray-500 mt-1">Just now</p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl mt-10 p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#061539]">
                  Recent Purchase Orders
                </h2>
                <p className="text-gray-500 mt-2">
                  Latest supplier purchases from backend
                </p>
              </div>
              <button className="px-6 py-3 rounded-2xl bg-blue-600 text-white">
                View All
              </button>
            </div>

            <table className="w-full">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="text-left py-5">Supplier</th>
                  <th className="text-left py-5">Product</th>
                  <th className="text-left py-5">Amount</th>
                  <th className="text-left py-5">Status</th>
                </tr>
              </thead>

              <tbody>
                {isLoading && (
                  <tr>
                    <td className="py-8 text-center text-gray-500" colSpan="4">
                      Dashboard loading...
                    </td>
                  </tr>
                )}

                {!isLoading && recentOrders.length === 0 && (
                  <tr>
                    <td className="py-8 text-center text-gray-500" colSpan="4">
                      No recent purchase orders
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  recentOrders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="py-6 font-semibold">
                        {order.supplier?.name || "Unknown Supplier"}
                      </td>
                      <td className="py-6">{getOrderProduct(order)}</td>
                      <td className="py-6 font-bold">
                        {formatCurrency(order.totalAmount)}
                      </td>
                      <td className="py-6">
                        <span
                          className={`px-4 py-2 rounded-xl text-sm font-medium ${
                            order.status === "Received"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
