import React, { createContext, useContext, useState } from "react";

const AdminAppContext = createContext(null);

export function AdminAppProvider({ children }) {
  const [user] = useState({ name: "Admin", role: "Administrator" });

  const [products] = useState([
    { id: 1, name: "Wireless Mouse", sku: "WM-100", stock: 120, price: 1200 },
    {
      id: 2,
      name: "Mechanical Keyboard",
      sku: "MK-200",
      stock: 80,
      price: 2500,
    },
    { id: 3, name: "Laptop Cooler", sku: "LC-300", stock: 50, price: 900 },
  ]);

  const [cart, setCart] = useState([]);
  const addToCart = (product) => setCart((c) => [...c, { ...product, qty: 1 }]);
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));

  const loadingStates = { dashboard: false, products: false, users: false };
  const errorStates = { dashboard: null, products: null, users: null };

  const dashboardStats = {
    totalRevenue: "₹1,200,000",
    revenueChange: "+8.2%",
    totalOrders: 1234,
    ordersChange: "+3.1%",
    productsSubtitle: "+12",
    growthRate: "5.6%",
    growthChange: "+1.2%",
  };

  const dashboardDetails = {
    salesData: [
      { name: "Jan", value: 40000 },
      { name: "Feb", value: 30000 },
      { name: "Mar", value: 50000 },
      { name: "Apr", value: 45000 },
    ],
    revenueData: [
      { name: "Mon", value: 20000 },
      { name: "Tue", value: 25000 },
      { name: "Wed", value: 30000 },
      { name: "Thu", value: 28000 },
    ],
    recentOrders: [
      {
        id: "ORD-1001",
        name: "John Doe",
        items: 3,
        total: "₹3200",
        status: "Delivered",
        color: "bg-emerald-100 text-emerald-700",
      },
      {
        id: "ORD-1002",
        name: "Jane Smith",
        items: 1,
        total: "₹2500",
        status: "Processing",
        color: "bg-yellow-100 text-yellow-700",
      },
    ],
  };

  const fetchProducts = async () => {};
  const fetchUsers = async () => {};

  return (
    <AdminAppContext.Provider
      value={{
        user,
        products,
        cart,
        addToCart,
        removeFromCart,
        loadingStates,
        errorStates,
        dashboardStats,
        dashboardDetails,
        fetchProducts,
        fetchUsers,
      }}
    >
      {children}
    </AdminAppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AdminAppContext);
  if (!ctx) {
    // Return defaults so imports work even without provider
    return {
      user: { name: "Admin", role: "Administrator" },
      products: [],
      cart: [],
      addToCart: () => {},
      removeFromCart: () => {},
      loadingStates: {},
      errorStates: {},
      dashboardStats: {},
      dashboardDetails: {},
      fetchProducts: () => {},
      fetchUsers: () => {},
    };
  }
  return ctx;
}
