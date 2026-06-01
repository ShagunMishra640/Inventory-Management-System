import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import SupplierCard from "../components/SupplierCard";
import {
  FaBell,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaRupeeSign,
  FaTimes,
} from "react-icons/fa";
import {
  createSupplier,
  deleteSupplier,
  getSuppliers,
  updateSupplier,
} from "../services/supplierService";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  products: 0,
  rating: 0,
  status: "Active",
};

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(emptyForm);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getSuppliers();
      setSuppliers(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load suppliers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const filteredSuppliers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return suppliers;

    return suppliers.filter((supplier) =>
      [supplier.name, supplier.email, supplier.phone, supplier.status]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [search, suppliers]);

  const activeSuppliers = suppliers.filter(
    (supplier) => supplier.status === "Active"
  ).length;

  const averageRating =
    suppliers.length === 0
      ? 0
      : (
          suppliers.reduce(
            (total, supplier) => total + Number(supplier.rating || 0),
            0
          ) / suppliers.length
        ).toFixed(1);

  const topSupplier =
    suppliers
      .slice()
      .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))[0]
      ?.name || "Not available";

  const openCreateModal = () => {
    setEditingSupplier(null);
    setFormData(emptyForm);
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name || "",
      email: supplier.email || "",
      phone: supplier.phone || "",
      products: supplier.products || 0,
      rating: supplier.rating || 0,
      status: supplier.status || "Active",
    });
    setError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
    setFormData(emptyForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        name === "products" || name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (editingSupplier) {
        const response = await updateSupplier(editingSupplier._id, formData);
        setSuppliers((current) =>
          current.map((supplier) =>
            supplier._id === editingSupplier._id ? response.data : supplier
          )
        );
      } else {
        const response = await createSupplier(formData);
        setSuppliers((current) => [response.data, ...current]);
      }

      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save supplier");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (supplier) => {
    const confirmed = window.confirm(
      `Delete ${supplier.name}? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(supplier._id);
      setError("");
      await deleteSupplier(supplier._id);
      setSuppliers((current) =>
        current.filter((item) => item._id !== supplier._id)
      );
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete supplier");
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
            <h1 className="text-5xl font-bold text-[#061539]">Suppliers</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Manage vendors, suppliers and procurement partners
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <FaBell className="text-3xl text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-6 w-6 rounded-full flex items-center justify-center">
                4
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
          {error && (
            <div className="mb-6 bg-red-50 text-red-600 px-5 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Total Suppliers</p>
                  <h2 className="text-4xl font-bold mt-2">
                    {loading ? "..." : suppliers.length}
                  </h2>
                </div>
                <FaUsers className="text-5xl text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Active</p>
                  <h2 className="text-4xl font-bold mt-2">
                    {loading ? "..." : activeSuppliers}
                  </h2>
                </div>
                <FaCheckCircle className="text-5xl text-green-600" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Pending Suppliers</p>
                  <h2 className="text-4xl font-bold mt-2">
                    {loading
                      ? "..."
                      : suppliers.filter(
                          (supplier) => supplier.status === "Pending"
                        ).length}
                  </h2>
                </div>
                <FaClock className="text-5xl text-orange-500" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Purchase Value</p>
                  <h2 className="text-3xl font-bold mt-2">Rs 18.5L</h2>
                </div>
                <FaRupeeSign className="text-5xl text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm mb-8 flex justify-between items-center">
            <div className="relative w-[450px]">
              <FaSearch className="absolute top-4 left-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search supplier..."
                className="w-full bg-[#f4f7fe] border rounded-xl py-3 pl-12 pr-4 outline-none"
              />
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <FaPlus />
              Add Supplier
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-10">
            {filteredSuppliers.map((supplier) => (
              <SupplierCard
                key={supplier._id}
                supplier={supplier}
                onEdit={openEditModal}
                onDelete={handleDelete}
                isDeleting={deletingId === supplier._id}
              />
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b">
              <h2 className="text-2xl font-bold">Supplier Directory</h2>
            </div>

            <table className="w-full">
              <thead className="bg-[#f8faff]">
                <tr>
                  <th className="p-5 text-left">Supplier</th>
                  <th className="p-5 text-left">Contact</th>
                  <th className="p-5 text-left">Email</th>
                  <th className="p-5 text-left">Products</th>
                  <th className="p-5 text-left">Rating</th>
                  <th className="p-5 text-left">Status</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td className="p-5 text-center text-gray-500" colSpan="7">
                      Loading suppliers...
                    </td>
                  </tr>
                )}

                {!loading && filteredSuppliers.length === 0 && (
                  <tr>
                    <td className="p-5 text-center text-gray-500" colSpan="7">
                      No suppliers found.
                    </td>
                  </tr>
                )}

                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier._id} className="border-b">
                    <td className="p-5 font-semibold">{supplier.name}</td>
                    <td className="p-5">{supplier.phone}</td>
                    <td className="p-5">{supplier.email}</td>
                    <td className="p-5">{supplier.products || 0}</td>
                    <td className="p-5">{supplier.rating || 0}</td>
                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-lg ${
                          supplier.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {supplier.status || "Active"}
                      </span>
                    </td>

                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => openEditModal(supplier)}
                          className="bg-blue-100 text-blue-600 p-3 rounded-xl"
                          title="Edit supplier"
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(supplier)}
                          className="bg-red-100 text-red-600 p-3 rounded-xl"
                          title="Delete supplier"
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
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Recent Activities</h2>

              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-xl">
                  Supplier list synced with backend.
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  Edit and delete actions are now connected.
                </div>
                <div className="bg-orange-50 p-4 rounded-xl">
                  Pending suppliers can be tracked from status.
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  Supplier rating updates are saved in database.
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl text-white">
              <h2 className="text-3xl font-bold">Supplier Summary</h2>
              <p className="mt-3 text-blue-100">
                Monitor supplier performance and procurement operations.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                  <span>Top Supplier</span>
                  <span>{topSupplier}</span>
                </div>

                <div className="flex justify-between">
                  <span>Average Rating</span>
                  <span>{averageRating}</span>
                </div>

                <div className="flex justify-between">
                  <span>Active Vendors</span>
                  <span>{activeSuppliers}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-7"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingSupplier ? "Edit Supplier" : "Add Supplier"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="col-span-2">
                <span className="text-sm font-semibold text-gray-600">
                  Name
                </span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded-xl px-4 py-3 outline-none"
                />
              </label>

              <label>
                <span className="text-sm font-semibold text-gray-600">
                  Phone
                </span>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded-xl px-4 py-3 outline-none"
                />
              </label>

              <label>
                <span className="text-sm font-semibold text-gray-600">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded-xl px-4 py-3 outline-none"
                />
              </label>

              <label>
                <span className="text-sm font-semibold text-gray-600">
                  Products
                </span>
                <input
                  name="products"
                  type="number"
                  min="0"
                  value={formData.products}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-xl px-4 py-3 outline-none"
                />
              </label>

              <label>
                <span className="text-sm font-semibold text-gray-600">
                  Rating
                </span>
                <input
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-xl px-4 py-3 outline-none"
                />
              </label>

              <label className="col-span-2">
                <span className="text-sm font-semibold text-gray-600">
                  Status
                </span>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-xl px-4 py-3 outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-7">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-3 rounded-xl bg-gray-100 text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-3 rounded-xl bg-blue-600 text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Supplier"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
