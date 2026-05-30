import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const topCards = [
    { label: "Today's Sales", value: "₹25,450", color: "bg-blue-500" },
    { label: "Orders Today", value: "125", color: "bg-green-500" },
    { label: "Customers", value: "350", color: "bg-yellow-500" },
    { label: "Low Stock", value: "8 Products", color: "bg-red-500" },
  ];

  const topProducts = [
    { name: "Computer", sold: 12000 },
    { name: "Laptop", sold: 98000 },
    { name: "Gaming Laptop", sold: 75000 },
  ];

  const chartData = [
    { day: "Mon", sales: 40000 },
    { day: "Tue", sales: 30000 },
    { day: "Wed", sales: 5500 },
    { day: "Thu", sales: 48000 },
    { day: "Fri", sales: 62000 },
    { day: "Sat", sales: 71000 },
    { day: "Sun", sales: 68000 },
  ];

  const freshnessData = [
    { range: "<3 Days", percent: 80 },
    { range: "3–7 Days", percent: 85 },
    { range: "8–14 Days", percent: 90 },
    { range: "15–28 Days", percent: 86 },
  ];

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
        {topCards.map((card) => (
          <div
            key={card.label}
            className={`${card.color} text-white rounded-xl p-5 shadow-lg`}
          >
            <div className="text-sm opacity-90">{card.label}</div>
            <div className="mt-4 text-3xl font-bold">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Sales Chart + Side Panels */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        {/* Daily Sales Chart */}
        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold">Daily Sales Chart</h2>
              <p className="text-sm text-gray-500">Trend for the last 7 days</p>
            </div>
            <span className="text-sm text-green-600 font-semibold">+12.4%</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Side Panels */}
        <div className="space-y-6">
          {/* Top Products */}
          <div className="bg-white rounded-3xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Top Products</h2>
            <div className="space-y-3">
              {topProducts.map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between border-b last:border-b-0 pb-3"
                >
                  <span>{product.name}</span>
                  <span className="font-semibold">{product.sold}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Overview */}
          <div className="bg-white rounded-3xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Quick Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-gray-500">New Customers</p>
                <p className="mt-2 text-xl font-semibold">45</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-gray-500">New Orders</p>
                <p className="mt-2 text-xl font-semibold">32</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Freshness Overview Section - Compact */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-bold mb-3">Freshness Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {freshnessData.map((item) => (
            <div
              key={item.range}
              className="rounded-xl bg-slate-50 p-3 text-center"
            >
              <p className="text-xs text-gray-500">{item.range}</p>
              <p className="mt-1 text-lg font-semibold">{item.percent}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
