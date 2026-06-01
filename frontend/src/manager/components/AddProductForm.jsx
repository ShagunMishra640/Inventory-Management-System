import { useState } from "react";
import {
  FaBoxOpen,
  FaSave,
  FaUndo,
} from "react-icons/fa";
import { createProduct } from "../services/productService";
import { createStock } from "../services/stockService";

const emptyProduct = {
  name: "",
  sku: "",
  category: "",
  brand: "",
  sellingPrice: "",
  costPrice: "",
  stock: "",
  minStock: "",
  warehouse: "",
  supplier: "",
  supplierContact: "",
  image: "",
  description: "",
  discount: "",
  tags: "",
};

export default function AddProductForm({ onSaved }) {
  const [product, setProduct] = useState(emptyProduct);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProduct((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setProduct(emptyProduct);
    setMessage("");
    setError("");
  };

  const validateProduct = () => {
    if (!product.name.trim()) return "Product name required";
    if (!product.sku.trim()) return "SKU required";
    if (!product.sellingPrice) return "Selling price required";
    if (!product.costPrice) return "Cost price required";

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationMessage = validateProduct();

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    const payload = {
      name: product.name.trim(),
      sku: product.sku.trim(),
      category: product.category.trim(),
      brand: product.brand.trim(),
      sellingPrice: Number(product.sellingPrice),
      costPrice: Number(product.costPrice),
      stock: Number(product.stock || 0),
      minStock: Number(product.minStock || 10),
      warehouse: product.warehouse.trim(),
      supplier: product.supplier.trim(),
      supplierContact: product.supplierContact.trim(),
      image: product.image.trim(),
      description: product.description.trim(),
      discount: Number(product.discount || 0),
      tags: product.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      setIsSaving(true);
      setMessage("");
      setError("");

      const response = await createProduct(payload);
      const createdProduct = response.data;

      if (createdProduct?._id && payload.stock > 0) {
        await createStock({
          productId: createdProduct._id,
          qty: payload.stock,
          reason: "Initial stock",
        });
      }

      setMessage("Product added successfully");
      setProduct(emptyProduct);
      onSaved?.(createdProduct);
    } catch (err) {
      setError(err.response?.data?.message || "Product save failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">
      <div className="flex items-center gap-3 mb-6">
        <FaBoxOpen className="text-3xl text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
      </div>

      {message && (
        <div className="mb-5 bg-green-100 text-green-700 px-5 py-3 rounded-xl font-semibold">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-5 bg-red-100 text-red-700 px-5 py-3 rounded-xl font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter Product Name"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">SKU</label>
            <input
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              placeholder="Enter SKU"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Electronics"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              placeholder="Apple, HP, Dell"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Cost Price</label>
            <input
              type="number"
              name="costPrice"
              min="0"
              value={product.costPrice}
              onChange={handleChange}
              placeholder="Enter Cost Price"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Selling Price</label>
            <input
              type="number"
              name="sellingPrice"
              min="0"
              value={product.sellingPrice}
              onChange={handleChange}
              placeholder="Enter Selling Price"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              min="0"
              value={product.stock}
              onChange={handleChange}
              placeholder="Enter Stock"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Minimum Stock</label>
            <input
              type="number"
              name="minStock"
              min="0"
              value={product.minStock}
              onChange={handleChange}
              placeholder="10"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Warehouse</label>
            <input
              type="text"
              name="warehouse"
              value={product.warehouse}
              onChange={handleChange}
              placeholder="Warehouse A"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Discount (%)</label>
            <input
              type="number"
              name="discount"
              min="0"
              value={product.discount}
              onChange={handleChange}
              placeholder="0"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Supplier</label>
            <input
              type="text"
              name="supplier"
              value={product.supplier}
              onChange={handleChange}
              placeholder="Supplier Name"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Supplier Contact</label>
            <input
              type="text"
              name="supplierContact"
              value={product.supplierContact}
              onChange={handleChange}
              placeholder="Contact Number"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Product Image URL</label>
          <input
            type="url"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Paste Image URL"
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Tags</label>
          <input
            type="text"
            name="tags"
            value={product.tags}
            onChange={handleChange}
            placeholder="Gaming, Laptop, Electronics"
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            rows="4"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter Product Description"
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 disabled:opacity-60"
          >
            <FaSave />
            {isSaving ? "Saving..." : "Add Product"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl flex items-center gap-2"
          >
            <FaUndo />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
