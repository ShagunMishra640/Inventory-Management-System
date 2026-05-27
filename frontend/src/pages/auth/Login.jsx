import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope as Mail,
  FaLock as Lock,
  FaEye as Eye,
  FaEyeSlash as EyeOff
} from "react-icons/fa";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!formData.email || !formData.password) {

      setMessage("Please fill all fields ❌");

      return;
    }

    setMessage("Login Successful ✅");

    console.log(formData);

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">

      {/* LOGIN CONTAINER */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8">

        {/* LOGO */}
        <div className="flex justify-center mb-5">

          <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center shadow-lg">

            <Lock className="text-purple-600" size={40} />

          </div>

        </div>

        {/* TITLE */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-gray-200 mt-2">
            Login to your account
          </p>

        </div>

        {/* MESSAGE */}
        {message && (

          <div className="bg-white text-center text-purple-600 font-semibold p-3 rounded-xl mb-5 shadow-md">

            {message}

          </div>

        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div className="mb-5">

            <label className="block text-white mb-2 font-medium">
              Email Address
            </label>

            <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-pink-400">

              <span className="px-4 text-gray-500">
                <Mail size={22} />
              </span>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 outline-none text-gray-700"
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div className="mb-6">

            <label className="block text-white mb-2 font-medium">
              Password
            </label>

            <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-pink-400">

              <span className="px-4 text-gray-500">
                <Lock size={22} />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 outline-none text-gray-700"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-4 text-gray-500 hover:text-purple-600 transition"
              >

                {
                  showPassword
                    ? <EyeOff size={22} />
                    : <Eye size={22} />
                }

              </button>

            </div>

          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end mb-6">

            <Link
              to="/forgot-password"
              className="text-sm text-white hover:text-pink-200 transition"
            >
              Forgot Password?
            </Link>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-white text-purple-700 font-bold py-4 rounded-2xl shadow-lg hover:bg-gray-100 hover:scale-105 transition duration-300"
          >
            Login
          </button>

        </form>

        {/* FOOTER */}
        <div className="text-center mt-8">

          <p className="text-gray-200">
            Don’t have an account?
          </p>

          <Link
            to="/register"
            className="mt-2 inline-block text-white font-bold hover:text-pink-200 transition"
          >
            Create Account
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Login;
