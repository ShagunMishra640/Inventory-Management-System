import React, { useState } from 'react';
import { Search, ShoppingCart, Trash2, Loader2, Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';

const fallbackProductImage =
  'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=600&q=80';

export default function POSTerminal() {
  const { products, loadingStates, errorStates, cart, addToCart, removeFromCart } = useApp();
  const [search, setSearch] = useState('');

  if (loadingStates.products) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (errorStates.products) return <div className="text-red-600 p-6">Error: {errorStates.products}</div>;

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <div className="flex flex-1 gap-6 overflow-hidden p-6">
        {/* Product Grid Section */}
        <div className="flex-1 space-y-6 overflow-y-auto flex flex-col pr-2">
          <div className="space-y-2 flex-shrink-0">
            <h1 className="text-3xl font-bold text-slate-900">POS Terminal</h1>
            <p className="text-slate-600 text-sm">Click products to add to cart, scan or search barcodes</p>
          </div>

          <div className="relative flex-shrink-0">
            <Search className="absolute left-4 top-4 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search products or scan barcode..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto flex-1">
            {filtered.length > 0 ? (
              filtered.map((product, idx) => {
                const gradients = [
                  'from-blue-50 to-indigo-50 border-blue-200',
                  'from-purple-50 to-pink-50 border-purple-200',
                  'from-emerald-50 to-teal-50 border-emerald-200',
                  'from-amber-50 to-orange-50 border-amber-200'
                ];
                const gradient = gradients[idx % gradients.length];
                return (
                  <div
                    key={product.sku}
                    onClick={() => addToCart(product)}
                    className={`bg-gradient-to-br ${gradient} border-2 rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 group flex flex-col justify-between shadow-md`}
                  >
                    <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-100 overflow-hidden relative border-b-4 border-white">
                      <img
                        src={product.image || fallbackProductImage}
                        alt={product.name}
                        onError={(event) => {
                          event.currentTarget.src = fallbackProductImage;
                        }}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                        product.stock > 0 ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {product.stock > 0 ? 'In Stock' : 'Out'}
                      </div>
                    </div>
                    <div className="p-5 space-y-3 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h5 className="font-bold text-slate-900 text-sm line-clamp-2">{product.name}</h5>
                        <p className="text-xs text-slate-600 mt-1 font-medium">SKU: {product.sku}</p>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t-2 border-white">
                        <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">${product.price.toFixed(2)}</span>
                        <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200">{product.stock} left</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-500">
                <ShoppingCart size={48} className="text-slate-300 mb-3" />
                <p className="font-medium">No products found</p>
              </div>
            )}
          </div>
        </div>

        {/* Cart Panel Section */}
        <div className="w-96 bg-white border border-slate-100 rounded-3xl flex flex-col shadow-2xl overflow-hidden flex-shrink-0">
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-blue-50 flex-shrink-0">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <ShoppingCart size={22} className="text-indigo-600" />
              Current Sale
            </h3>
            <p className="text-xs text-slate-600 mt-1">{cart.length} items in cart</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                <div className="p-4 bg-slate-100 rounded-full">
                  <ShoppingCart size={32} className="text-slate-300" />
                </div>
                <p className="text-sm font-medium">Cart is empty</p>
                <p className="text-xs text-slate-500">Select products to get started</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="p-3 hover:bg-slate-50 rounded-2xl border border-slate-100 transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <img
                      src={item.image || fallbackProductImage}
                      onError={(event) => {
                        event.currentTarget.src = fallbackProductImage;
                      }}
                      className="w-14 h-14 object-cover rounded-xl"
                      alt=""
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 text-sm truncate">{item.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-all flex-shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50 space-y-4 flex-shrink-0">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (8%)</span>
                <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-bold text-slate-900">
                <span>Total</span>
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              disabled={cart.length === 0}
              onClick={() => {
                if (cart.length > 0) {
                  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                  const total = subtotal * 1.08;
                  alert(`✅ Checkout Successful!\n\nTotal Amount: $${total.toFixed(2)}\nItems: ${cart.length}\n\nThank you for your purchase!`);
                }
              }}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-300 text-white py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all disabled:cursor-not-allowed"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
