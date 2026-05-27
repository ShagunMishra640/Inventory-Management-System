import { useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7ad642e (frontend)
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
<<<<<<< HEAD

function Login() {

=======
import axios from "axios";

function Login() {

  // STATE
>>>>>>> c16a27f (save local changes)
=======

function Login() {

>>>>>>> 7ad642e (frontend)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

<<<<<<< HEAD
<<<<<<< HEAD
  const [message, setMessage] = useState("");

  // HANDLE INPUT
=======
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // HANDLE INPUT CHANGE
>>>>>>> c16a27f (save local changes)
=======
  const [message, setMessage] = useState("");

  // HANDLE INPUT
>>>>>>> 7ad642e (frontend)
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // HANDLE SUBMIT
<<<<<<< HEAD
<<<<<<< HEAD
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!formData.email || !formData.password) {

      setMessage("Please fill all fields ❌");

      return;
    }

    setMessage("Login Successful ✅");

    console.log(formData);
=======
  const handleSubmit = async (e) => {
=======
  const handleSubmit = (e) => {
>>>>>>> 7ad642e (frontend)

    e.preventDefault();

    if (!formData.email || !formData.password) {

      setMessage("Please fill all fields ❌");

      return;
    }

    setMessage("Login Successful ✅");

<<<<<<< HEAD
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          withCredentials: true
        }
      );

      console.log(response.data);

      alert("Login Successful");

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
>>>>>>> c16a27f (save local changes)
=======
    console.log(formData);
>>>>>>> 7ad642e (frontend)

  };

  return (

<<<<<<< HEAD
<<<<<<< HEAD
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

=======
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
=======
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
>>>>>>> 7ad642e (frontend)

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
<<<<<<< HEAD
>>>>>>> c16a27f (save local changes)
=======

        </div>

        {/* MESSAGE */}
        {message && (

          <div className="bg-white text-center text-purple-600 font-semibold p-3 rounded-xl mb-5 shadow-md">

            {message}

          </div>

>>>>>>> 7ad642e (frontend)
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
          <div className="mb-4">
=======
          <div className="mb-5">
>>>>>>> 7ad642e (frontend)

            <label className="block text-white mb-2 font-medium">
              Email Address
            </label>

<<<<<<< HEAD
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
>>>>>>> c16a27f (save local changes)
=======
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
>>>>>>> 7ad642e (frontend)

          </div>

          {/* PASSWORD */}
<<<<<<< HEAD
<<<<<<< HEAD
          <div className="mb-6">

            <label className="block text-white mb-2 font-medium">
              Password
            </label>

            <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-pink-400">

              <span className="px-4 text-gray-500">
                <Lock size={22} />
              </span>
=======
          <div className="mb-5">
=======
          <div className="mb-6">
>>>>>>> 7ad642e (frontend)

            <label className="block text-white mb-2 font-medium">
              Password
            </label>

<<<<<<< HEAD
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
>>>>>>> c16a27f (save local changes)
=======
            <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-pink-400">

              <span className="px-4 text-gray-500">
                <Lock size={22} />
              </span>
>>>>>>> 7ad642e (frontend)

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
<<<<<<< HEAD
<<<<<<< HEAD
                className="w-full p-4 outline-none text-gray-700"
=======
                className="w-full p-3 outline-none"
>>>>>>> c16a27f (save local changes)
=======
                className="w-full p-4 outline-none text-gray-700"
>>>>>>> 7ad642e (frontend)
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
<<<<<<< HEAD
<<<<<<< HEAD
                className="px-4 text-gray-500 hover:text-purple-600 transition"
              >

                {
                  showPassword
                    ? <EyeOff size={22} />
                    : <Eye size={22} />
                }

=======
                className="px-4 bg-gray-100"
              >
                {showPassword ? "Hide" : "Show"}
>>>>>>> c16a27f (save local changes)
=======
                className="px-4 text-gray-500 hover:text-purple-600 transition"
              >

                {
                  showPassword
                    ? <EyeOff size={22} />
                    : <Eye size={22} />
                }

>>>>>>> 7ad642e (frontend)
              </button>

            </div>

          </div>

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7ad642e (frontend)
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
<<<<<<< HEAD
          <button
            type="submit"
            className="w-full bg-white text-purple-700 font-bold py-4 rounded-2xl shadow-lg hover:bg-gray-100 hover:scale-105 transition duration-300"
          >
            Login
=======
          {/* BUTTON */}
=======
>>>>>>> 7ad642e (frontend)
          <button
            type="submit"
            className="w-full bg-white text-purple-700 font-bold py-4 rounded-2xl shadow-lg hover:bg-gray-100 hover:scale-105 transition duration-300"
          >
<<<<<<< HEAD

            {loading ? "Loading..." : "Login"}

>>>>>>> c16a27f (save local changes)
=======
            Login
>>>>>>> 7ad642e (frontend)
          </button>

        </form>

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7ad642e (frontend)
        {/* FOOTER */}
        <div className="text-center mt-8">

          <p className="text-gray-200">
            Don’t have an account?
          </p>

          <Link
            to="/register"
            className="inline-block mt-2 text-white font-bold hover:text-pink-200 transition"
          >
            Create Account
          </Link>

        </div>

<<<<<<< HEAD
=======
>>>>>>> c16a27f (save local changes)
=======
>>>>>>> 7ad642e (frontend)
      </div>

    </div>

  );
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7ad642e (frontend)

}

export default Login;
<<<<<<< HEAD
=======
}

export default Login;
>>>>>>> c16a27f (save local changes)
=======
>>>>>>> 7ad642e (frontend)
