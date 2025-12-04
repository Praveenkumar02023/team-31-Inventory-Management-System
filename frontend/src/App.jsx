import { Routes, Route } from "react-router-dom";
import SidebarLayout from "./layout/SidebarLayout";

// Pages
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      {/* Public pages without sidebar */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />

      {/* Pages with sidebar layout */}
      <Route element={<SidebarLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Future routes with sidebar:
            <Route path="/products" element={<Products />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/stock-in" element={<StockIn />} />
            <Route path="/stock-out" element={<StockOut />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/users" element={<Users />} />
        */}
      </Route>

      {/* Fallback: any unknown route → Landing */}
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

export default App;
