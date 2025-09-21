// File: components/Login.jsx
import React, { useState } from "react";

// ✅ Actual Render backend URL
const BASE_URL = "https://blog-app-mz67.onrender.com"; 

export default function Login({ onLogin, onClose }) {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const url = activeTab === "signup" ? "/api/signup" : "/api/login";

    try {
      const res = await fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);
      onLogin(email);
      onClose();

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("Server error or CORS issue");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-96 p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          ×
        </button>

        <div className="flex mb-6 border-b">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 font-semibold ${
              activeTab === "login"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 font-semibold ${
              activeTab === "signup"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-500"
            }`}
          >
            New User
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            {activeTab === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
