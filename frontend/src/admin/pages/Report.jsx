import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Boxes,
  Download,
  PackageCheck,
  RefreshCw,
  ShoppingBag,
  Truck,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getLowStockReport,
  getPurchaseReport,
  getStockReport,
  getSupplierReport,
} from "../controllers/reportController";

const currency = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
  style: "currency",
  currency: "INR",
});

const statusColors = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"];

const getArray = (response, key) => {
  const data = response?.data || {};
  return Array.isArray(data) ? data : data[key] || data.data || [];
};

export default function Report() {
  const [products, setProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    setLoading(true);
    setError("");

    try {
      const [stockResponse, lowStockResponse, purchaseResponse, supplierResponse] =
        await Promise.all([
          getStockReport(),
          getLowStockReport(),
          getPurchaseReport(),
          getSupplierReport(),
        ]);

      setProducts(getArray(stockResponse, "products"));
      setLowStockProducts(getArray(lowStockResponse, "lowStockProducts"));
      setPurchases(getArray(purchaseResponse, "purchases"));
      setSuppliers(getArray(supplierResponse, "suppliers"));
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  }

  const totalStockValue = useMemo(
    () =>
      products.reduce(
        (sum, item) =>
          sum + Number(item.sellingPrice || item.price || 0) * Number(item.stock || 0),
        0,
      ),
    [products],
  );

  const categoryData = useMemo(() => {
    const grouped = products.reduce((acc, product) => {
      const category = product.category?.name || product.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + Number(product.stock || 0);
      return acc;
    }, {});

    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [products]);

  const purchaseTrend = useMemo(() => {
    const grouped = purchases.reduce((acc, purchase) => {
      const date = purchase.createdAt ? new Date(purchase.createdAt) : new Date();
      const name = date.toLocaleString("en-US", { month: "short" });
      const total = Number(purchase.totalAmount || purchase.total || purchase.amount || 0);
      acc[name] = (acc[name] || 0) + total;
      return acc;
    }, {});

    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [purchases]);

  const stockHealth = [
    { name: "Healthy Stock", value: Math.max(products.length - lowStockProducts.length, 0) },
    { name: "Low Stock", value: lowStockProducts.length },
  ];

  const reportCards = [
    {
      label: "Total Products",
      value: products.length,
      note: "Inventory records",
      icon: Boxes,
      tone: "from-blue-600 to-indigo-600",
    },
    {
      label: "Low Stock",
      value: lowStockProducts.length,
      note: "Needs attention",
      icon: AlertTriangle,
      tone: "from-amber-500 to-orange-600",
    },
    {
      label: "Suppliers",
      value: suppliers.length,
      note: "Vendor network",
      icon: Truck,
      tone: "from-emerald-600 to-teal-600",
    },
    {
      label: "Stock Value",
      value: currency.format(totalStockValue),
      note: "Current valuation",
      icon: ShoppingBag,
      tone: "from-violet-600 to-fuchsia-600",
    },
  ];

  const handleExport = () => {
    const rows = [
      ["Name", "SKU", "Category", "Stock", "Selling Price", "Cost Price"],
      ...products.map((product) => [
        product.name || "",
        product.sku || "",
        product.category?.name || product.category || "",
        product.stock ?? 0,
        product.sellingPrice ?? product.price ?? "",
        product.costPrice ?? "",
      ]),
    ];
    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "admin-inventory-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-600 text-sm mt-1">
            Track stock health, purchasing activity, and supplier coverage.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={fetchReports}
            className="rounded-2xl bg-white border border-slate-200 px-5 py-2.5 font-bold text-slate-700 shadow-sm hover:bg-slate-50 flex items-center gap-2"
          >
            <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 font-bold text-white shadow-lg hover:from-indigo-700 hover:to-blue-700 flex items-center gap-2"
          >
            <Download size={17} />
            Export
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 font-medium text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {reportCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{card.label}</p>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">{loading ? "..." : card.value}</h2>
                  <p className="text-xs text-slate-400 mt-1">{card.note}</p>
                </div>
                <div className={`rounded-2xl bg-gradient-to-br ${card.tone} p-3 text-white shadow-lg`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 rounded-3xl bg-white border border-slate-100 p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Stock by Category</h2>
              <p className="text-sm text-slate-500 mt-1">Available quantity grouped by category.</p>
            </div>
            <BarChart3 className="text-indigo-600" size={24} />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl bg-white border border-slate-100 p-6 shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Stock Health</h2>
            <p className="text-sm text-slate-500 mt-1">Low stock versus healthy items.</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stockHealth} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={4}>
                  {stockHealth.map((entry, index) => (
                    <Cell key={entry.name} fill={statusColors[index % statusColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="rounded-3xl bg-white border border-slate-100 p-6 shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Purchase Trend</h2>
            <p className="text-sm text-slate-500 mt-1">Purchase amount grouped by month.</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={purchaseTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => currency.format(value)} />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl bg-white border border-slate-100 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Low Stock Items</h2>
              <p className="text-sm text-slate-500 mt-1">Products below minimum threshold.</p>
            </div>
            <PackageCheck className="text-emerald-600" size={24} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-bold">Product</th>
                  <th className="px-6 py-4 font-bold">SKU</th>
                  <th className="px-6 py-4 font-bold">Stock</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lowStockProducts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                      No low stock products found.
                    </td>
                  </tr>
                ) : (
                  lowStockProducts.slice(0, 6).map((product) => (
                    <tr key={product._id || product.id || product.sku} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-900">{product.name}</td>
                      <td className="px-6 py-4 text-slate-600">{product.sku || "-"}</td>
                      <td className="px-6 py-4 text-slate-900 font-bold">{product.stock ?? 0}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                          Reorder
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
