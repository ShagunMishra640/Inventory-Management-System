import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getSalesStats } from "../services/salesService";

import {
  FaBell,
  FaSearch,
  FaDownload,
  FaArrowUp,
  FaArrowDown,
  FaRupeeSign,
  FaShoppingBag,
  FaChartLine,
  FaWallet,
} from "react-icons/fa";

const fallbackSalesData = [
  {
    id: "#SALE001",
    customer: "Rutika Pujari",
    product: "MacBook Pro 16",
    amount: "₹1,59,900",
    date: "29 May 2026",
    status: "Completed",
  },

  {
    id: "#SALE002",
    customer: "Amit Sharma",
    product: "Sony Headphones",
    amount: "₹29,990",
    date: "28 May 2026",
    status: "Pending",
  },

  {
    id: "#SALE003",
    customer: "Sneha Patil",
    product: "Mechanical Keyboard",
    amount: "₹4,999",
    date: "27 May 2026",
    status: "Completed",
  },

  {
    id: "#SALE004",
    customer: "Rahul Joshi",
    product: "LG Monitor",
    amount: "₹22,499",
    date: "26 May 2026",
    status: "Cancelled",
  },
];

const Sales = () => {
  const [salesData, setSalesData] = useState(fallbackSalesData);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    growthRate: 0,
    netProfit: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));

  useEffect(() => {
    let isMounted = true;

    const loadSales = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getSalesStats();

        if (isMounted) {
          setStats(data);
          setSalesData(data.sales);
        }
      } catch (err) {
        if (isMounted) {
          const status = err?.response?.status;
          const message =
            err?.response?.data?.message || err.message || "Sales backend not responding";

          setError(status === 403 ? "" : message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSales();

    return () => {
      isMounted = false;
    };
  }, []);

  const chartHeights = useMemo(() => {
    if (!salesData.length || salesData === fallbackSalesData) {
      return [120, 180, 150, 250, 210, 300];
    }

    const monthlyTotals = Array(6).fill(0);

    salesData.forEach((sale) => {
      const month = new Date(sale.raw?.createdAt || sale.date).getMonth();

      if (month >= 0 && month < 6) {
        monthlyTotals[month] += sale.amount;
      }
    });

    const max = Math.max(...monthlyTotals, 1);
    return monthlyTotals.map((total) => Math.max(40, Math.round((total / max) * 300)));
  }, [salesData]);

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="ml-[280px] w-full">

        {/* TOPBAR */}

        <div className="bg-white px-10 py-6 flex justify-between items-center border-b">

          {/* SEARCH */}

          <div className="relative w-[420px]">

            <FaSearch className="absolute top-5 left-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search sales..."
              className="w-full bg-[#f5f7fb] rounded-2xl pl-14 pr-5 py-4 outline-none border border-gray-200 text-lg"
            />
          </div>

          {/* PROFILE */}

          <div className="flex items-center gap-8">

            <div className="relative">

              <FaBell className="text-3xl text-gray-600" />

              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center">
                8
              </div>
            </div>

            <div className="flex items-center gap-4">

              <img
                src="/Rutika.jpg.jpeg"
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>

                <h3 className="font-bold text-xl">
                  Rutika Pujari
                </h3>

                <p className="text-gray-500">
                  Sales Manager
                </p>

              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-10">

          {/* HEADER */}

          <div className="flex justify-between items-center mb-10">

            <div>

              <h1 className="text-6xl font-bold text-[#061539]">
                Sales Overview
              </h1>

              <p className="text-gray-500 text-xl mt-3">
                Monitor sales performance and revenue analytics.
              </p>

            </div>

            <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-all duration-300 text-white px-8 py-5 rounded-2xl flex items-center gap-4 text-xl font-semibold shadow-xl">

              <FaDownload />

              Export Report
            </button>
          </div>

          {error && (
            <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-700">
              {error}
            </div>
          )}

          {/* STATS */}

          <div className="grid grid-cols-4 gap-8 mb-10">

            {/* TOTAL SALES */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Total Revenue
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {loading ? "..." : formatCurrency(stats.totalRevenue)}
                  </h1>

                  <div className="flex items-center gap-2 mt-4 text-green-600">

                    <FaArrowUp />

                    <span className="font-semibold">
                      +12.5%
                    </span>

                  </div>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-4xl">

                  <FaRupeeSign />

                </div>
              </div>
            </div>

            {/* ORDERS */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Total Orders
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {loading ? "..." : stats.totalOrders}
                  </h1>

                  <div className="flex items-center gap-2 mt-4 text-blue-600">

                    <FaArrowUp />

                    <span className="font-semibold">
                      +8.2%
                    </span>

                  </div>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-4xl">

                  <FaShoppingBag />

                </div>
              </div>
            </div>

            {/* GROWTH */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Growth Rate
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {loading ? "..." : `${stats.growthRate}%`}
                  </h1>

                  <div className="flex items-center gap-2 mt-4 text-purple-600">

                    <FaChartLine />

                    <span className="font-semibold">
                      This Month
                    </span>

                  </div>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-4xl">

                  <FaChartLine />

                </div>
              </div>
            </div>

            {/* PROFIT */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Net Profit
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {loading ? "..." : formatCurrency(stats.netProfit)}
                  </h1>

                  <div className="flex items-center gap-2 mt-4 text-red-500">

                    <FaArrowDown />

                    <span className="font-semibold">
                      -1.2%
                    </span>

                  </div>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 text-4xl">

                  <FaWallet />

                </div>
              </div>
            </div>
          </div>

          {/* SALES CHART */}

          <div className="bg-white rounded-3xl p-10 shadow-sm mb-10">

            <div className="flex justify-between items-center mb-8">

              <div>

                <h2 className="text-3xl font-bold text-[#061539]">
                  Monthly Sales Analytics
                </h2>

                <p className="text-gray-500 mt-2">
                  Sales performance over the last 6 months
                </p>

              </div>

              <select className="px-6 py-3 rounded-2xl border border-gray-200 bg-[#f5f7fb]">

                <option>2026</option>

              </select>
            </div>

            {/* FAKE CHART */}

            <div className="h-[320px] flex items-end justify-between gap-5">

              {chartHeights.map((height, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-full"
                >

                  <div
                    style={{ height: `${height}px` }}
                    className="w-full rounded-t-3xl bg-gradient-to-t from-blue-600 to-indigo-500 hover:scale-105 transition-all duration-300"
                  />

                  <p className="mt-4 text-gray-500 font-medium">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TABLE */}

          <div className="bg-white rounded-3xl overflow-hidden shadow-sm">

            <div className="flex justify-between items-center p-8 border-b">

              <div>

                <h2 className="text-3xl font-bold text-[#061539]">
                  Recent Sales
                </h2>

                <p className="text-gray-500 mt-2">
                  Latest customer purchases
                </p>

              </div>
            </div>

            <table className="w-full">

              <thead className="bg-[#f8f9fc] text-gray-500 text-lg">

                <tr>

                  <th className="p-6 text-left">
                    SALE ID
                  </th>

                  <th className="p-6 text-left">
                    CUSTOMER
                  </th>

                  <th className="p-6 text-left">
                    PRODUCT
                  </th>

                  <th className="p-6 text-left">
                    AMOUNT
                  </th>

                  <th className="p-6 text-left">
                    DATE
                  </th>

                  <th className="p-6 text-left">
                    STATUS
                  </th>

                </tr>
              </thead>

              <tbody>

                {salesData.map((sale, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-[#f8f9fc] transition-all duration-300"
                  >

                    <td className="p-6 font-semibold text-lg">
                      {sale.id}
                    </td>

                    <td className="p-6 text-xl">
                      {sale.customer}
                    </td>

                    <td className="p-6 text-xl">
                      {sale.product}
                    </td>

                    <td className="p-6 text-2xl font-bold text-green-600">
                      {typeof sale.amount === "number" ? formatCurrency(sale.amount) : sale.amount}
                    </td>

                    <td className="p-6 text-lg text-gray-500">
                      {sale.date}
                    </td>

                    <td className="p-6">

                      <span
                        className={`px-5 py-3 rounded-xl text-lg font-medium ${
                          sale.status === "COMPLETED" || sale.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : sale.status === "PLACED" || sale.status === "Pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {sale.status}
                      </span>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}

            <div className="flex justify-between items-center p-8 border-t">

              <p className="text-gray-500 text-lg">
                Showing 1 to {salesData.length} of {salesData.length} sales
              </p>

              <div className="flex items-center gap-4">

                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`w-14 h-14 rounded-xl text-lg font-semibold ${
                      page === 1
                        ? "bg-blue-600 text-white"
                        : "border"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
