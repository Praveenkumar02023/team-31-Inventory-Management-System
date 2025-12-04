import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  return (
    <header className="nav">
      <div className="nav-left">
        <div className="logo">IMS</div>
        <span className="logo-text">Inventory Management System</span>
      </div>

      <nav className="nav-links">
        {!isAuthPage && (
          <>
            <a href="#features">Features</a>
            <a href="#roles">User Roles</a>
            <a href="#contact">Contact</a>
          </>
        )}
      </nav>

      <div className="nav-actions">
        {!isAuthPage ? (
          <Link to="/auth" className="btn btn-primary">
            Login / Sign Up
          </Link>
        ) : (
          <Link to="/" className="btn btn-outline">
            Back to Home
          </Link>
        )}
      </div>
    </header>
  );
}
