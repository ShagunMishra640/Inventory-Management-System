function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg"
      />

      {/* Product Name */}
      <h2 className="text-xl font-semibold mt-4">{product.name}</h2>

      {/* Product Price */}
      <p className="text-gray-600 mt-2">₹ {product.price}</p>

      {/* Add To Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 w-full"
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ProductCard;
