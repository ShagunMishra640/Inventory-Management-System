import { useEffect, useState } from "react";
import API from "../../api/axios";
import { CASHIER_ENDPOINTS } from "../api/config";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" });
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [editCustomer, setEditCustomer] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await API.get(CASHIER_ENDPOINTS.CUSTOMERS);
        setCustomers(response.data?.customers || response.data?.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Unable to load customers",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleShowHistory = () => {
    setMessage("Customer history is available in the next release.");
  };

  const handleAddCustomer = async () => {
    if (!newCustomer.name.trim() || !newCustomer.email.trim() || !newCustomer.phone.trim()) {
      setMessage("Enter customer name, email, and phone before adding.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await API.post(CASHIER_ENDPOINTS.CUSTOMER_CREATE, newCustomer);
      const createdCustomer = response.data?.customer || response.data?.data;

      setCustomers((prev) => [createdCustomer, ...prev]);
      setMessage("Customer added successfully.");
      setNewCustomer({ name: "", email: "", phone: "" });
      setShowAddForm(false);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Unable to add customer",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomerId(customer._id || customer.id);
    setEditCustomer({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || customer.phoneNumber || "",
    });
  };

  const handleSaveEditCustomer = async () => {
    if (!editCustomer.name.trim() || !editCustomer.email.trim() || !editCustomer.phone.trim()) {
      setMessage("Enter customer name, email, and phone before saving.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await API.put(
        `${CASHIER_ENDPOINTS.CUSTOMER_UPDATE}/${editingCustomerId}`,
        editCustomer,
      );
      const updatedCustomer = response.data?.customer || response.data?.data || {
        _id: editingCustomerId,
        ...editCustomer,
      };

      setCustomers((prev) =>
        prev.map((customer) =>
          customer._id === editingCustomerId || customer.id === editingCustomerId
            ? { ...customer, ...updatedCustomer }
            : customer,
        ),
      );
      setMessage("Customer updated successfully.");
      setEditingCustomerId(null);
      setEditCustomer({ name: "", email: "", phone: "" });
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Unable to update customer",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    if (!confirm("Delete this customer?")) return;

    setLoading(true);
    setError("");

    try {
      await API.delete(`${CASHIER_ENDPOINTS.CUSTOMER_DELETE}/${customerId}`);
      setCustomers((prev) =>
        prev.filter((customer) => customer._id !== customerId && customer.id !== customerId),
      );
      setMessage("Customer removed successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Unable to delete customer",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingCustomerId(null);
    setEditCustomer({ name: "", email: "", phone: "" });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-gray-500">Add, edit, and manage customer records.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setShowAddForm((prev) => !prev)}
            className="rounded-2xl bg-blue-600 text-white px-5 py-3"
          >
            {showAddForm ? "Cancel" : "Add Customer"}
          </button>
          <button
            type="button"
            onClick={handleShowHistory}
            className="rounded-2xl bg-slate-100 text-slate-800 px-5 py-3"
          >
            History
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
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              placeholder="Customer name"
              className="border rounded-2xl px-4 py-3"
            />
            <input
              type="email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              placeholder="Email address"
              className="border rounded-2xl px-4 py-3"
            />
            <input
              type="text"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              placeholder="Phone number"
              className="border rounded-2xl px-4 py-3"
            />
            <button
              type="button"
              onClick={handleAddCustomer}
              className="rounded-2xl bg-blue-600 text-white px-6 py-3"
            >
              Save Customer
            </button>
          </div>
        </div>
      ) : null}

      <div className="bg-white rounded-3xl shadow overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading customers...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">{error}</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length ? (
                customers.map((customer) => {
                  const customerId = customer._id || customer.id;
                  const isEditing = editingCustomerId === customerId;

                  return (
                    <tr key={customerId} className="border-b last:border-b-0">
                      <td className="p-4">
                        {isEditing ? (
                          <input
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2"
                            value={editCustomer.name}
                            onChange={(e) =>
                              setEditCustomer({ ...editCustomer, name: e.target.value })
                            }
                          />
                        ) : (
                          customer.name
                        )}
                      </td>
                      <td className="p-4">
                        {isEditing ? (
                          <input
                            type="email"
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2"
                            value={editCustomer.email}
                            onChange={(e) =>
                              setEditCustomer({ ...editCustomer, email: e.target.value })
                            }
                          />
                        ) : (
                          customer.email || "â€”"
                        )}
                      </td>
                      <td className="p-4">
                        {isEditing ? (
                          <input
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2"
                            value={editCustomer.phone}
                            onChange={(e) =>
                              setEditCustomer({ ...editCustomer, phone: e.target.value })
                            }
                          />
                        ) : (
                          customer.phone || customer.phoneNumber || "—"
                        )}
                      </td>
                      <td className="p-4">{customer.orders ?? "—"}</td>
                      <td className="p-4 flex gap-2">
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={handleSaveEditCustomer}
                              className="rounded-xl bg-green-600 text-white px-3 py-2"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="rounded-xl bg-slate-300 text-slate-800 px-3 py-2"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => handleEditCustomer(customer)}
                              className="rounded-xl bg-blue-600 text-white px-3 py-2"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCustomer(customerId)}
                              className="rounded-xl bg-red-600 text-white px-3 py-2"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    No customers available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Customers;
