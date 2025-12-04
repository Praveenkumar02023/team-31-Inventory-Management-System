const summary = {
  totalProducts: 120,
  lowStockCount: 8,
  inventoryValue: 45320,
};

const categoryDistribution = [
  { category: "Electronics", totalQuantity: 55 },
  { category: "Clothing", totalQuantity: 40 },
  { category: "Accessories", totalQuantity: 25 },
  { category: "Others", totalQuantity: 10 },
];

const recentTransactions = [
  { product: "Mouse", type: "OUT", qty: 4, time: "10:12 AM" },
  { product: "Laptop 14\"", type: "IN", qty: 10, time: "09:30 AM" },
  { product: "Jacket", type: "IN", qty: 8, time: "09:00 AM" },
];

const lowStockItems = [
  { name: "Wireless Mouse", qty: 1, threshold: 5, status: "CRITICAL" },
  { name: "Laptop 14\"", qty: 3, threshold: 5, status: "LOW" },
  { name: "Phone Case", qty: 4, threshold: 8, status: "LOW" },
];

const stockMovement = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  stockIn: [120, 90, 150, 80, 60, 200, 100],
  stockOut: [80, 70, 100, 50, 40, 120, 70],
};
