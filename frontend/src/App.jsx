import { Routes, Route } from "react-router-dom";
import SidebarLayout from "./layout/SidebarLayout";
import ProductManagement from "./pages/productmanagement";

// Pages
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import SupplierManagement from "./pages/supply-management";

function App() {
  return (
    <Routes>
      {/* Public pages without sidebar */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />

      {/* Pages with sidebar layout */}
      <Route element={<SidebarLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/suppliers" element={<SupplierManagement />} />
      </Route>

      {/* Fallback: any unknown route → Landing */}
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

export default App;
