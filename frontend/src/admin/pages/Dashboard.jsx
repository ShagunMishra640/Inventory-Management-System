import React from 'react';
import { DollarSign, ShoppingBag, Layers, TrendingUp, AlertCircle, Loader2, ArrowUpRight, Users, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { dashboardStats, dashboardDetails, loadingStates, errorStates, products } = useApp();

  if (loadingStates.dashboard) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (errorStates.dashboard) return <div className="text-red-600 text-sm p-6">Error: {errorStates.dashboard}</div>;

  const cards = [
    { title: 'Total Revenue', value: dashboardStats.totalRevenue, change: dashboardStats.revenueChange, icon: DollarSign, gradient: 'from-blue-600 to-indigo-600', lightBg: 'bg-blue-50', textColor: 'text-blue-600' },
    { title: 'Total Orders', value: dashboardStats.totalOrders, change: dashboardStats.ordersChange, icon: ShoppingBag, gradient: 'from-indigo-600 to-purple-600', lightBg: 'bg-indigo-50', textColor: 'text-indigo-600' },
    { title: 'Active Customers', value: products.length, change: dashboardStats.productsSubtitle, icon: Users, gradient: 'from-emerald-600 to-teal-600', lightBg: 'bg-emerald-50', textColor: 'text-emerald-600' },
    { title: 'Growth Rate', value: dashboardStats.growthRate, change: dashboardStats.growthChange, icon: TrendingUp, gradient: 'from-purple-600 to-pink-600', lightBg: 'bg-purple-50', textColor: 'text-purple-600' },
  ];

  const pieData = [
    { name: 'Sales', value: 45 },
    { name: 'Orders', value: 30 },
    { name: 'Returns', value: 15 },
    { name: 'Pending', value: 10 },
  ];

  const pieColors = ['#2563eb', '#6366f1', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's your business overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient} p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
          >
            <div className="absolute -right-8 -top-8 opacity-10 w-32 h-32 bg-white rounded-full" />
            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90">{card.title}</p>
                  <h3 className="text-3xl font-bold mt-2">{card.value}</h3>
                </div>
                <div className="p-3 rounded-2xl bg-white/20 backdrop-blur">
                  <card.icon size={28} />
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <ArrowUpRight size={16} className={card.change.includes('+') ? 'text-emerald-300' : 'text-red-300'} />
                <span className={card.change.includes('+') ? 'text-emerald-100' : 'text-red-100'}>{card.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Sales Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Monthly Sales</h2>
              <p className="text-sm text-slate-500 mt-1">Revenue trend over the year</p>
            </div>
            <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-2xl">+12.5%</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardDetails.salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" tickLine={false} stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <YAxis tickLine={false} stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Distribution</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue & Orders Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Weekly Revenue</h2>
              <p className="text-sm text-slate-500 mt-1">Last 7 days performance</p>
            </div>
            <Activity size={20} className="text-indigo-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardDetails.revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" tickLine={false} stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <YAxis tickLine={false} stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ fill: '#2563eb', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Order Status</h2>
              <p className="text-sm text-slate-500 mt-1">Current order breakdown</p>
            </div>
            <ShoppingBag size={20} className="text-indigo-600" />
          </div>
          <div className="space-y-4">
            {[
              { label: 'Completed', value: '284', percent: 75, color: 'from-emerald-600 to-teal-600' },
              { label: 'Processing', value: '96', percent: 25, color: 'from-blue-600 to-indigo-600' },
              { label: 'Pending', value: '42', percent: 11, color: 'from-yellow-500 to-orange-500' },
              { label: 'Cancelled', value: '18', percent: 5, color: 'from-red-600 to-pink-600' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className="text-sm font-bold text-slate-900">{item.value}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 font-semibold text-slate-700">Order ID</th>
                <th className="p-4 font-semibold text-slate-700">Customer</th>
                <th className="p-4 font-semibold text-slate-700">Items</th>
                <th className="p-4 font-semibold text-slate-700">Total</th>
                <th className="p-4 font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dashboardDetails.recentOrders.map((order, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-semibold text-slate-900">{order.id}</td>
                  <td className="p-4 text-slate-700">{order.name}</td>
                  <td className="p-4 text-slate-700">{order.items}</td>
                  <td className="p-4 font-bold text-slate-900">{order.total}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.color}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl shadow-lg p-6 border border-red-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-2xl bg-red-600 text-white">
              <AlertCircle size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Low Stock Alert</h3>
          </div>
          <div className="space-y-3">
            {products.filter(p => p.stock <= 25).slice(0, 5).map((item) => (
              <div key={item.sku} className="p-4 rounded-2xl bg-white border border-red-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500 mt-1">SKU: {item.sku}</p>
                  </div>
                  <span className="text-xs font-bold text-white bg-red-600 px-3 py-1 rounded-xl">{item.stock} left</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}