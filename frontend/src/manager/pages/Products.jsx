import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import profileImage from "../../assets/rutika-profile.jpeg";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/productService";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaFilter,
  FaBell,
} from "react-icons/fa";

const emptyForm = {
  name: "",
  sku: "",
  category: "",
  brand: "",
  sellingPrice: "",
  costPrice: "",
  image: "",
  description: "",
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const productImageFallbacks = {
  laptop:
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=240&q=80",
  mobile:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=240&q=80",
  keyboard:
    "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=240&q=80",
  electronics:
    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=240&q=80",
  default:
    "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=240&q=80",
};

const apiAssetOrigin = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://inventory-management-system-b06g.onrender.com/api"
)
  .replace(/\/api\/?$/, "")
  .replace(/\/$/, "");

const getFallbackProductImage = (product) => {
  const text = `${product.name || ""} ${product.category || ""}`.toLowerCase();

  if (text.includes("keyboard")) return productImageFallbacks.keyboard;
  if (text.includes("mobile") || text.includes("phone")) return productImageFallbacks.mobile;
  if (text.includes("laptop")) return productImageFallbacks.laptop;
  if (text.includes("electronic")) return productImageFallbacks.electronics;

  return productImageFallbacks.default;
};

const resolveProductImage = (product) => {
  const rawImage = String(product.image || "").trim();

  if (/^(https?:|data:|blob:)/i.test(rawImage)) return rawImage;

  if (rawImage.startsWith("/uploads/") || rawImage.startsWith("uploads/")) {
    return `${apiAssetOrigin}/${rawImage.replace(/^\/+/, "")}`;
  }

  if (/\.(png|jpe?g|webp|gif|svg)$/i.test(rawImage)) {
    return `${apiAssetOrigin}/uploads/${rawImage.replace(/^\/+/, "")}`;
  }

  return getFallbackProductImage(product);
};

const getProductStatus = (product) => {
  const stock = Number(product.stock || product.quantity || 0);

  if (stock <= 0) {
    return "Out of Stock";
  }

  if (stock <= 20) {
    return "Low Stock";
  }

  return "In Stock";
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getProducts();
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Products load failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const productRows = useMemo(
    () =>
      products.map((product, index) => ({
        ...product,
        displayId: product.sku || `#P${String(index + 1).padStart(3, "0")}`,
        image: resolveProductImage(product),
        fallbackImage: getFallbackProductImage(product),
        price: formatCurrency(product.sellingPrice),
        stock: Number(product.stock || product.quantity || 0),
        status: getProductStatus(product),
      })),
    [products],
  );

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          productRows
            .map((product) => product.category)
            .filter((category) => Boolean(category)),
        ),
      ),
    [productRows],
  );

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return productRows.filter((product) => {
      const matchesSearch =
        !query ||
        [product.name, product.sku, product.category, product.brand].some(
          (value) => String(value || "").toLowerCase().includes(query),
        );
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [categoryFilter, productRows, searchTerm, statusFilter]);

  const stats = useMemo(
    () => ({
      total: productRows.length,
      inStock: productRows.filter((product) => product.status === "In Stock")
        .length,
      lowStock: productRows.filter((product) => product.status === "Low Stock")
        .length,
      outOfStock: productRows.filter(
        (product) => product.status === "Out of Stock",
      ).length,
    }),
    [productRows],
  );

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId("");
  };

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.sku.trim()) {
      setError("Product name and SKU are required");
      return;
    }

    if (!formData.sellingPrice || !formData.costPrice) {
      setError("Selling price and cost price are required");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      setMessage("");

      const payload = {
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        category: formData.category.trim(),
        brand: formData.brand.trim(),
        sellingPrice: Number(formData.sellingPrice),
        costPrice: Number(formData.costPrice),
        image: formData.image.trim(),
        description: formData.description.trim(),
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        setMessage("Product updated successfully");
      } else {
        await createProduct(payload);
        setMessage("Product added successfully");
      }

      resetForm();
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Product save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || "",
      sku: product.sku || "",
      category: product.category || "",
      brand: product.brand || "",
      sellingPrice: product.sellingPrice || "",
      costPrice: product.costPrice || "",
      image: product.image || "",
      description: product.description || "",
    });
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!id) {
      setError("Product id missing aahe");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setMessage("");
      await deleteProduct(id);
      setProducts((current) =>
        current.filter((product) => product._id !== id),
      );
      if (editingId === id) {
        resetForm();
      }
      setMessage("Product deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Product delete failed");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">
      <Sidebar />

      <div className="ml-[280px] w-full">
        <div className="bg-white px-10 py-6 flex justify-between items-center border-b">
          <div className="relative w-[420px]">
            <FaSearch className="absolute top-5 left-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full bg-[#f5f7fb] rounded-2xl pl-14 pr-5 py-4 outline-none border border-gray-200 text-lg"
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="relative">
              <FaBell className="text-3xl text-gray-600" />

              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center">
                8
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={profileImage}
                alt="Rutika Pujari"
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold text-xl">Rutika Pujari</h3>
                <p className="text-gray-500">Manager</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-6xl font-bold text-[#061539]">Products</h1>

              <p className="text-gray-500 text-xl mt-3">
                Manage and organize all your products in one place.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-105 transition-all duration-300 text-white px-8 py-5 rounded-2xl flex items-center gap-4 text-xl font-semibold shadow-xl"
            >
              <FaPlus />
              Add New Product
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 grid grid-cols-4 gap-4 mb-8 shadow-sm"
          >
            <input
              type="text"
              name="name"
              placeholder="Product name"
              value={formData.name}
              onChange={handleChange}
              className="bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200"
            />

            <input
              type="text"
              name="sku"
              placeholder="SKU"
              value={formData.sku}
              onChange={handleChange}
              className="bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200"
            />

            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              className="bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200"
            />

            <input
              type="number"
              name="sellingPrice"
              placeholder="Selling price"
              value={formData.sellingPrice}
              onChange={handleChange}
              className="bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200"
            />

            <input
              type="number"
              name="costPrice"
              placeholder="Cost price"
              value={formData.costPrice}
              onChange={handleChange}
              className="bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200"
            />

            <input
              type="url"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-7 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold shadow-xl disabled:opacity-60"
              >
                <FaPlus />
                {isSaving ? "Saving..." : editingId ? "Update" : "Add"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-100 text-gray-700 px-7 py-4 rounded-2xl font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-4 bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200 resize-none"
              rows="3"
            />
          </form>

          {message && (
            <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl mb-6 font-semibold">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 px-5 py-3 rounded-2xl mb-6 font-semibold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-4 gap-8 mb-10">
            {[
              { title: "Total Products", value: stats.total, color: "blue" },
              { title: "In Stock", value: stats.inStock, color: "green" },
              { title: "Low Stock", value: stats.lowStock, color: "orange" },
              { title: "Out of Stock", value: stats.outOfStock, color: "red" },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 ${
                    card.color === "blue"
                      ? "bg-blue-100 text-blue-600"
                      : card.color === "green"
                      ? "bg-green-100 text-green-600"
                      : card.color === "orange"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <FaPlus />
                </div>

                <p className="text-gray-500 text-xl">{card.title}</p>
                <h1 className="text-5xl font-bold mt-3">{card.value}</h1>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-6 flex items-center gap-5 mb-8 shadow-sm">
            <div className="relative flex-1">
              <FaSearch className="absolute top-5 left-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search by product name, SKU, category..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full bg-[#f5f7fb] rounded-2xl pl-14 pr-5 py-4 outline-none border border-gray-200 text-lg"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="px-6 py-4 rounded-2xl border border-gray-200 bg-[#f5f7fb] text-lg"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="px-6 py-4 rounded-2xl border border-gray-200 bg-[#f5f7fb] text-lg"
            >
              <option value="all">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            <button
              type="button"
              className="px-8 py-4 rounded-2xl border border-gray-200 bg-[#f5f7fb] flex items-center gap-3 text-lg"
            >
              <FaFilter />
              Filter
            </button>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-[#f8f9fc] text-gray-500 text-lg">
                <tr>
                  <th className="p-6 text-left">PRODUCT</th>
                  <th className="p-6 text-left">CATEGORY</th>
                  <th className="p-6 text-left">PRICE</th>
                  <th className="p-6 text-left">STOCK</th>
                  <th className="p-6 text-left">STATUS</th>
                  <th className="p-6 text-left">ACTION</th>
                </tr>
              </thead>

              <tbody>
                {isLoading && (
                  <tr>
                    <td className="p-8 text-center text-gray-500" colSpan="6">
                      Products loading...
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="border-t hover:bg-[#f8f9fc] transition-all duration-300"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-5">
                          <img
                            src={product.image}
                            alt={product.name}
                            onError={(event) => {
                              event.currentTarget.src = product.fallbackImage;
                            }}
                            className="w-20 h-20 rounded-xl object-cover bg-slate-100"
                          />

                          <div>
                            <h3 className="font-bold text-2xl text-[#061539]">
                              {product.name}
                            </h3>

                            <p className="text-gray-500 mt-2">
                              {product.displayId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-6">
                        <span className="bg-purple-100 text-purple-700 px-5 py-3 rounded-xl text-lg">
                          {product.category || "Uncategorized"}
                        </span>
                      </td>

                      <td className="p-6 text-2xl font-semibold">
                        {product.price}
                      </td>

                      <td
                        className={`p-6 text-2xl font-bold ${
                          product.stock > 20
                            ? "text-green-600"
                            : product.stock === 0
                            ? "text-red-500"
                            : "text-orange-500"
                        }`}
                      >
                        {product.stock}
                      </td>

                      <td className="p-6">
                        <span
                          className={`px-5 py-3 rounded-xl text-lg font-medium ${
                            product.status === "In Stock"
                              ? "bg-green-100 text-green-700"
                              : product.status === "Low Stock"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>

                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => handleEdit(product)}
                            className="w-14 h-14 rounded-xl border flex items-center justify-center text-blue-600 hover:bg-blue-50"
                          >
                            <FaEdit />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(product._id)}
                            disabled={deletingId === product._id}
                            className="w-14 h-14 rounded-xl border flex items-center justify-center text-red-500 hover:bg-red-50 disabled:opacity-60"
                          >
                            <FaTrash />
                          </button>

                          <button
                            type="button"
                            className="w-14 h-14 rounded-xl border flex items-center justify-center text-gray-500 hover:bg-gray-50"
                          >
                            <FaEllipsisV />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                {!isLoading && filteredProducts.length === 0 && (
                  <tr>
                    <td className="p-8 text-center text-gray-500" colSpan="6">
                      Product data is not available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center p-8 border-t">
              <p className="text-gray-500 text-lg">
                Showing {filteredProducts.length} of {productRows.length}{" "}
                products
              </p>

              <div className="flex items-center gap-4">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`w-14 h-14 rounded-xl text-lg font-semibold ${
                      page === 1 ? "bg-blue-600 text-white" : "border"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
