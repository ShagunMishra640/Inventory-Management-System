function Customers() {
  const customers = [
    { id: 1, name: "Rahul", phone: "9876543210", orders: 12 },
    { id: 2, name: "Priya", phone: "9876501234", orders: 8 },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-gray-500">
            Add, edit, and manage customer records.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button className="rounded-2xl bg-blue-600 text-white px-5 py-3">
            Add Customer
          </button>
          <button className="rounded-2xl bg-slate-100 text-slate-800 px-5 py-3">
            History
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b last:border-b-0">
                <td className="p-4">{customer.name}</td>
                <td className="p-4">{customer.phone}</td>
                <td className="p-4">{customer.orders}</td>
                <td className="p-4 flex gap-2">
                  <button className="rounded-xl bg-blue-600 text-white px-3 py-2">
                    Edit
                  </button>
                  <button className="rounded-xl bg-red-600 text-white px-3 py-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
