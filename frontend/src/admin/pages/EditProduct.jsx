import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { getProduct, updateProduct } from "../controllers/productController";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    stock: "",
    sellingPrice: "",
    costPrice: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError("");

      try {
        const response = await getProduct(id);
        const product = response?.data?.data || response?.data?.product || response?.data || {};

        setFormData({
          name: product.name || "",
          sku: product.sku || product.id || "",
          category: product.category || "",
          stock: product.stock ?? "",
          sellingPrice: product.sellingPrice ?? product.price ?? "",
          costPrice: product.costPrice ?? "",
          image: product.image || "",
        });
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await updateProduct(id, {
        ...formData,
        stock: Number(formData.stock),
        sellingPrice: Number(formData.sellingPrice),
        costPrice: Number(formData.costPrice),
      });
      navigate("/admin/product");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Edit Product</h1>
          <p className="text-slate-600">Update product details for inventory and POS.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/admin/product")}
          className="rounded-2xl bg-white border border-slate-200 px-5 py-2.5 font-bold text-slate-700 flex items-center gap-2 shadow-sm hover:bg-slate-50"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 font-medium text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 text-slate-600">
          Loading product...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 space-y-5 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="space-y-2">
              <span className="block text-sm font-bold text-slate-900">Product Name</span>
              <input name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label className="space-y-2">
              <span className="block text-sm font-bold text-slate-900">SKU</span>
              <input name="sku" value={formData.sku} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label className="space-y-2">
              <span className="block text-sm font-bold text-slate-900">Category</span>
              <input name="category" value={formData.category} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label className="space-y-2">
              <span className="block text-sm font-bold text-slate-900">Image URL</span>
              <input name="image" value={formData.image} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label className="space-y-2">
              <span className="block text-sm font-bold text-slate-900">Stock</span>
              <input name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label className="space-y-2">
              <span className="block text-sm font-bold text-slate-900">Selling Price</span>
              <input name="sellingPrice" type="number" min="0" value={formData.sellingPrice} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label className="space-y-2">
              <span className="block text-sm font-bold text-slate-900">Cost Price</span>
              <input name="costPrice" type="number" min="0" value={formData.costPrice} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 font-bold text-white shadow-lg hover:from-indigo-700 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-300 flex items-center gap-2"
          >
            <Save size={18} /> {saving ? "Saving..." : "Update Product"}
          </button>
        </form>
      )}
    </div>
  );
}
