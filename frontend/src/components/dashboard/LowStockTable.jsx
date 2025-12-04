export default function LowStockTable({ data }) {
  return (
    <div className="bg-white shadow p-5 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Low Stock Items</h2>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2">Product</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Threshold</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className={`p-2 ${item.qty < item.threshold ? "text-red-500 font-semibold" : ""}`}>
                {item.qty}
              </td>
              <td className="p-2">{item.threshold}</td>
              <td className="p-2">
                {item.status === "CRITICAL" ? "🔴 CRITICAL" : "🟠 LOW"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
