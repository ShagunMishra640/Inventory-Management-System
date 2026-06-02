import { useEffect, useState } from "react";
import API from "../../api/axios";
import { CASHIER_ENDPOINTS } from "../api/config";

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await API.get(CASHIER_ENDPOINTS.PAYMENTS);
        setPayments(response.data?.payments || response.data?.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Unable to load payments",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const totalBy = (value, field = "paymentMethod") =>
    payments
      .filter((payment) => String(payment[field] || "").toUpperCase() === value)
      .reduce((sum, payment) => sum + Number(payment.amount || payment.finalAmount || 0), 0);

  const summaryCards = [
    { label: "Cash Payments", value: formatCurrency(totalBy("CASH")) },
    { label: "UPI Payments", value: formatCurrency(totalBy("UPI")) },
    { label: "Card Payments", value: formatCurrency(totalBy("CARD")) },
    { label: "Pending Payments", value: formatCurrency(totalBy("PENDING", "paymentStatus")) },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-gray-500">
          Overview of payment activity and recent transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {summaryCards.map((card) => (
          <div key={card.label} className="bg-white rounded-3xl shadow p-5">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="mt-4 text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading payments...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">{error}</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4">Payment ID</th>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Method</th>
                <th className="p-4">Reference</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.length ? (
                payments.map((payment) => {
                  const paymentId = payment._id || payment.id;
                  const orderId =
                    payment.order?.orderNumber ||
                    payment.order?._id ||
                    payment.order ||
                    payment.orderId ||
                    "-";
                  const customerName =
                    payment.order?.customer?.name ||
                    payment.customer?.name ||
                    "-";
                  const amount = payment.amount || payment.finalAmount || payment.totalAmount || 0;
                  const method = payment.method || payment.paymentMethod || "-";
                  const reference =
                    payment.paymentReference || payment.transactionId || "-";

                  return (
                    <tr key={paymentId} className="border-b last:border-b-0">
                      <td className="p-4">{paymentId}</td>
                      <td className="p-4">{orderId}</td>
                      <td className="p-4">{customerName}</td>
                      <td className="p-4">{formatCurrency(amount)}</td>
                      <td className="p-4">{method}</td>
                      <td className="p-4">{reference}</td>
                      <td className="p-4">{payment.paymentStatus || "PENDING"}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-500">
                    No payments found.
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

export default Payments;
