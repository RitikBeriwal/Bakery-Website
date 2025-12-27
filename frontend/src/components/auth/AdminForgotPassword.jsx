import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendOtp = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "/api/admin/forgot-password", // ✅ ADMIN API
        { email }
      );

      // store email for OTP verification
      localStorage.setItem("adminFpEmail", email);

      setMessage(res.data.message);

      // ✅ ADMIN OTP VERIFY PAGE
      navigate("/admin/verify-otp");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Forgot Password
        </h1>

        <p className="text-center text-gray-600 mb-4">
          Enter admin email to receive an OTP.
        </p>

        <form onSubmit={sendOtp} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter admin email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg 
            font-semibold text-lg shadow-md hover:bg-orange-600 transition-all"
          >
            Send OTP
          </button>
        </form>

        {message && (
          <p className="text-center font-medium mt-4 text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminForgotPassword;
