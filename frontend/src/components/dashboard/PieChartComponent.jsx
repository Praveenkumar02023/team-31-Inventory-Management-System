import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function PieChartComponent({ data }) {
  // Define colors for each slice
  const COLORS = ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B"];

  return (
    <div className="bg-white shadow p-5 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="totalQuantity"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={110}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
