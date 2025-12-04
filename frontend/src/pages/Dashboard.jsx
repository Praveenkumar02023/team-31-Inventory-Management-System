export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Products" value={summary.totalProducts} />
        <StatCard title="Low Stock Items" value={summary.lowStockCount} />
        <StatCard title="Inventory Value" value={`₹${summary.inventoryValue}`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartComponent data={stockMovement} />
        <PieChartComponent data={categoryDistribution} />
      </div>

      {/* Recent + Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions data={recentTransactions} />
        <LowStockTable data={lowStockItems} />
      </div>

    </div>
  );
}
