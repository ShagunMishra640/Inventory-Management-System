import { useState } from "react";

function Billing() {
  const [cart] = useState([
    { id: 1, name: "Wireless Mouse", price: 1200, qty: 2 },
    { id: 2, name: "Mechanical Keyboard", price: 2500, qty: 1 },
  ]);
  const [search, setSearch] = useState("");

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const gst = Math.round(subtotal * 0.18);
  const discount = 10;
  const total = subtotal + gst - discount;

  return (
    <div className="space-y-8 mt-6">
      <div className="bg-white rounded-3xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Billing</h1>
            <p className="text-gray-500">
              Search computer accessories, add them to the cart, and checkout quickly.
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

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Product List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b last:border-b-0">
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">₹{item.price}</td>
                    <td className="p-4">{item.qty}</td>
                    <td className="p-4">₹{item.price * item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-6 space-y-5">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST</span>
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

          <div className="grid grid-cols-3 gap-3">
            <button className="rounded-2xl bg-blue-600 text-white py-3">
              Cash
            </button>
            <button className="rounded-2xl bg-green-600 text-white py-3">
              UPI
            </button>
            <button className="rounded-2xl bg-slate-800 text-white py-3">
              Card
            </button>
          </div>

          <button className="w-full rounded-2xl bg-indigo-600 text-white py-3 font-semibold">
            Generate Bill
          </button>

          <div className="bg-slate-50 rounded-3xl p-5">
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Product Search",
                "Barcode Scan",
                "Cart",
                "Discount",
                "GST",
                "Customer Select",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
