import { useEffect, useMemo, useState } from "react";
import {
  FaExclamationTriangle,
  FaBoxOpen,
} from "react-icons/fa";
import { getLowStockProducts } from "../services/stockService";

const getStockStatus = (stock, minStock) => {
  if (stock <= Math.max(1, Math.floor(minStock / 2))) {
    return "Critical";
  }

  return "Low Stock";
};

export default function LowStockAlert() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadLowStockProducts = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getLowStockProducts();

        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              err.message ||
              "Low stock products load nahi zale",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadLowStockProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const lowStockProducts = useMemo(
    () =>
      products.map((product, index) => {
        const stock = Number(product.stock ?? product.quantity ?? 0);
        const minStock = Number(product.minStock ?? product.reorderLevel ?? 10);

        return {
          id:
            product.sku ||
            product.id ||
            `PRD${String(index + 1).padStart(3, "0")}`,
          name: product.name || product.product || "Unknown Product",
          category: product.category || "Uncategorized",
          stock,
          minStock,
          status: getStockStatus(stock, minStock),
        };
      }),
    [products],
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaExclamationTriangle className="text-red-500 text-2xl" />

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Low Stock Products
            </h2>

            <p className="text-gray-500 text-sm">
              Products that need restocking
            </p>
          </div>
        </div>

        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
          {isLoading ? "..." : `${lowStockProducts.length} Items`}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-3 text-gray-600">
                Product
              </th>

              <th className="text-left py-3 text-gray-600">
                Category
              </th>

              <th className="text-left py-3 text-gray-600">
                Stock
              </th>

              <th className="text-left py-3 text-gray-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td className="py-6 text-center text-gray-500" colSpan="4">
                  Low stock loading...
                </td>
              </tr>
            )}

            {!isLoading && error && (
              <tr>
                <td className="py-6 text-center text-red-600" colSpan="4">
                  {error}
                </td>
              </tr>
            )}

            {!isLoading && !error && lowStockProducts.length === 0 && (
              <tr>
                <td className="py-6 text-center text-gray-500" colSpan="4">
                  Low stock products not available 
                </td>
              </tr>
            )}

            {!isLoading && !error && lowStockProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <FaBoxOpen className="text-orange-600" />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {product.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {product.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-4 text-gray-600">
                  {product.category}
                </td>

                <td className="py-4 font-semibold text-red-600">
                  {product.stock}
                </td>

                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.status === "Critical"
                        ? "bg-red-100 text-red-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
