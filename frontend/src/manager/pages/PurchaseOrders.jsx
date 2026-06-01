import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  FaBell,
  FaSearch,
  FaPlus,
  FaFilter,
  FaShoppingCart,
  FaTruck,
  FaCheckCircle,
  FaRupeeSign,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import {
  createPurchaseOrder,
  deletePurchaseOrder,
  getPurchaseOrders,
  updatePurchaseOrder,
} from "../services/purchaseOrderService";
import { getSuppliers } from "../services/supplierService";
import { getProducts } from "../services/productService";

const initialEditForm = {
  supplier: "",
  status: "Pending",
  totalAmount: "",
};

const initialCreateForm = {
  supplier: "",
  product: "",
  qtyOrdered: "1",
  price: "",
  status: "Pending",
};

const normalizeSuppliers = (response) => {
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response)) return response;
  return [];
};

const normalizeProducts = (response) => {
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response)) return response;
  return [];
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));

const formatDate = (date) => {
  if (!date) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const PurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState(initialEditForm);
  const [createFormData, setCreateFormData] = useState(initialCreateForm);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const loadPurchaseOrders = async () => {
    try {
      setIsLoading(true);
      setError("");

      const [orders, supplierResponse, productResponse] = await Promise.all([
        getPurchaseOrders(),
        getSuppliers(),
        getProducts(),
      ]);

      setPurchaseOrders(orders);
      setSuppliers(normalizeSuppliers(supplierResponse));
      setProducts(normalizeProducts(productResponse));
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Purchase orders load nahi zale");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPurchaseOrders();
  }, []);

  const rows = useMemo(
    () =>
      purchaseOrders.map((order) => {
        const itemCount = Array.isArray(order.items)
          ? order.items.reduce((count, item) => count + Number(item.qtyOrdered || 0), 0)
          : 0;

        return {
          _id: order._id,
          id: `PO-${String(order._id || "").slice(-6).toUpperCase()}`,
          supplierId: order.supplier?._id || order.supplier,
          supplier: order.supplier?.name || "Unknown Supplier",
          date: formatDate(order.createdAt),
          items: itemCount,
          amount: formatCurrency(order.totalAmount),
          totalAmount: Number(order.totalAmount || 0),
          status: order.status || "Pending",
        };
      }),
    [purchaseOrders],
  );

  const filteredRows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return rows;

    return rows.filter((order) =>
      [order.id, order.supplier, order.status].some((value) =>
        String(value).toLowerCase().includes(query),
      ),
    );
  }, [rows, searchTerm]);

  const stats = useMemo(
    () => ({
      total: rows.length,
      pending: rows.filter((order) => order.status === "Pending").length,
      received: rows.filter((order) => order.status === "Received").length,
      value: rows.reduce((total, order) => total + order.totalAmount, 0),
    }),
    [rows],
  );

  const openEditModal = (order) => {
    setEditingOrder(order);
    setFormData({
      supplier: order.supplierId || "",
      status: order.status || "Pending",
      totalAmount: String(order.totalAmount || ""),
    });
  };

  const openCreateModal = () => {
    setCreateFormData(initialCreateForm);
    setIsCreateOpen(true);
  };

  const closeCreateModal = () => {
    if (isSaving) return;
    setIsCreateOpen(false);
    setCreateFormData(initialCreateForm);
  };

  const closeEditModal = () => {
    if (isSaving) return;
    setEditingOrder(null);
    setFormData(initialEditForm);
  };

  const handleCreateFormChange = (event) => {
    const { name, value } = event.target;
    setCreateFormData((current) => {
      const next = {
        ...current,
        [name]: value,
      };

      if (name === "product") {
        const product = products.find((item) => item._id === value);
        next.price = String(product?.costPrice || product?.purchasePrice || product?.sellingPrice || "");
      }

      return next;
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (!editingOrder?._id) return;

    try {
      setIsSaving(true);
      setError("");

      await updatePurchaseOrder(editingOrder._id, {
        supplier: formData.supplier,
        status: formData.status,
        totalAmount: Number(formData.totalAmount || 0),
      });

      setEditingOrder(null);
      setFormData(initialEditForm);
      await loadPurchaseOrders();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Purchase order update nahi zala");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    if (!createFormData.supplier || !createFormData.product) {
      setError("Supplier ani product select kara");
      return;
    }

    const qtyOrdered = Number(createFormData.qtyOrdered || 0);
    const price = Number(createFormData.price || 0);

    if (qtyOrdered <= 0) {
      setError("Quantity 1 peksha jast pahije");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      await createPurchaseOrder({
        supplier: createFormData.supplier,
        status: createFormData.status,
        totalAmount: qtyOrdered * price,
        items: [
          {
            product: createFormData.product,
            qtyOrdered,
            price,
          },
        ],
      });

      setIsCreateOpen(false);
      setCreateFormData(initialCreateForm);
      await loadPurchaseOrders();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Purchase order create nahi zala");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (order) => {
    if (!order?._id) return;

    const confirmed = window.confirm(`Do you want to delete ${order.id}?`);
    if (!confirmed) return;

    try {
      setDeletingId(order._id);
      setError("");
      await deletePurchaseOrder(order._id);
      await loadPurchaseOrders();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Purchase order delete nahi zala");
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
            <h1 className="text-5xl font-bold text-[#061539]">
              Purchase Orders
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Manage supplier orders and inventory purchases
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <FaBell className="text-3xl text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-6 w-6 rounded-full flex items-center justify-center">
                {stats.pending}
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
            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Total Orders</p>
                  <h2 className="text-4xl font-bold mt-2">
                    {isLoading ? "..." : stats.total}
                  </h2>
                </div>
                <FaShoppingCart className="text-5xl text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Pending</p>
                  <h2 className="text-4xl font-bold mt-2">
                    {isLoading ? "..." : stats.pending}
                  </h2>
                </div>
                <FaTruck className="text-5xl text-orange-500" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Received</p>
                  <h2 className="text-4xl font-bold mt-2">
                    {isLoading ? "..." : stats.received}
                  </h2>
                </div>
                <FaCheckCircle className="text-5xl text-green-600" />
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Purchase Value</p>
                  <h2 className="text-3xl font-bold mt-2">
                    {isLoading ? "..." : formatCurrency(stats.value)}
                  </h2>
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
                placeholder="Search purchase order..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full bg-[#f4f7fe] border rounded-xl py-3 pl-12 pr-4 outline-none"
              />
            </div>

            <div className="flex gap-4">
              <button className="bg-gray-100 px-6 py-3 rounded-xl flex items-center gap-2">
                <FaFilter />
                Filter
              </button>

              <button
                type="button"
                onClick={openCreateModal}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <FaPlus />
                Create PO
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-700">
              {error}
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b">
              <h2 className="text-2xl font-bold">Purchase Order List</h2>
            </div>

            <table className="w-full">
              <thead className="bg-[#f8faff]">
                <tr>
                  <th className="p-5 text-left">PO ID</th>
                  <th className="p-5 text-left">Supplier</th>
                  <th className="p-5 text-left">Date</th>
                  <th className="p-5 text-left">Items</th>
                  <th className="p-5 text-left">Amount</th>
                  <th className="p-5 text-left">Status</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {isLoading && (
                  <tr>
                    <td className="p-8 text-center text-gray-500" colSpan="7">
                      Purchase orders loading...
                    </td>
                  </tr>
                )}

                {!isLoading && filteredRows.length === 0 && (
                  <tr>
                    <td className="p-8 text-center text-gray-500" colSpan="7">
                      No purchase orders available
                    </td>
                  </tr>
                )}

                {!isLoading && filteredRows.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="p-5 font-semibold">{order.id}</td>
                    <td className="p-5">{order.supplier}</td>
                    <td className="p-5">{order.date}</td>
                    <td className="p-5">{order.items}</td>
                    <td className="p-5 font-semibold">{order.amount}</td>
                    <td className="p-5">
                      <span
                        className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                          order.status === "Received"
                            ? "bg-green-100 text-green-600"
                            : order.status === "Pending"
                            ? "bg-orange-100 text-orange-600"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <button
                          type="button"
                          className="bg-blue-100 text-blue-600 p-3 rounded-xl"
                        >
                          <FaEye />
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditModal(order)}
                          className="bg-green-100 text-green-600 p-3 rounded-xl"
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(order)}
                          disabled={deletingId === order._id}
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
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Recent Purchase Activity</h2>
              <div className="space-y-4">
                {rows.slice(0, 4).map((order) => (
                  <div key={order._id} className="bg-blue-50 p-4 rounded-xl">
                    {order.id} - {order.status}
                  </div>
                ))}

                {rows.length === 0 && (
                  <div className="bg-gray-50 p-4 rounded-xl text-gray-500">
                    No recent purchase activity
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl text-white">
              <h2 className="text-3xl font-bold">Purchase Summary</h2>
              <p className="mt-3 text-blue-100">
                Monitor supplier purchases and stock replenishment.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                  <span>Total Value</span>
                  <span>{formatCurrency(stats.value)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Orders</span>
                  <span>{stats.pending}</span>
                </div>
                <div className="flex justify-between">
                  <span>Received Orders</span>
                  <span>{stats.received}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="border-b px-6 py-5">
              <h2 className="text-2xl font-bold text-[#061539]">
                Create Purchase Order
              </h2>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Supplier
                </label>
                <select
                  name="supplier"
                  value={createFormData.supplier}
                  onChange={handleCreateFormChange}
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                  required
                >
                  <option value="">Select supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier._id} value={supplier._id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Product
                </label>
                <select
                  name="product"
                  value={createFormData.product}
                  onChange={handleCreateFormChange}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="qtyOrdered"
                    min="1"
                    value={createFormData.qtyOrdered}
                    onChange={handleCreateFormChange}
                    className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    value={createFormData.price}
                    onChange={handleCreateFormChange}
                    className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={createFormData.status}
                  onChange={handleCreateFormChange}
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Received">Received</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="rounded-xl bg-blue-50 px-4 py-3 font-semibold text-blue-700">
                Total:{" "}
                {formatCurrency(
                  Number(createFormData.qtyOrdered || 0) *
                    Number(createFormData.price || 0),
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Create PO"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="border-b px-6 py-5">
              <h2 className="text-2xl font-bold text-[#061539]">
                Edit Purchase Order
              </h2>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Supplier
                </label>
                <select
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                  required
                >
                  <option value="">Select supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier._id} value={supplier._id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Received">Received</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Total Amount
                </label>
                <input
                  type="number"
                  name="totalAmount"
                  min="0"
                  value={formData.totalAmount}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border bg-[#f4f7fe] px-4 py-3 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Update PO"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrders;
