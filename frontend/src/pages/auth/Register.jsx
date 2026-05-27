import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaUser as User,
  FaEnvelope as Mail,
  FaPhone as Phone,
  FaLock as Lock,
  FaEye as Eye,
  FaEyeSlash as EyeOff,
  FaShieldAlt as ShieldCheck
} from "react-icons/fa";

function Register() {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: ""
  });

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

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.role ||
      !formData.password
    ) {

      setMessage("Please fill all fields ❌");

      return;
    }

    setMessage("Registration Successful ✅");

    console.log(formData);

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 px-4 py-10">

      {/* REGISTER CARD */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8">

        {/* ICON */}
        <div className="flex justify-center mb-5">

          <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-lg">

            <ShieldCheck
              size={40}
              className="text-emerald-600"
            />

          </div>

        </div>

        {/* TITLE */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-gray-100 mt-2">
            Register to continue
          </p>

        </div>

        {/* MESSAGE */}
        {message && (

          <div className="bg-white text-center text-emerald-600 font-semibold p-3 rounded-xl mb-5 shadow-md">

            {message}

          </div>

        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div className="mb-4">

            <label className="block text-white mb-2 font-medium">
              Full Name
            </label>

            <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-md">

              <span className="px-4 text-gray-500">
                <User size={22} />
              </span>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 outline-none text-gray-700"
              />

            </div>

          </div>

          {/* EMAIL */}
          <div className="mb-4">

            <label className="block text-white mb-2 font-medium">
              Email Address
            </label>

            <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-md">

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

          {/* PHONE */}
          <div className="mb-4">

            <label className="block text-white mb-2 font-medium">
              Phone Number
            </label>

            <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-md">

              <span className="px-4 text-gray-500">
                <Phone size={22} />
              </span>

              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 outline-none text-gray-700"
              />

            </div>

          </div>

          {/* ROLE */}
          <div className="mb-4">

            <label className="block text-white mb-2 font-medium">
              Select Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl outline-none text-gray-700 shadow-md"
            >

              <option value="">
                Choose Role
              </option>

              <option value="admin">
                Admin
              </option>

              <option value="manager">
                Manager
              </option>

              <option value="cashier">
                Cashier
              </option>

            </select>

          </div>

          {/* PASSWORD */}
          <div className="mb-6">

            <label className="block text-white mb-2 font-medium">
              Password
            </label>

            <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-md">

              <span className="px-4 text-gray-500">
                <Lock size={22} />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 outline-none text-gray-700"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-4 text-gray-500 hover:text-emerald-600 transition"
              >

                {
                  showPassword
                    ? <EyeOff size={22} />
                    : <Eye size={22} />
                }

              </button>

            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-white text-emerald-700 font-bold py-4 rounded-2xl shadow-lg hover:bg-gray-100 hover:scale-105 transition duration-300"
          >
            Register
          </button>

        </form>

        {/* FOOTER */}
        <div className="text-center mt-8">

          <p className="text-gray-100">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="mt-2 inline-block text-white font-bold hover:text-green-200 transition"
          >
            Login Here
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Register;
