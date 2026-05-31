import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../../api/axios";
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

const getStockStatus = (stock, minStock = 10) => {
  if (stock <= 0) {
    return "Out Of Stock";
  }

  if (stock <= minStock) {
    return "Low Stock";
  }

  return "In Stock";
};

const formatCurrency = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-IN")}`;

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await API.get("/stocks");
        setStocks(Array.isArray(response.data?.data) ? response.data.data : []);
      } catch (err) {
        setError(err.response?.data?.message || "Stock data load nahi hua");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const stockRows = useMemo(
    () =>
      stocks.map((item) => {
        const product = item.productId || {};
        const stock = Number(item.qty || 0);
        const minStock = Number(product.minStock || 10);
        const price = Number(product.sellingPrice || 0);

        return {
          id: product.sku || item._id,
          product: product.name || "Unknown Product",
          category: product.category || "Uncategorized",
          stock,
          minStock,
          value: formatCurrency(stock * price),
          status: getStockStatus(stock, minStock),
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
    const totalStock = stockRows.reduce((sum, item) => sum + item.stock, 0);
    const lowStock = stockRows.filter((item) => item.status === "Low Stock").length;
    const outOfStock = stockRows.filter(
      (item) => item.status === "Out Of Stock",
    ).length;
    const totalValue = stocks.reduce((sum, item) => {
      const price = Number(item.productId?.sellingPrice || 0);
      return sum + Number(item.qty || 0) * price;
    }, 0);

    return {
      totalStock,
      lowStock,
      outOfStock,
      totalValue,
    };
  }, [stockRows, stocks]);

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

              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold">
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
                          <button className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                            <FaEdit />
                          </button>

                          <button className="bg-red-100 text-red-600 p-3 rounded-xl">
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
    </div>
  );
};

export default Stock;
