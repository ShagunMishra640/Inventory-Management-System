import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope as Mail,
  FaKey as Key,
  FaArrowLeft as ArrowLeft
} from "react-icons/fa";
import { forgotPassword } from "../../services/authService";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {

      setMessage("Please enter your email");

      return;
    }

    try {
      setIsSending(true);
      setMessage("");
      const data = await forgotPassword(trimmedEmail);
      setMessage(data.message || "Password reset message sent to your email");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSending(false);
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">

      {/* FORGOT PASSWORD CONTAINER */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8">

        {/* LOGO */}
        <div className="flex justify-center mb-5">

          <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center shadow-lg">

            <Key className="text-purple-600" size={40} />

          </div>

        </div>

        {/* TITLE */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white">
            Forgot Password
          </h1>

          <p className="text-gray-200 mt-2">
            Enter your email to reset password
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
          <div className="mb-6">

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 outline-none text-gray-700"
              />

            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isSending}
            className="w-full bg-white text-purple-700 font-bold py-4 rounded-2xl shadow-lg hover:bg-gray-100 hover:scale-105 transition duration-300 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSending ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {/* FOOTER */}
        <div className="text-center mt-8">

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-white font-bold hover:text-pink-200 transition"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>

        </div>

      </div>

    </div>

  );

}

export default ForgotPassword;
