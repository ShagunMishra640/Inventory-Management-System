import { useState } from "react";

function Products() {
  const [search, setSearch] = useState("");
  const products = [
    { id: 1, name: "pc", category: "electronics", stock: 50, price: 20000 },
    { id: 2, name: "laptop", category: "electronics", stock: 80, price: 40 },
    { id: 3, name: "cpu", category: "electronics", stock: 150, price: 60 },
  ];
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-500">
            Manage inventory, filter categories, and edit product details.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Product"
            className="border rounded-2xl px-4 py-3 w-full sm:w-72"
          />
          <button className="rounded-2xl bg-blue-600 text-white px-5 py-3">
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b last:border-b-0">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">₹{product.price}</td>
                <td className="p-3 space-x-2">
                  <button className="rounded-xl bg-blue-600 text-white px-3 py-1 text-sm">
                    Edit
                  </button>
                  <button className="rounded-xl bg-red-600 text-white px-3 py-1 text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-3xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Low Stock Alert</h2>
        <p className="text-gray-600">
          PC and Laptop stock are running low. Reorder soon.
        </p>
      </div>
    </div>
  );
}

export default Products;
