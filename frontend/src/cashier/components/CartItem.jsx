function CartItem({ item, removeFromCart }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4">
      <div>
        <h2 className="font-semibold">{item.name}</h2>

        <p className="text-gray-600">₹ {item.price}</p>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;
