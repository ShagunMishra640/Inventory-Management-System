import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const inventoryData = [
  {
    id: 1,
    name: "Laptop",
    stock: 20,
    status: "Available",
  },
  {
    id: 2,
    name: "Keyboard",
    stock: 5,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Wireless Mouse",
    stock: 12,
    status: "Available",
  },
];

const InventoryStats = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="ml-64 flex-1 min-w-0">
        <Navbar title="Inventory" />

        <section className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Inventory Management
              </h1>
              <p className="mt-2 text-gray-500">
                Manage all inventory products easily
              </p>
            </div>

            <button className="rounded-xl bg-blue-600 px-6 py-3 text-white shadow-lg transition hover:bg-blue-700">
              + Add Product
            </button>
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Product</th>
                  <th className="p-4 text-left">Stock</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {inventoryData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold">#{item.id}</td>
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4">{item.stock}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          item.status === "Available"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InventoryStats;
