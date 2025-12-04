import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function LineChartComponent({ data }) {
  // Format data for recharts
  const chartData = data.labels.map((label, index) => ({
    name: label,
    stockIn: data.stockIn[index],
    stockOut: data.stockOut[index],
  }));

  return (
    <div className="bg-white shadow p-5 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Stock Movement</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="stockIn"
            stroke="#4CAF50"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="stockOut"
            stroke="#F44336"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
