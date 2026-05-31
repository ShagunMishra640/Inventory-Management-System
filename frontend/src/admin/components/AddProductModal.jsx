import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ENDPOINTS } from '../api/config';

export default function AddProductModal({ isOpen, onClose }) {
  const { fetchProducts } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Electronics',
    price: '',
    stock: '',
    reorder: '10'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(ENDPOINTS.PRODUCTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          sku: formData.sku,
          category: formData.category,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          reorderLevel: parseInt(formData.reorder)
        })
      });

      if (!response.ok) {
        throw new Error('Submission failed.');
      }

      await fetchProducts();

      setFormData({
        name: '',
        sku: '',
        category: 'Electronics',
        price: '',
        stock: '',
        reorder: '10'
      });

      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">

      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden border">

        {/* HEADER */}
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg">Add New Product</h2>

          {/* ❌ replaced X icon */}
          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">

          {/* NAME */}
          <div>
            <label className="block font-medium">Product Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg mt-1"
              required
            />
          </div>

          {/* SKU + CATEGORY */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block font-medium">SKU</label>
              <input
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1"
                required
              />
            </div>

          </div>

          {/* PRICE / STOCK / REORDER */}
          <div className="grid grid-cols-3 gap-4">

            <div>
              <label className="block font-medium">Price</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Stock</label>
              <input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Reorder</label>
              <input
                name="reorder"
                type="number"
                value={formData.reorder}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1"
                required
              />
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400"
            >
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}