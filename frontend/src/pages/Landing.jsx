import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function Landing() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Smart Inventory Management for Modern Businesses
          </h1>
          <p className="text-gray-600 mt-3">
            Track stock in real-time, avoid stockouts, and keep your team connected.
          </p>

          <div className="flex gap-4 mt-6">
            <Link
              to="/auth"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Get Started
            </Link>
            <a href="#features" className="px-6 py-3 border rounded-md hover:bg-gray-100">
              View Features
            </a>
          </div>

          <div className="flex flex-wrap gap-3 mt-6 text-sm">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">Real-time tracking</span>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">Low-stock alerts</span>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">Transaction history</span>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border">
          <h3 className="text-lg font-semibold mb-4">Live Inventory Snapshot</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-xl font-bold">1,248</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-xl font-bold text-yellow-600">12</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Today’s Movements</p>
              <p className="text-xl font-bold">96</p>
            </div>
          </div>

          <div className="text-sm border rounded-lg divide-y">
            <div className="grid grid-cols-3 font-semibold bg-gray-50 p-2">
              <span>Product</span>
              <span>Qty</span>
              <span>Status</span>
            </div>
            <div className="grid grid-cols-3 p-2">
              <span>Wireless Mouse</span>
              <span>4</span>
              <span className="text-yellow-600 font-semibold">Low</span>
            </div>
            <div className="grid grid-cols-3 p-2">
              <span>Laptop Pro 15</span>
              <span>25</span>
              <span className="text-green-600 font-semibold">Healthy</span>
            </div>
            <div className="grid grid-cols-3 p-2">
              <span>Sports Shoes</span>
              <span>0</span>
              <span className="text-red-600 font-semibold">Out</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center">Why choose our IMS?</h2>
        <p className="text-gray-600 text-center mt-1 mb-8">
          All-in-one platform designed for seamless warehouse operations.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Real-time Dashboard",
            "Smart Stock Workflow",
            "Role-based Access",
            "Reports & Insights",
          ].map((title) => (
            <div key={title} className="p-5 bg-white shadow rounded-xl border">
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 bg-blue-50 mt-8">
        <h2 className="text-2xl font-bold">Ready to manage your inventory?</h2>
        <p className="text-gray-600 mt-1">Start in just a few clicks.</p>
        <Link
          to="/auth"
          className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Login / Sign Up
        </Link>
      </section>
    </>
  );
}
