import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios";
import { CASHIER_ENDPOINTS } from "../api/config";
import {
  FaEdit,
  FaPlus,
  FaSave,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    stock: 0,
    price: "",
  });

  const [editingProductId, setEditingProductId] = useState(null);
  const [editProduct, setEditProduct] = useState({
    name: "",
    category: "",
    stock: 0,
    price: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await API.get(CASHIER_ENDPOINTS.PRODUCTS);
        setProducts(response.data?.products || response.data?.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Unable to load products",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = useMemo(
    () =>
      products.filter((product) =>
        product.name?.toLowerCase().includes(search.toLowerCase()),
      ),
    [products, search],
  );

  const resetNewProduct = () => {
    setNewProduct({ name: "", category: "", stock: 0, price: "" });
  };

  const handleAddProduct = () => {
    if (!newProduct.name.trim()) {
      setMessage("Enter a product name before adding.");
      return;
    }

    const createdProduct = {
      _id: `new-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category,
      stock: Number(newProduct.stock),
      sellingPrice: Number(newProduct.price),
      price: Number(newProduct.price),
    };

    setProducts((prev) => [createdProduct, ...prev]);
    setMessage("Product added successfully.");
    resetNewProduct();
    setShowAddForm(false);
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product._id || product.id);
    setEditProduct({
      name: product.name || "",
      category: product.category || "",
      stock: product.stock ?? 0,
      price: product.sellingPrice ?? product.price ?? "",
    });
  };

  const handleSaveEdit = () => {
    setProducts((prev) =>
      prev.map((product) =>
        product._id === editingProductId || product.id === editingProductId
          ? {
              ...product,
              name: editProduct.name,
              category: editProduct.category,
              stock: Number(editProduct.stock),
              sellingPrice: Number(editProduct.price),
              price: Number(editProduct.price),
            }
          : product,
      ),
    );
    setMessage("Product updated successfully.");
    setEditingProductId(null);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) =>
      prev.filter((product) => product._id !== productId && product.id !== productId),
    );
    setMessage("Product removed successfully.");
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditProduct({ name: "", category: "", stock: 0, price: "" });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-500">
            Manage inventory, filter categories, and edit product details.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Product"
            className="border rounded-2xl px-4 py-3 w-full sm:w-72"
          />
          <button
            type="button"
            onClick={() => setShowAddForm((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 text-white px-5 py-3 font-semibold"
          >
            {showAddForm ? (
              <>
                <FaTimes />
                Cancel
              </>
            ) : (
              <>
                <FaPlus />
                Add Product
              </>
            )}
          </button>
        </div>
      </div>

      {message ? (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          {message}
        </div>
      ) : null}

      {showAddForm ? (
        <div className="bg-white rounded-3xl shadow p-6 border border-slate-200">
          <div className="grid gap-4 md:grid-cols-4">
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="Product name"
              className="border rounded-2xl px-4 py-3"
            />
            <input
              type="text"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              placeholder="Category"
              className="border rounded-2xl px-4 py-3"
            />
            <input
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
              placeholder="Stock"
              className="border rounded-2xl px-4 py-3"
            />
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="Price"
              className="border rounded-2xl px-4 py-3"
            />
          </div>
          <button
            type="button"
            onClick={handleAddProduct}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 text-white px-6 py-3 font-semibold"
          >
            <FaSave />
            Save Product
          </button>
        </div>
      ) : null}

      <div className="bg-white rounded-3xl shadow overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading products...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">{error}</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Price</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length ? (
                filtered.map((product) => {
                  const productId = product._id || product.id;
                  const isEditing = editingProductId === productId;

                  return (
                    <tr key={productId} className="border-b last:border-b-0">
                      <td className="p-3">
                        {isEditing ? (
                          <input
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2"
                            value={editProduct.name}
                            onChange={(e) =>
                              setEditProduct({ ...editProduct, name: e.target.value })
                            }
                          />
                        ) : (
                          product.name
                        )}
                      </td>
                      <td className="p-3">
                        {isEditing ? (
                          <input
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2"
                            value={editProduct.category}
                            onChange={(e) =>
                              setEditProduct({ ...editProduct, category: e.target.value })
                            }
                          />
                        ) : (
                          product.category || "—"
                        )}
                      </td>
                      <td className="p-3">
                        {isEditing ? (
                          <input
                            type="number"
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2"
                            value={editProduct.stock}
                            onChange={(e) =>
                              setEditProduct({
                                ...editProduct,
                                stock: Number(e.target.value),
                              })
                            }
                          />
                        ) : (
                          product.stock ?? "—"
                        )}
                      </td>
                      <td className="p-3">
                        {isEditing ? (
                          <input
                            type="number"
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2"
                            value={editProduct.price}
                            onChange={(e) =>
                              setEditProduct({ ...editProduct, price: e.target.value })
                            }
                          />
                        ) : (
                          `₹${product.sellingPrice ?? product.price ?? "—"}`
                        )}
                      </td>
                      <td className="p-3">
                        {isEditing ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={handleSaveEdit}
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 text-white px-3 py-2 text-sm font-semibold"
                            >
                              <FaSave />
                              Update
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-300 text-slate-800 px-3 py-2 text-sm font-semibold"
                            >
                              <FaTimes />
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditProduct(product)}
                              aria-label="Edit product"
                              title="Edit"
                              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white text-sm"
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(productId)}
                              aria-label="Delete product"
                              title="Delete"
                              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-white text-sm"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Low Stock Alert</h2>
        <p className="text-gray-600">
          Review products with low stock levels and restock inventory.
        </p>
      </div>
    </div>
  );
}

export default Products;
