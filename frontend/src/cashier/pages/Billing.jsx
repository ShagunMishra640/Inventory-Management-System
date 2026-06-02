import { useEffect, useMemo, useState } from "react";
import { QRCode } from "react-qr-code";
import API from "../../api/axios";
import { CASHIER_ENDPOINTS } from "../api/config";

const MERCHANT_UPI_ID = "retailpos@upi";
const MERCHANT_NAME = "RetailPOS";

const createPaymentReference = (customerId = "GUEST") => {
  const customerKey = String(customerId).slice(-6).toUpperCase() || "GUEST";
  return `PAY-${customerKey}-${Date.now()}`;
};

const createUpiPaymentUrl = (amount, paymentReference) => {
  const params = new URLSearchParams({
    pa: MERCHANT_UPI_ID,
    pn: MERCHANT_NAME,
    am: Number(amount || 0).toFixed(2),
    cu: "INR",
    tn: `${MERCHANT_NAME} payment ${paymentReference || ""}`.trim(),
  });

  if (paymentReference) {
    params.set("tr", paymentReference);
  }

  return `upi://pay?${params.toString()}`;
};

function Billing() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [search, setSearch] = useState("");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [manualDiscount, setManualDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [onlineProvider, setOnlineProvider] = useState("UPI");
  const [paymentReference, setPaymentReference] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        const [productRes, customerRes, discountRes] = await Promise.all([
          API.get(CASHIER_ENDPOINTS.PRODUCTS),
          API.get(CASHIER_ENDPOINTS.CUSTOMERS),
          API.get(CASHIER_ENDPOINTS.DISCOUNTS),
        ]);

        setProducts(productRes.data?.data || []);
        setCustomers(customerRes.data?.customers || customerRes.data?.data || []);
        setDiscounts(discountRes.data?.discounts || discountRes.data?.data || []);
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
      products.filter((product) => {
        const query = search.toLowerCase();
        return (
          product.name?.toLowerCase().includes(query) ||
          product.sku?.toLowerCase().includes(query) ||
          product.barcode?.toLowerCase().includes(query)
        );
      }),
    [products, search],
  );

  const selectedCustomerData = useMemo(
    () =>
      customers.find(
        (customer) =>
          (customer._id || customer.id) === selectedCustomer,
      ),
    [customers, selectedCustomer],
  );

  useEffect(() => {
    if (!selectedCustomer) {
      setPaymentReference("");
      return;
    }

    setPaymentReference((currentReference) =>
      currentReference || createPaymentReference(selectedCustomer),
    );
  }, [selectedCustomer]);

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

  const scanBarcode = () => {
    const code = barcodeInput.trim().toLowerCase();

    if (!code) {
      setError("Scan or enter a barcode first.");
      return;
    }

    const product = products.find(
      (item) =>
        String(item.barcode || "").toLowerCase() === code ||
        String(item.sku || "").toLowerCase() === code,
    );

    if (!product) {
      setError(`No product found for barcode ${barcodeInput}.`);
      return;
    }

    addToCart(product);
    setBarcodeInput("");
    setError("");
    setMessage(`${product.name} added from barcode scan.`);
  };

  const activeDiscount = useMemo(
    () =>
      discounts.find(
        (discountItem) =>
          (discountItem._id || discountItem.id) === selectedDiscount,
      ),
    [discounts, selectedDiscount],
  );

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.18);
  const offerDiscount = activeDiscount
    ? activeDiscount.discountType === "PERCENTAGE"
      ? Math.round((subtotal * Number(activeDiscount.discountValue || 0)) / 100)
      : Number(activeDiscount.discountValue || 0)
    : 0;
  const discount = Math.min(subtotal, Math.max(0, offerDiscount + Number(manualDiscount || 0)));
  const total = subtotal + gst - discount;
  const isOnlinePayment = paymentMethod === "UPI" || paymentMethod === "CARD";
  const upiPaymentUrl = createUpiPaymentUrl(total, paymentReference);

  const generateTransactionId = () => {
    const prefix = paymentMethod === "CARD" ? "CARD" : onlineProvider;
    const nextReference = `${prefix}-${Date.now()}`;
    setPaymentReference(nextReference);
    setTransactionId(nextReference);
    setPaymentConfirmed(false);
  };

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

    if (isOnlinePayment && !(transactionId.trim() || paymentReference)) {
      setError("Payment reference could not be generated.");
      return;
    }

    if (isOnlinePayment && !paymentConfirmed) {
      setError("Confirm the online payment before generating the bill.");
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
        transactionId: isOnlinePayment ? transactionId.trim() || paymentReference : "",
        paymentReference,
        paymentStatus: "SUCCESS",
      };

      await API.post(CASHIER_ENDPOINTS.PAYMENT_CREATE, paymentPayload);

      setMessage("Bill generated and payment recorded successfully.");
      setCart([]);
      setSelectedCustomer("");
      setPaymentReference("");
      setTransactionId("");
      setPaymentConfirmed(false);
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
            placeholder="Search product, SKU, or barcode"
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
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-bold">Product List</h2>
              <p className="text-gray-500">Tap a product to add it to the cart.</p>
            </div>

            <div className="grid gap-3">
              <div className="grid grid-cols-[minmax(220px,1fr)_auto] gap-3">
                <input
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      scanBarcode();
                    }
                  }}
                  placeholder="Scan barcode"
                  className="min-w-0 border rounded-2xl px-4 py-3"
                />
                <button
                  type="button"
                  onClick={scanBarcode}
                  className="rounded-2xl bg-slate-900 text-white px-4 py-3"
                >
                  Scan
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              <select
                value={selectedCustomer}
                onChange={(e) => {
                  const customerId = e.target.value;
                  setSelectedCustomer(customerId);
                  setPaymentReference(customerId ? createPaymentReference(customerId) : "");
                  setTransactionId("");
                  setPaymentConfirmed(false);
                }}
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
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setTransactionId("");
                  setPaymentConfirmed(false);
                }}
                className="border rounded-2xl px-4 py-3 w-full"
              >
                <option value="CASH">Cash</option>
                <option value="UPI">UPI</option>
                <option value="CARD">Card</option>
              </select>
              <select
                value={selectedDiscount}
                onChange={(e) => setSelectedDiscount(e.target.value)}
                className="border rounded-2xl px-4 py-3 w-full"
              >
                <option value="">No Offer</option>
                {discounts.map((discountItem) => (
                  <option key={discountItem._id || discountItem.id} value={discountItem._id || discountItem.id}>
                    {discountItem.discountName} - {discountItem.discountType === "PERCENTAGE" ? `${discountItem.discountValue}%` : `₹${discountItem.discountValue}`}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                value={manualDiscount}
                onChange={(e) => setManualDiscount(Number(e.target.value || 0))}
                placeholder="Manual discount"
                className="border rounded-2xl px-4 py-3 w-full"
              />
              </div>
            </div>
          </div>

          {isOnlinePayment ? (
            <div className="mt-5 rounded-3xl border border-indigo-100 bg-indigo-50 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                <div className="flex-1">
                  <label className="text-sm font-semibold text-slate-700">
                    Online Provider
                  </label>
                  <select
                    value={onlineProvider}
                    onChange={(e) => setOnlineProvider(e.target.value)}
                    disabled={paymentMethod === "CARD"}
                    className="mt-2 w-full rounded-2xl border border-indigo-100 bg-white px-4 py-3"
                  >
                    <option value="UPI">UPI</option>
                    <option value="PHONEPE">PhonePe</option>
                    <option value="GPAY">Google Pay</option>
                    <option value="PAYTM">Paytm</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-semibold text-slate-700">
                    Payment Transaction ID
                  </label>
                  <input
                    value={transactionId || paymentReference}
                    onChange={(e) => {
                      setTransactionId(e.target.value);
                      setPaymentConfirmed(false);
                    }}
                    placeholder="Enter UPI/Card transaction reference"
                    className="mt-2 w-full rounded-2xl border border-indigo-100 bg-white px-4 py-3"
                  />
                </div>
                <button
                  type="button"
                  onClick={generateTransactionId}
                  className="rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white"
                >
                  Generate Reference
                </button>
              </div>

              <label className="mt-4 flex items-center gap-3 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={paymentConfirmed}
                  onChange={(e) => setPaymentConfirmed(e.target.checked)}
                  className="h-5 w-5 accent-indigo-600"
                />
                Payment received and verified
              </label>
            </div>
          ) : null}

          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">SKU / Barcode</th>
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
                      <td className="p-4">
                        <p>{product.sku || "—"}</p>
                        <p className="text-xs text-gray-500">
                          {product.barcode || "No barcode"}
                        </p>
                      </td>
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
                    <td colSpan={6} className="p-6 text-center text-gray-500">
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
            {activeDiscount ? (
              <div className="flex justify-between text-sm text-emerald-700">
                <span>Offer Applied</span>
                <span>{activeDiscount.discountName}</span>
              </div>
            ) : null}
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-5">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <QRCode
                  value={upiPaymentUrl}
                  size={176}
                  className="h-44 w-44"
                  title="UPI payment QR code"
                />
              </div>
              <div className="w-full space-y-3">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Payment Scanner</p>
                  <h3 className="text-xl font-bold text-slate-900">Scan and Pay</h3>
                </div>
                <div className="rounded-2xl bg-white p-4 text-left text-sm text-slate-700">
                  <p>
                    <span className="font-semibold">Merchant:</span> {MERCHANT_NAME}
                  </p>
                  <p>
                    <span className="font-semibold">UPI ID:</span> {MERCHANT_UPI_ID}
                  </p>
                  <p>
                    <span className="font-semibold">Customer:</span>{" "}
                    {selectedCustomerData?.name ||
                      selectedCustomerData?.fullName ||
                      "Select customer"}
                  </p>
                  <p>
                    <span className="font-semibold">Payment Ref:</span>{" "}
                    {paymentReference || "Auto generated"}
                  </p>
                  <p>
                    <span className="font-semibold">Amount:</span> ₹{total}
                  </p>
                </div>
                <p className="text-sm text-slate-500">
                  Customer can scan this code after products are added to the bill.
                </p>
              </div>
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
