import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  createStock,
  deleteStock,
  getStocks,
  updateStock,
} from "../services/stockService";
import { getProducts } from "../services/productService";
import formatCurrency from "../utils/formatCurrency";
import {
  calculateLowStock,
  calculateOutOfStock,
  calculateStockValue,
  calculateTotalStock,
  getProductMinStock,
  getProductPrice,
  getProductStock,
  getProductStockStatus,
} from "../utils/stockCalculator";
import {
  FaBell,
  FaSearch,
  FaPlus,
  FaFilter,
  FaBoxOpen,
  FaExclamationTriangle,
  FaWarehouse,
  FaRupeeSign,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const initialStockForm = {
  productId: "",
  qty: "",
  reason: "",
};

const normalizeProducts = (response) => {
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response)) return response;
  return [];
};

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  const [formData, setFormData] = useState(initialStockForm);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const loadStocks = async () => {
    try {
      setIsLoading(true);
      setError("");

      const [stockData, productResponse] = await Promise.all([
        getStocks(),
        getProducts(),
      ]);

      setStocks(stockData);
      setProducts(normalizeProducts(productResponse));
    } catch (err) {
      setError(err.response?.data?.message || "Stock data load nahi hua");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStocks();
  }, []);

  const stockRows = useMemo(
    () =>
      stocks.map((item) => {
        const product = item.productId || {};
        const stock = getProductStock(item);
        const minStock = getProductMinStock(item);
        const price = getProductPrice(item);

        return {
          _id: item._id,
          id: product.sku || item._id,
          productId: product._id || item.productId,
          product: product.name || "Unknown Product",
          category: product.category || "Uncategorized",
          stock,
          minStock,
          reason: item.reason || "",
          value: formatCurrency(stock * price),
          status: getProductStockStatus({ stock, minStock }),
        };
      }),
    [stocks],
  );

  const filteredRows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return stockRows;
    }

    return stockRows.filter((item) =>
      [item.id, item.product, item.category].some((value) =>
        String(value).toLowerCase().includes(query),
      ),
    );
  }, [searchTerm, stockRows]);

  const stats = useMemo(() => {
    return {
      totalStock: calculateTotalStock(stocks),
      lowStock: calculateLowStock(stocks),
      outOfStock: calculateOutOfStock(stocks),
      totalValue: calculateStockValue(stocks),
    };
  }, [stocks]);

  const openAddModal = () => {
    setEditingStock(null);
    setFormData(initialStockForm);
    setIsModalOpen(true);
  };

  const openEditModal = (stock) => {
    setEditingStock(stock);
    setFormData({
      productId: stock.productId || "",
      qty: String(stock.stock || ""),
      reason: stock.reason || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSaving) return;
    setIsModalOpen(false);
    setEditingStock(null);
    setFormData(initialStockForm);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.productId || !formData.qty || !formData.reason.trim()) {
      setError("Product, quantity ani reason required aahe");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const payload = {
        productId: formData.productId,
        qty: Number(formData.qty),
        reason: formData.reason.trim(),
      };

      if (editingStock?._id) {
        await updateStock(editingStock._id, payload);
      } else {
        await createStock(payload);
      }

      setIsModalOpen(false);
      setEditingStock(null);
      setFormData(initialStockForm);
      await loadStocks();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Stock save nahi hua");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (stock) => {
    if (!stock?._id) return;

    const confirmed = window.confirm(`${stock.product} stock delete karaycha ka?`);
    if (!confirmed) return;

    try {
      setDeletingId(stock._id);
      setError("");
      await deleteStock(stock._id);
      await loadStocks();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Stock delete nahi hua");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Sidebar />

      <div className="ml-[280px] flex-1">
        <div className="bg-white px-10 py-6 border-b flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#061539]">
              Stock Management
            </h1>
            <p className="text-gray-500 mt-2">
              Monitor inventory stock levels and warehouse status
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative">
              <FaBell className="text-3xl text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                5
              </span>
            </div>

            <img
              src="/Rutika.jpg.jpeg"
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />
          </div>
        </div>

        <div className="p-10">
          <div className="grid grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Total Stock</p>
                  <h2 className="text-4xl font-bold mt-2">
                    {stats.totalStock.toLocaleString("en-IN")}
                  </h2>
                </div>
                <FaWarehouse className="text-5xl text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Low Stock</p>
                  <h2 className="text-4xl font-bold mt-2">{stats.lowStock}</h2>
                </div>
                <FaExclamationTriangle className="text-5xl text-orange-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Out Of Stock</p>
                  <h2 className="text-4xl font-bold mt-2">
                    {stats.outOfStock}
                  </h2>
                </div>
                <FaBoxOpen className="text-5xl text-red-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Stock Value</p>
                  <h2 className="text-3xl font-bold mt-2">
                    {formatCurrency(stats.totalValue)}
                  </h2>
                </div>
                <FaRupeeSign className="text-5xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm mb-8 flex justify-between items-center">
            <div className="relative w-[450px]">
              <FaSearch className="absolute top-4 left-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search product..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full bg-[#f4f7fe] border rounded-xl py-3 pl-12 pr-4 outline-none"
              />
            </div>

            <div className="flex gap-4">
              <button className="bg-gray-100 px-6 py-3 rounded-xl flex items-center gap-2 font-semibold">
                <FaFilter />
                Filter
              </button>

              <button
                type="button"
                onClick={openAddModal}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold"
              >
                <FaPlus />
                Add Stock
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b">
              <h2 className="text-2xl font-bold text-[#061539]">
                Stock Inventory
              </h2>
            </div>

            <table className="w-full">
              <thead className="bg-[#f8faff]">
                <tr>
                  <th className="p-5 text-left">Product ID</th>
                  <th className="p-5 text-left">Product</th>
                  <th className="p-5 text-left">Category</th>
                  <th className="p-5 text-left">Stock</th>
                  <th className="p-5 text-left">Min Stock</th>
                  <th className="p-5 text-left">Value</th>
                  <th className="p-5 text-left">Status</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {isLoading && (
                  <tr>
                    <td className="p-8 text-center text-gray-500" colSpan="8">
                      Stock loading...
                    </td>
                  </tr>
                )}

                {!isLoading && error && (
                  <tr>
                    <td className="p-8 text-center text-red-600" colSpan="8">
                      {error}
                    </td>
                  </tr>
                )}

                {!isLoading && !error && filteredRows.length === 0 && (
                  <tr>
                    <td className="p-8 text-center text-gray-500" colSpan="8">
                      Stock data available nahi hai
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  !error &&
                  filteredRows.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-5">{item.id}</td>
                      <td className="p-5 font-semibold">{item.product}</td>
                      <td className="p-5">{item.category}</td>
                      <td className="p-5">{item.stock}</td>
                      <td className="p-5">{item.minStock}</td>
                      <td className="p-5">{item.value}</td>

                      <td className="p-5">
                        <span
                          className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                            item.status === "In Stock"
                              ? "bg-green-100 text-green-600"
                              : item.status === "Low Stock"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-5">
                        <div className="flex justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => openEditModal(item)}
                            className="bg-blue-100 text-blue-600 p-3 rounded-xl"
                          >
                            <FaEdit />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            disabled={deletingId === item._id}
                            className="bg-red-100 text-red-600 p-3 rounded-xl disabled:opacity-50"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-10">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Stock Overview</h2>

              <div className="space-y-5">
                {["In Stock", "Low Stock", "Out Of Stock"].map((status) => {
                  const count = stockRows.filter((item) => item.status === status).length;
                  const percentage = stockRows.length
                    ? Math.round((count / stockRows.length) * 100)
                    : 0;
                  const color =
                    status === "In Stock"
                      ? "bg-green-500"
                      : status === "Low Stock"
                      ? "bg-yellow-500"
                      : "bg-red-500";

                  return (
                    <div key={status}>
                      <div className="flex justify-between mb-2">
                        <span>{status}</span>
                        <span>{percentage}%</span>
                      </div>

                      <div className="bg-gray-200 h-3 rounded-full">
                        <div
                          className={`${color} h-3 rounded-full`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">
                Recent Stock Activities
              </h2>

              <div className="space-y-4">
                {stocks.slice(0, 4).map((item) => (
                  <div key={item._id} className="bg-blue-50 p-4 rounded-xl">
                    {item.qty} units - {item.productId?.name || "Unknown Product"}
                  </div>
                ))}

                {stocks.length === 0 && (
                  <div className="bg-gray-50 p-4 rounded-xl text-gray-500">
                    Recent stock activity nahi hai
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="border-b px-6 py-5">
              <h2 className="text-2xl font-bold text-[#061539]">
                {editingStock ? "Edit Stock" : "Add Stock"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Product
                </label>
                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                  required
                >
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name} {product.sku ? `(${product.sku})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="qty"
                  min="1"
                  value={formData.qty}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Reason
                </label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleFormChange}
                  placeholder="Initial stock, purchase, adjustment..."
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : editingStock ? "Update Stock" : "Add Stock"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stock;
