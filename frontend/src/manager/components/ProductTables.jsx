const products = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: "₹50000",
  },
  {
    id: 2,
    name: "Keyboard",
    category: "Accessories",
    price: "₹1500",
  },
];

const ProductTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Product</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-4">{product.id}</td>
              <td className="p-4">{product.name}</td>
              <td className="p-4">{product.category}</td>
              <td className="p-4">{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;