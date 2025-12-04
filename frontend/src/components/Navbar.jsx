import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  return (
    <header className="w-full bg-white border-b flex justify-between items-center px-6 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 text-white font-bold w-10 h-10 rounded-md flex items-center justify-center">
          IMS
        </div>
        <h1 className="text-lg font-semibold hidden sm:block">
          Inventory Management System
        </h1>
      </div>

      <nav className="hidden md:flex gap-6 text-gray-600">
        {!isAuthPage && (
          <>
            <a href="#features" className="hover:text-black">Features</a>
            <a href="#roles" className="hover:text-black">User Roles</a>
            <a href="#contact" className="hover:text-black">Contact</a>
          </>
        )}
      </nav>

      <div>
        {!isAuthPage ? (
          <Link
            to="/auth"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Login / Sign Up
          </Link>
        ) : (
          <Link
            to="/"
            className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
          >
            Back to Home
          </Link>
        )}
      </div>
    </header>
  );
}
