export default function RecentTransactions({ data }) {
  return (
    <div className="bg-white shadow p-5 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2">Product</th>
            <th className="p-2">Type</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>

        <tbody>
          {data.map((tx, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{tx.product}</td>
              <td className="p-2">{tx.type}</td>
              <td className="p-2">{tx.qty}</td>
              <td className="p-2">{tx.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
