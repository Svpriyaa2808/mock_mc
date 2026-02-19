import { purchaseOrders, invoices, payments, goodsReceivingNotes, brandColors, poStatusColors } from "@/lib/data";

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className={`rounded-xl p-5 ${color} flex flex-col gap-1`}>
      <div className="text-sm font-medium opacity-75">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
      {sub && <div className="text-xs opacity-60">{sub}</div>}
    </div>
  );
}

export default function PurchaseDashboard() {
  const openPOs = purchaseOrders.filter((po) => !["Closed", "Cancelled", "Received"].includes(po.status));
  const pendingDeliveries = purchaseOrders.filter((po) => ["Approved", "Ordered", "Partially Received"].includes(po.status));
  const overduePayments = payments.filter((p) => p.status === "Overdue");
  const pendingInvoices = invoices.filter((i) => ["Pending", "Matched"].includes(i.status));
  const totalCommitted = purchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0);
  const outstandingPayments = payments.filter((p) => p.status !== "Paid" && p.status !== "Cancelled").reduce((sum, p) => sum + p.amount, 0);

  // Spend by brand
  const spendByBrand = purchaseOrders.reduce<Record<string, number>>((acc, po) => {
    acc[po.brand] = (acc[po.brand] || 0) + po.totalAmount;
    return acc;
  }, {});

  const recentPOs = [...purchaseOrders].sort((a, b) => b.orderDate.localeCompare(a.orderDate)).slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Purchase Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of all purchasing activities across all brands</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatCard label="Open Purchase Orders" value={openPOs.length} sub="Across all brands" color="bg-indigo-50 text-indigo-900" />
        <StatCard label="Pending Deliveries" value={pendingDeliveries.length} sub="Awaiting stock" color="bg-amber-50 text-amber-900" />
        <StatCard label="Overdue Payments" value={overduePayments.length} sub="Action required" color="bg-red-50 text-red-900" />
        <StatCard label="Pending Invoices" value={pendingInvoices.length} sub="Awaiting approval" color="bg-yellow-50 text-yellow-900" />
        <StatCard label="Total Committed" value={`RM ${(totalCommitted / 1000).toFixed(0)}K`} sub="All active POs" color="bg-blue-50 text-blue-900" />
        <StatCard label="Outstanding Payable" value={`RM ${(outstandingPayments / 1000).toFixed(0)}K`} sub="To vendors" color="bg-orange-50 text-orange-900" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Purchase Orders */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Recent Purchase Orders</h2>
            <a href="/purchase/orders" className="text-sm text-indigo-600 hover:underline">View all</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs border-b border-gray-100">
                  <th className="px-6 py-3 font-medium">PO Number</th>
                  <th className="px-6 py-3 font-medium">Brand</th>
                  <th className="px-6 py-3 font-medium">Vendor</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPOs.map((po) => (
                  <tr key={po.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-indigo-700">{po.poNumber}</td>
                    <td className="px-6 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${brandColors[po.brand]}`}>{po.brand}</span>
                    </td>
                    <td className="px-6 py-3 text-gray-600 truncate max-w-[150px]">{po.vendor.name.split(" ").slice(0, 2).join(" ")}</td>
                    <td className="px-6 py-3 font-medium">RM {po.totalAmount.toLocaleString()}</td>
                    <td className="px-6 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${poStatusColors[po.status]}`}>{po.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Spend by Brand */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Spend by Brand</h2>
          </div>
          <div className="p-6 space-y-4">
            {Object.entries(spendByBrand)
              .sort((a, b) => b[1] - a[1])
              .map(([brand, amount]) => {
                const pct = Math.round((amount / totalCommitted) * 100);
                return (
                  <div key={brand}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${brandColors[brand]}`}>{brand}</span>
                      <span className="text-gray-700 font-medium">RM {(amount / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 text-right">{pct}%</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {overduePayments.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="font-semibold text-red-800 text-sm mb-2">Overdue Payments ({overduePayments.length})</div>
            {overduePayments.map((p) => (
              <div key={p.id} className="text-sm text-red-700 flex justify-between">
                <span>{p.paymentNumber} — {p.vendor.split(" ").slice(0, 2).join(" ")}</span>
                <span className="font-medium">RM {p.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
        {pendingDeliveries.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="font-semibold text-amber-800 text-sm mb-2">Pending Deliveries ({pendingDeliveries.length})</div>
            {pendingDeliveries.map((po) => (
              <div key={po.id} className="text-sm text-amber-700 flex justify-between">
                <span>{po.poNumber} — {po.brand}</span>
                <span className="font-medium">Due {po.expectedDelivery}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active GRNs */}
      {goodsReceivingNotes.filter((g) => g.status === "In Progress").length > 0 && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="font-semibold text-blue-800 text-sm mb-2">Active Goods Receiving</div>
          {goodsReceivingNotes.filter((g) => g.status === "In Progress").map((g) => (
            <div key={g.id} className="text-sm text-blue-700 flex justify-between">
              <span>{g.grnNumber} — {g.vendor.split(" ").slice(0, 3).join(" ")}</span>
              <span className="font-medium">{g.brand} · {g.receivedDate}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
