import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import ProductCard from "../components/ProductCard";
import CartItem from "../components/CartItem";

import CustomerInfo from "../components/CustomerInfo";
import BillSummary from "../components/BillSummary";
import PaymentModal from "../components/PaymentModal";

function Billing() {
  // Products
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 50000,
      image: "https://via.placeholder.com/200",
    },

    {
      id: 2,
      name: "Mouse",
      price: 800,
      image: "https://via.placeholder.com/200",
    },

    {
      id: 3,
      name: "Keyboard",
      price: 1500,
      image: "https://via.placeholder.com/200",
    },
  ];

  // Cart State
  const [cart, setCart] = useState([]);

  // Payment Modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Add To Cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Remove From Cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Total Price
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 p-6">
        {/* Navbar */}
        <Navbar />

        <h1 className="text-3xl font-bold mt-6 mb-6">Billing System</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </div>

          {/* Cart + Summary */}
          <div>
            {/* Customer Info */}
            <CustomerInfo />

            {/* Cart */}
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Cart Items</h2>

              {cart.length === 0 ? (
                <p>No items in cart</p>
              ) : (
                cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    removeFromCart={removeFromCart}
                  />
                ))
              )}
            </div>

            {/* Bill Summary */}
            <BillSummary
              cart={cart}
              openPaymentModal={() => setShowPaymentModal(true)}
            />
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          total={total}
          closeModal={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}

export default Billing;
