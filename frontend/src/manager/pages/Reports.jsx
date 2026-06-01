import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getReports } from "../services/reportService";
import exportReport from "../utils/exportReport";

import {
  FaBell,
  FaSearch,
  FaDownload,
  FaFileInvoiceDollar,
  FaChartPie,
  FaChartLine,
  FaUsers,
  FaArrowUp,
} from "react-icons/fa";

const today = () => new Date().toLocaleDateString("en-IN");

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadReports = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getReports();

        if (isMounted) {
          setReportData(data);
          if (data.errors?.length) {
            setError(data.errors.join(", "));
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.response?.data?.message || err.message || "Reports backend not responding");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadReports();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    return {
      totalProducts: reportData?.stock?.totalProducts ?? 0,
      totalLowStock: reportData?.lowStock?.totalLowStock ?? 0,
      totalPurchases: reportData?.purchases?.totalPurchases ?? 0,
      totalSuppliers: reportData?.suppliers?.totalSuppliers ?? 0,
    };
  }, [reportData]);

  const recentReports = useMemo(() => {
    return [
      {
        id: "#STOCK",
        title: "Stock Report",
        category: "Inventory",
        date: today(),
        status: "Completed",
        total: stats.totalProducts,
        rows: reportData?.stock?.products || [],
      },
      {
        id: "#LOW-STOCK",
        title: "Low Stock Report",
        category: "Inventory",
        date: today(),
        status: stats.totalLowStock > 0 ? "Pending" : "Completed",
        total: stats.totalLowStock,
        rows: reportData?.lowStock?.lowStockProducts || [],
      },
      {
        id: "#PURCHASE",
        title: "Purchase Report",
        category: "Purchases",
        date: today(),
        status: "Completed",
        total: stats.totalPurchases,
        rows: reportData?.purchases?.purchases || [],
      },
      {
        id: "#SUPPLIER",
        title: "Supplier Report",
        category: "Suppliers",
        date: today(),
        status: "Completed",
        total: stats.totalSuppliers,
        rows: reportData?.suppliers?.suppliers || [],
      },
    ];
  }, [reportData, stats]);

  const filteredReports = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return recentReports;

    return recentReports.filter((report) =>
      [report.id, report.title, report.category, report.status].some((value) =>
        String(value).toLowerCase().includes(query),
      ),
    );
  }, [recentReports, searchTerm]);

  const chartHeights = useMemo(() => {
    const values = [
      stats.totalProducts,
      stats.totalLowStock,
      stats.totalPurchases,
      stats.totalSuppliers,
    ];
    const max = Math.max(...values, 1);
    return values.map((value) => Math.max(40, Math.round((value / max) * 260)));
  }, [stats]);

  const totalReportRows =
    stats.totalProducts + stats.totalLowStock + stats.totalPurchases + stats.totalSuppliers;

  const getPercent = (value) =>
    totalReportRows ? Math.round((value / totalReportRows) * 100) : 0;

  const exportRows = recentReports.map((report) => ({
    id: report.id,
    title: report.title,
    category: report.category,
    date: report.date,
    status: report.status,
    totalRecords: report.total,
  }));

  const handleExportReports = () => {
    exportReport(exportRows, "manager-reports.csv");
  };

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
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full bg-[#f5f7fb] rounded-2xl pl-14 pr-5 py-4 outline-none border border-gray-200 text-lg"
            />
          </div>

          {/* PROFILE */}

          <div className="flex items-center gap-8">

            <div className="relative">

              <FaBell className="text-3xl text-gray-600" />

              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center">
                6
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
                  Report Manager
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
                Reports & Analytics
              </h1>

              <p className="text-gray-500 text-xl mt-3">
                Analyze business performance and generate detailed reports.
              </p>

            </div>

            <button
              type="button"
              onClick={handleExportReports}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-105 transition-all duration-300 text-white px-8 py-5 rounded-2xl flex items-center gap-4 text-xl font-semibold shadow-xl"
            >

              <FaDownload />

              Export Reports
            </button>
          </div>

          {error && (
            <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-700">
              {error}
            </div>
          )}

          {/* STATS */}

          <div className="grid grid-cols-4 gap-8 mb-10">

            {/* TOTAL REPORTS */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Total Reports
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {loading ? "..." : totalReportRows}
                  </h1>

                  <div className="flex items-center gap-2 mt-4 text-green-600">

                    <FaArrowUp />

                    <span className="font-semibold">
                      +15%
                    </span>

                  </div>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-4xl">

                  <FaFileInvoiceDollar />

                </div>
              </div>
            </div>

            {/* SALES ANALYTICS */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Low Stock
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {loading ? "..." : stats.totalLowStock}
                  </h1>

                  <div className="flex items-center gap-2 mt-4 text-blue-600">

                    <FaArrowUp />

                    <span className="font-semibold">
                      +10%
                    </span>

                  </div>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-4xl">

                  <FaChartLine />

                </div>
              </div>
            </div>

            {/* CUSTOMER DATA */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Purchases
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {loading ? "..." : stats.totalPurchases}
                  </h1>

                  <div className="flex items-center gap-2 mt-4 text-purple-600">

                    <FaArrowUp />

                    <span className="font-semibold">
                      +18%
                    </span>

                  </div>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-4xl">

                  <FaUsers />

                </div>
              </div>
            </div>

            {/* PERFORMANCE */}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-xl">
                    Suppliers
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {loading ? "..." : stats.totalSuppliers}
                  </h1>

                  <div className="flex items-center gap-2 mt-4 text-orange-500">

                    <FaArrowUp />

                    <span className="font-semibold">
                      Excellent
                    </span>

                  </div>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-4xl">

                  <FaChartPie />

                </div>
              </div>
            </div>
          </div>

          {/* REPORT ANALYTICS */}

          <div className="grid grid-cols-2 gap-8 mb-10">

            {/* BAR CHART */}

            <div className="bg-white rounded-3xl p-8 shadow-sm">

              <div className="flex justify-between items-center mb-8">

                <div>

                  <h2 className="text-3xl font-bold text-[#061539]">
                    Revenue Analytics
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Monthly revenue statistics
                  </p>

                </div>

                <select className="px-5 py-3 rounded-2xl border border-gray-200 bg-[#f5f7fb]">

                  <option>2026</option>

                </select>
              </div>

              {/* CHART */}

              <div className="h-[280px] flex items-end justify-between gap-4">

                {chartHeights.map((height, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center w-full"
                  >

                    <div
                      style={{ height: `${height}px` }}
                      className="w-full rounded-t-3xl bg-gradient-to-t from-blue-600 to-indigo-500"
                    />

                    <p className="mt-4 text-gray-500 font-medium">
                      {["Stock", "Low", "PO", "Suppliers"][index]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* PIE STYLE CARD */}

            <div className="bg-white rounded-3xl p-8 shadow-sm">

              <div className="mb-8">

                <h2 className="text-3xl font-bold text-[#061539]">
                  Report Categories
                </h2>

                <p className="text-gray-500 mt-2">
                  Distribution of generated reports
                </p>

              </div>

              {/* CIRCLE */}

              <div className="flex items-center justify-center">

                <div className="w-72 h-72 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl">

                  <div className="w-40 h-40 rounded-full bg-white flex items-center justify-center">

                    <div className="text-center">

                      <h1 className="text-5xl font-bold text-[#061539]">
                        {loading ? "..." : totalReportRows}
                      </h1>

                      <p className="text-gray-500 mt-2">
                        Reports
                      </p>

                    </div>
                  </div>
                </div>
              </div>

              {/* LEGENDS */}

              <div className="mt-10 space-y-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-5 h-5 rounded-full bg-blue-600" />

                    <span className="text-lg">
                      Stock Reports
                    </span>

                  </div>

                  <span className="font-bold">
                    {getPercent(stats.totalProducts)}%
                  </span>
                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-5 h-5 rounded-full bg-green-500" />

                    <span className="text-lg">
                      Inventory Reports
                    </span>

                  </div>

                  <span className="font-bold">
                    {getPercent(stats.totalLowStock)}%
                  </span>
                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-5 h-5 rounded-full bg-purple-500" />

                    <span className="text-lg">
                      Purchase Reports
                    </span>

                  </div>

                  <span className="font-bold">
                    {getPercent(stats.totalPurchases)}%
                  </span>
                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-5 h-5 rounded-full bg-orange-500" />

                    <span className="text-lg">
                      Supplier Reports
                    </span>

                  </div>

                  <span className="font-bold">
                    {getPercent(stats.totalSuppliers)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* REPORT TABLE */}

          <div className="bg-white rounded-3xl overflow-hidden shadow-sm">

            <div className="flex justify-between items-center p-8 border-b">

              <div>

                <h2 className="text-3xl font-bold text-[#061539]">
                  Recent Reports
                </h2>

                <p className="text-gray-500 mt-2">
                  Recently generated business reports
                </p>

              </div>
            </div>

            <table className="w-full">

              <thead className="bg-[#f8f9fc] text-gray-500 text-lg">

                <tr>

                  <th className="p-6 text-left">
                    REPORT ID
                  </th>

                  <th className="p-6 text-left">
                    TITLE
                  </th>

                  <th className="p-6 text-left">
                    CATEGORY
                  </th>

                  <th className="p-6 text-left">
                    DATE
                  </th>

                  <th className="p-6 text-left">
                    STATUS
                  </th>

                  <th className="p-6 text-left">
                    ACTION
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredReports.map((report, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-[#f8f9fc] transition-all duration-300"
                  >

                    <td className="p-6 font-semibold text-lg">
                      {report.id}
                    </td>

                    <td className="p-6 text-xl font-medium">
                      {report.title}
                    </td>

                    <td className="p-6">

                      <span className="bg-blue-100 text-blue-700 px-5 py-3 rounded-xl text-lg">

                        {report.category}

                      </span>
                    </td>

                    <td className="p-6 text-lg text-gray-500">
                      {report.date}
                    </td>

                    <td className="p-6">

                      <span
                        className={`px-5 py-3 rounded-xl text-lg font-medium ${
                          report.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : report.status === "Pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>

                    <td className="p-6">

                      <button
                        type="button"
                        onClick={() => setSelectedReport(report)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300"
                      >

                        View
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}

            <div className="flex justify-between items-center p-8 border-t">

              <p className="text-gray-500 text-lg">
                Showing 1 to {filteredReports.length} of {recentReports.length} reports
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
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-[#061539]">
                  {selectedReport.title}
                </h2>
                <p className="text-gray-500">
                  {selectedReport.total} records from backend
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="rounded-xl bg-gray-100 px-4 py-2 font-semibold text-gray-700"
              >
                Close
              </button>
            </div>

            <div className="max-h-[60vh] overflow-auto p-6">
              {selectedReport.rows.length === 0 ? (
                <div className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
                  No records available
                </div>
              ) : (
                <pre className="whitespace-pre-wrap rounded-xl bg-[#f5f7fb] p-4 text-sm text-gray-700">
                  {JSON.stringify(selectedReport.rows.slice(0, 10), null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
