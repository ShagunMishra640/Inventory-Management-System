import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios";
import { CASHIER_ENDPOINTS } from "../api/config";

function Billing() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        const [productRes, customerRes] = await Promise.all([
          API.get(CASHIER_ENDPOINTS.PRODUCTS),
          API.get(CASHIER_ENDPOINTS.CUSTOMERS),
        ]);

        setProducts(productRes.data?.data || []);
        setCustomers(customerRes.data?.customers || []);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Unable to load billing data",
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name?.toLowerCase().includes(search.toLowerCase()),
      ),
    [products, search],
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product._id || item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === existing.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          productId: product._id || product.id,
          name: product.name,
          price: product.sellingPrice ?? product.price ?? 0,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(1, newQuantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.18);
  const discount = cart.length ? 0 : 0;
  const total = subtotal + gst - discount;

  const checkout = async () => {
    setError("");
    setMessage("");

    if (!selectedCustomer) {
      setError("Please select a customer before creating the bill.");
      return;
    }

    if (!cart.length) {
      setError("Add at least one product to the cart.");
      return;
    }

    if (!currentUser?._id) {
      setError("Cashier must be logged in to complete checkout.");
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customer: selectedCustomer,
        cashier: currentUser._id,
        products: cart.map((item) => ({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      const orderRes = await API.post(CASHIER_ENDPOINTS.ORDER_CREATE, orderPayload);
      const order = orderRes.data?.order || orderRes.data?.data;

      const paymentPayload = {
        order: order._id || order.id,
        amount: total,
        paymentMethod: paymentMethod.toUpperCase(),
      };

      await API.post(CASHIER_ENDPOINTS.PAYMENT_CREATE, paymentPayload);

      setMessage("Bill generated and payment recorded successfully.");
      setCart([]);
      setSelectedCustomer("");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Unable to complete checkout",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 mt-6">
      <div className="bg-white rounded-3xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Billing</h1>
            <p className="text-gray-500">
              Search products, add items to the cart, select a customer, and checkout.
            </p>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Product"
            className="w-full md:w-72 border rounded-2xl px-4 py-3"
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-3xl bg-red-50 border border-red-200 p-4 text-red-700">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-700">
          {message}
        </div>
      ) : null}

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Product List</h2>
              <p className="text-gray-500">Tap a product to add it to the cart.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="border rounded-2xl px-4 py-3 w-full"
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer._id || customer.id} value={customer._id || customer.id}>
                    {customer.name || customer.fullName || "Unnamed"}
                  </option>
                ))}
              </select>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border rounded-2xl px-4 py-3 w-full"
              >
                <option value="CASH">Cash</option>
                <option value="UPI">UPI</option>
                <option value="CARD">Card</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length ? (
                  filteredProducts.map((product) => (
                    <tr key={product._id || product.id} className="border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                      <td className="p-4">{product.name}</td>
                      <td className="p-4">₹{product.sellingPrice ?? product.price ?? 0}</td>
                      <td className="p-4">{product.stock ?? "—"}</td>
                      <td className="p-4">₹{product.sellingPrice ?? product.price ?? 0}</td>
                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="rounded-2xl bg-blue-600 text-white px-4 py-2 text-sm"
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-500">
                      {loading ? "Loading products..." : "No products found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-6 space-y-5">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Cart Summary</h2>
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST (18%)</span>
              <span>₹{gst}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Discount</span>
              <span>₹{discount}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-5 space-y-4">
            <h3 className="font-semibold">Items in Cart</h3>
            {cart.length ? (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 p-3">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="rounded-full bg-slate-200 px-3 py-1"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="rounded-full bg-slate-200 px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId)}
                      className="rounded-2xl bg-red-600 text-white px-3 py-2 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Your cart is empty. Add a product to begin billing.</p>
            )}
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={checkout}
            className="w-full rounded-2xl bg-indigo-600 text-white py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Processing..." : "Generate Bill"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Billing;
