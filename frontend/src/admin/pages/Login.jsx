import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Store auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful");

      // ✅ SAFE ROLE HANDLING
      const role = (data.user.role || "").toLowerCase();

      switch (role) {
        case "admin":
          navigate("/admin/dashboard");
          break;

        case "manager":
          navigate("/manager/dashboard");
          break;

        case "cashier":
        default:
          navigate("/cashier/dashboard");
          break;
      }

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#EEF2FF] flex flex-col items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">

        {/* HEADER */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-white mb-3">
            <ShoppingCart size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">RetailPOS</h1>
          <p className="text-sm text-slate-500">Login to continue</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand text-sm"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand text-sm"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand hover:bg-brand-hover text-white py-2.5 rounded-xl font-bold shadow-md transition-colors text-sm"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        © 2026 RetailPOS. All rights reserved.
      </p>
    </div>
  );
}