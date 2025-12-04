import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Auth from "./pages/Auth.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarLayout from "./layout/SidebarLayout";

// Pages
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>

        {/* Sidebar Layout */}
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<Dashboard />} />

          {/* Other pages will come here */}
          {/* <Route path="/products" element={<Products />} /> */}
          {/* <Route path="/suppliers" element={<Suppliers />} /> */}
          {/* <Route path="/stock-in" element={<StockIn />} /> */}
          {/* <Route path="/stock-out" element={<StockOut />} /> */}
          {/* <Route path="/reports" element={<Reports />} /> */}
          {/* <Route path="/users" element={<Users />} /> */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
