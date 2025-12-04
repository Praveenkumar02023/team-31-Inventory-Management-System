import StatCard from "../components/dashboard/StatCard";
import LineChartComponent from "../components/dashboard/LineChartComponent";
import PieChartComponent from "../components/dashboard/PieChartComponent";
import RecentTransactions from "../components/dashboard/recent";
import LowStockTable from "../components/dashboard/LowStockTable";

// Import Dummy Data
import {
  summaryData,
  stockMovementData,
  categoryDistributionData,
  recentTransactionsData,
  lowStockItemsData,
} from "../constants/assets";



export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Products" value={summaryData.totalProducts} />
        <StatCard title="Low Stock Items" value={summaryData.lowStockCount} />
        <StatCard title="Inventory Value" value={`₹${summaryData.inventoryValue}`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartComponent data={stockMovementData} />
        <PieChartComponent data={categoryDistributionData} />
      </div>

      {/* Recent + Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions data={recentTransactionsData} />
        <LowStockTable data={lowStockItemsData} />
      </div>

    </div>
  );
}
