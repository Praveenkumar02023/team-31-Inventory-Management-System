import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
// Add others later:
// import Products from "./pages/Products";
// import Suppliers from "./pages/Suppliers";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Future Pages */}
        {/* <Route path="/products" element={<Products />} /> */}
        {/* <Route path="/suppliers" element={<Suppliers />} /> */}
        {/* <Route path="/stock-in" element={<StockIn />} /> */}
        {/* <Route path="/stock-out" element={<StockOut />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
