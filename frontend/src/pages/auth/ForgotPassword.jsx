import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, KeyRound } from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    setMessage("Password reset link sent to your email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8">
        <div className="flex justify-center mb-5">
          <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center shadow-lg">
            <KeyRound className="text-blue-600" size={40} />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Forgot Password
          </h1>

          <p className="text-gray-200 mt-2">
            Enter your email to reset password
          </p>
        </div>

        {message && (
          <div className="bg-white text-center text-blue-600 font-semibold p-3 rounded-xl mb-5 shadow-md">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-white mb-2 font-medium">
              Email Address
            </label>

            <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-cyan-300">
              <span className="px-4 text-gray-500">
                <Mail size={22} />
              </span>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 outline-none text-gray-700"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-blue-700 font-bold py-4 rounded-2xl shadow-lg hover:bg-gray-100 hover:scale-105 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-8">
          <Link
            to="/login"
            className="inline-block text-white font-bold hover:text-cyan-200 transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
