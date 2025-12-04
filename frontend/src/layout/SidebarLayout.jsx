import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBoxes, FaTruck, FaChartBar, FaUsers, FaHome, FaClipboardList } from "react-icons/fa";

export default function SidebarLayout() {

  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Products", path: "/products", icon: <FaBoxes /> },
    { name: "Suppliers", path: "/suppliers", icon: <FaTruck /> },
    { name: "Stock In", path: "/stock-in", icon: <FaClipboardList /> },
    { name: "Stock Out", path: "/stock-out", icon: <FaClipboardList /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Users", path: "/users", icon: <FaUsers /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5">
        <h1 className="text-2xl font-bold mb-8 text-blue-600">IMS Panel</h1>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-md hover:bg-blue-50
              ${location.pathname === item.path ? "bg-blue-100 font-semibold" : ""}`}
            >
              <span className="text-blue-600">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
