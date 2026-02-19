import { purchaseOrders, vendors, brandColors } from "@/lib/data";

export default function ReportsPage() {
  const totalSpend = purchaseOrders.reduce((s, po) => s + po.totalAmount, 0);

  const spendByBrand = purchaseOrders.reduce<Record<string, { amount: number; orders: number }>>((acc, po) => {
    if (!acc[po.brand]) acc[po.brand] = { amount: 0, orders: 0 };
    acc[po.brand].amount += po.totalAmount;
    acc[po.brand].orders += 1;
    return acc;
  }, {});

  const spendByStatus = purchaseOrders.reduce<Record<string, number>>((acc, po) => {
    acc[po.status] = (acc[po.status] || 0) + po.totalAmount;
    return acc;
  }, {});

  const monthlyData = [
    { month: "Aug", spend: 180000 },
    { month: "Sep", spend: 245000 },
    { month: "Oct", spend: 592000 },
    { month: "Nov", spend: purchaseOrders.filter(po => po.orderDate.startsWith("2024-11")).reduce((s, po) => s + po.totalAmount, 0) },
  ];

  const maxMonthlySpend = Math.max(...monthlyData.map(d => d.spend));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Purchasing performance insights across all brands and vendors</p>
      </div>

      {/* Quick Export */}
      <div className="flex gap-3 mb-8">
        {["Purchase Summary", "Vendor Performance", "Spend by Brand", "Payment Aging"].map((r) => (
          <button key={r} className="text-sm border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            Export: {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Spend by Brand */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Total Spend by Brand</h2>
          <div className="space-y-4">
            {Object.entries(spendByBrand)
              .sort((a, b) => b[1].amount - a[1].amount)
              .map(([brand, data]) => {
                const pct = Math.round((data.amount / totalSpend) * 100);
                return (
                  <div key={brand}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${brandColors[brand]}`}>{brand}</span>
                        <span className="text-xs text-gray-400">{data.orders} POs</span>
                      </div>
                      <div className="text-sm font-bold text-gray-900">RM {data.amount.toLocaleString()}</div>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-xs text-right text-gray-400 mt-0.5">{pct}% of total spend</div>
                  </div>
                );
              })}
            <div className="pt-3 border-t border-gray-100 flex justify-between">
              <span className="text-sm text-gray-500 font-medium">Grand Total</span>
              <span className="text-sm font-bold text-gray-900">RM {totalSpend.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Monthly Spend Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Monthly Purchase Spend (2024)</h2>
          <div className="flex items-end gap-4 h-48">
            {monthlyData.map((d) => {
              const heightPct = (d.spend / maxMonthlySpend) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-xs font-medium text-gray-700">RM {(d.spend / 1000).toFixed(0)}K</div>
                  <div className="w-full flex items-end justify-center" style={{ height: "150px" }}>
                    <div
                      className="w-full bg-indigo-400 rounded-t-lg hover:bg-indigo-500 transition-colors"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 font-medium">{d.month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vendor Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Vendor Performance Scorecard</h2>
          <div className="space-y-3">
            {vendors.sort((a, b) => b.rating - a.rating).map((v) => (
              <div key={v.id} className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${brandColors[v.brand]}`}>{v.brand}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{v.name.split(" ").slice(0, 3).join(" ")}</div>
                  <div className="flex gap-4 text-xs text-gray-400 mt-0.5">
                    <span>Lead: {v.leadTimeDays}d</span>
                    <span>On-time: {v.onTimeDeliveryRate}%</span>
                    <span>Orders: {v.totalOrders}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{v.rating.toFixed(1)} ★</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spend by Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Order Value by Status</h2>
          <div className="space-y-3">
            {Object.entries(spendByStatus)
              .sort((a, b) => b[1] - a[1])
              .map(([status, amount]) => {
                const pct = Math.round((amount / totalSpend) * 100);
                return (
                  <div key={status} className="flex items-center gap-3">
                    <div className="w-28 text-xs text-gray-600 shrink-0">{status}</div>
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-300 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-xs font-medium text-gray-700 w-20 text-right">RM {(amount / 1000).toFixed(0)}K ({pct}%)</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-6">
        <h3 className="font-semibold text-indigo-900 mb-4">Purchase Pipeline Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <div className="text-indigo-600 font-medium mb-1">Top Brand by Spend</div>
            <div className="text-gray-800 font-bold text-lg">
              {Object.entries(spendByBrand).sort((a, b) => b[1].amount - a[1].amount)[0]?.[0]}
            </div>
            <div className="text-gray-500 text-xs">Highest procurement value</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <div className="text-indigo-600 font-medium mb-1">Best Performing Vendor</div>
            <div className="text-gray-800 font-bold text-lg">Honda</div>
            <div className="text-gray-500 text-xs">96% on-time delivery rate</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <div className="text-indigo-600 font-medium mb-1">Needs Attention</div>
            <div className="text-gray-800 font-bold text-lg">Indian (35d lead)</div>
            <div className="text-gray-500 text-xs">Longest lead time — plan ahead</div>
          </div>
        </div>
      </div>
    </div>
  );
}
