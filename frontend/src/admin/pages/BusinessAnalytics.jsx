import React, { useEffect, useMemo, useState } from "react";
import { Activity, BarChart3, Boxes, ShoppingBag, Truck } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getBusinessAnalytics } from "../controllers/analyticsController";

const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");

export default function BusinessAnalytics() {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAnalytics() {
      setLoading(true);
      setError("");

      try {
        const response = await getBusinessAnalytics();
        setAnalytics(response?.data?.analytics || {});
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  const cards = [
    { label: "Products", value: analytics.totalProducts, icon: Boxes, color: "text-blue-600 bg-blue-50" },
    { label: "Categories", value: analytics.totalCategories, icon: BarChart3, color: "text-indigo-600 bg-indigo-50" },
    { label: "Suppliers", value: analytics.totalSuppliers, icon: Truck, color: "text-emerald-600 bg-emerald-50" },
    { label: "Purchase Orders", value: analytics.totalPurchaseOrders, icon: ShoppingBag, color: "text-amber-600 bg-amber-50" },
  ];

  const chartData = useMemo(
    () => [
      { name: "Products", value: Number(analytics.totalProducts || 0) },
      { name: "Categories", value: Number(analytics.totalCategories || 0) },
      { name: "Suppliers", value: Number(analytics.totalSuppliers || 0) },
      { name: "Orders", value: Number(analytics.totalPurchaseOrders || 0) },
      { name: "Low Stock", value: Number(analytics.lowStockCount || 0) },
    ],
    [analytics],
  );

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Business Analytics</h1>
        <p className="text-sm text-slate-600 mt-1">Track inventory, purchasing, suppliers, and stock health.</p>
      </div>

      {error ? <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700">{error}</div> : null}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <h2 className="text-3xl font-bold text-slate-900 mt-2">{loading ? "..." : formatNumber(card.value)}</h2>
                </div>
                <div className={`rounded-2xl p-3 ${card.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <section className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Activity className="text-indigo-600" size={22} />
            <h2 className="text-xl font-bold text-slate-900">Operational Snapshot</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Stock Value</h2>
          <p className="text-3xl font-bold text-slate-900 mt-4">INR {formatNumber(analytics.totalStockValue)}</p>
          <p className="text-sm text-slate-500 mt-2">Low stock products: {formatNumber(analytics.lowStockCount)}</p>
          <div className="mt-6 space-y-3">
            {(analytics.recentOrders || []).slice(0, 5).map((order) => (
              <div key={order._id || order.id} className="rounded-2xl border border-slate-100 p-4">
                <p className="font-semibold text-slate-900">{order.orderNumber || order._id || "Purchase order"}</p>
                <p className="text-sm text-slate-500">Recent purchase activity</p>
              </div>
            ))}
            {!analytics.recentOrders?.length ? (
              <p className="text-sm text-slate-500">No recent purchase orders found.</p>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
