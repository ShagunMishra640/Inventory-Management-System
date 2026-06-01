import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../controllers/productController";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const res = await getProducts();
      const data = res?.data ?? res;
      setProducts(Array.isArray(data) ? data : (data.data ?? []));
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((p) => p.filter((x) => (x._id || x.id) !== id));
      alert("Product deleted successfully");
    } catch (err) {
      alert("Failed to delete");
    }
  }

  function handleAddProduct() {
    navigate('/admin/add-product');
  }

  function handleEditProduct(id) {
    navigate(`/admin/edit-product/${id}`);
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-600">Manage products and inventory.</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            placeholder="Search product..."
            className="border border-slate-200 rounded-2xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button onClick={handleAddProduct} className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-2 flex items-center gap-2 font-bold shadow-lg transition-all">
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Category</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-4" colSpan={6}>
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="p-4 text-red-600" colSpan={6}>
                  {error}
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td className="p-4" colSpan={6}>
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id || product.id}
                  className="border-b last:border-b-0 hover:bg-slate-50"
                >
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.sku ?? product._id ?? product.id}</td>
                  <td className="p-3">{product.category ?? "—"}</td>
                  <td className="p-3">{product.stock ?? 0}</td>
                  <td className="p-3">₹{product.sellingPrice ?? product.price ?? "—"}</td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => handleEditProduct(product._id || product.id)} className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 text-sm flex items-center gap-2 transition-colors">
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id || product.id)}
                      className="rounded-xl bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm flex items-center gap-2 transition-colors"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
