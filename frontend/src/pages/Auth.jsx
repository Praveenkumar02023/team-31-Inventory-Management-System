import { useState } from "react";
import Navbar from "../components/Navbar.jsx";

export default function Auth() {
  const [mode, setMode] = useState("login");

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center py-14 px-4">
        <div className="w-full max-w-md bg-white shadow-lg border rounded-2xl p-6">
          {/* Tabs */}
          <div className="flex bg-gray-200 rounded-full p-1 mb-6">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-full ${
                mode === "login" ? "bg-white shadow font-semibold" : ""
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 rounded-full ${
                mode === "signup" ? "bg-white shadow font-semibold" : ""
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {mode === "login" && (
            <form className="flex flex-col gap-4">
              <input
                className="border rounded-md px-3 py-2"
                placeholder="Email"
                type="email"
                required
              />
              <input
                className="border rounded-md px-3 py-2"
                placeholder="Password"
                type="password"
                required
              />
              <select className="border rounded-md px-3 py-2">
                <option value="ADMIN">Inventory Manager (Admin)</option>
                <option value="STAFF">Warehouse Staff</option>
              </select>
              <button className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Login
              </button>
            </form>
          )}

          {/* Signup Form */}
          {mode === "signup" && (
            <form className="flex flex-col gap-4">
              <input
                className="border rounded-md px-3 py-2"
                placeholder="Full Name"
                required
              />
              <input
                className="border rounded-md px-3 py-2"
                placeholder="Email"
                type="email"
                required
              />
              <input
                className="border rounded-md px-3 py-2"
                placeholder="Password"
                type="password"
                required
              />
              <input
                className="border rounded-md px-3 py-2"
                placeholder="Confirm Password"
                type="password"
                required
              />
              <select className="border rounded-md px-3 py-2">
                <option value="ADMIN">Inventory Manager (Admin)</option>
                <option value="STAFF">Warehouse Staff</option>
              </select>
              <button className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
