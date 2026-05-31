import Sidebar from "../components/Sidebar";

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

const reports = [
  {
    id: "#REP001",
    title: "Monthly Sales Report",
    category: "Sales",
    date: "29 May 2026",
    status: "Completed",
  },

  {
    id: "#REP002",
    title: "Inventory Analytics",
    category: "Inventory",
    date: "28 May 2026",
    status: "Pending",
  },

  {
    id: "#REP003",
    title: "Customer Insights",
    category: "Customers",
    date: "27 May 2026",
    status: "Completed",
  },

  {
    id: "#REP004",
    title: "Revenue Statistics",
    category: "Finance",
    date: "26 May 2026",
    status: "Processing",
  },
];

const Reports = () => {
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

            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-105 transition-all duration-300 text-white px-8 py-5 rounded-2xl flex items-center gap-4 text-xl font-semibold shadow-xl">

              <FaDownload />

              Export Reports
            </button>
          </div>

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
                    245
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
                    Sales Analytics
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    ₹8.5L
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
                    Customers
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    2,450
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
                    Performance
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    92%
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

                {[100, 180, 140, 240, 190, 280].map((height, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center w-full"
                  >

                    <div
                      style={{ height: `${height}px` }}
                      className="w-full rounded-t-3xl bg-gradient-to-t from-blue-600 to-indigo-500"
                    />

                    <p className="mt-4 text-gray-500 font-medium">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}
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
                        245
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
                      Sales Reports
                    </span>

                  </div>

                  <span className="font-bold">
                    45%
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
                    25%
                  </span>
                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-5 h-5 rounded-full bg-purple-500" />

                    <span className="text-lg">
                      Customer Reports
                    </span>

                  </div>

                  <span className="font-bold">
                    20%
                  </span>
                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-5 h-5 rounded-full bg-orange-500" />

                    <span className="text-lg">
                      Financial Reports
                    </span>

                  </div>

                  <span className="font-bold">
                    10%
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

                {reports.map((report, index) => (
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

                      <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300">

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
                Showing 1 to 4 of 245 reports
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

export default Reports;