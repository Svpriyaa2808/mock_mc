import { payments, brandColors, paymentStatusColors } from "@/lib/data";

export default function PaymentsPage() {
  const totalDue = payments.filter((p) => p.status !== "Paid" && p.status !== "Cancelled").reduce((s, p) => s + p.amount, 0);
  const totalPaid = payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const overduePayments = payments.filter((p) => p.status === "Overdue");

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500 text-sm mt-1">Track vendor payment schedules, aging, and history</p>
        </div>
        <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          + Record Payment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500">Total Paid (MTD)</div>
          <div className="text-2xl font-bold text-green-700">RM {totalPaid.toLocaleString()}</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <div className="text-sm text-blue-700">Outstanding</div>
          <div className="text-2xl font-bold text-blue-900">RM {totalDue.toLocaleString()}</div>
          <div className="text-xs text-blue-600">Scheduled + Overdue</div>
        </div>
        <div className="bg-red-50 rounded-xl p-5 border border-red-100">
          <div className="text-sm text-red-700">Overdue</div>
          <div className="text-2xl font-bold text-red-900">{overduePayments.length}</div>
          <div className="text-xs text-red-600">RM {overduePayments.reduce((s, p) => s + p.amount, 0).toLocaleString()}</div>
        </div>
        <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
          <div className="text-sm text-indigo-700">Scheduled</div>
          <div className="text-2xl font-bold text-indigo-900">{payments.filter((p) => p.status === "Scheduled").length}</div>
          <div className="text-xs text-indigo-600">Upcoming payments</div>
        </div>
      </div>

      {/* Overdue Alert */}
      {overduePayments.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="font-semibold text-red-800 mb-2">Action Required — Overdue Payments</div>
          {overduePayments.map((p) => (
            <div key={p.id} className="flex items-center justify-between text-sm text-red-700 py-1 border-b border-red-100 last:border-0">
              <span>{p.paymentNumber} · {p.vendor} · {p.invoiceNumber}</span>
              <div className="flex items-center gap-4">
                <span>Due: {p.dueDate}</span>
                <span className="font-bold">RM {p.amount.toLocaleString()}</span>
                <button className="bg-red-700 text-white text-xs px-3 py-1 rounded-lg hover:bg-red-800">Pay Now</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Payment Register</h2>
          <div className="flex gap-2">
            <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm">
              <option>All Statuses</option>
              <option>Scheduled</option>
              <option>Paid</option>
              <option>Overdue</option>
            </select>
            <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm">
              <option>All Brands</option>
              <option>Suzuki</option>
              <option>Honda</option>
              <option>Kawasaki</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs border-b border-gray-100">
                <th className="px-6 py-3 font-medium">Payment No.</th>
                <th className="px-6 py-3 font-medium">Invoice Ref.</th>
                <th className="px-6 py-3 font-medium">Vendor</th>
                <th className="px-6 py-3 font-medium">Brand</th>
                <th className="px-6 py-3 font-medium">Amount (RM)</th>
                <th className="px-6 py-3 font-medium">Method</th>
                <th className="px-6 py-3 font-medium">Due Date</th>
                <th className="px-6 py-3 font-medium">Paid Date</th>
                <th className="px-6 py-3 font-medium">Reference</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay) => (
                <tr key={pay.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-3 font-semibold text-indigo-700">{pay.paymentNumber}</td>
                  <td className="px-6 py-3 text-gray-600 text-xs">{pay.invoiceNumber}</td>
                  <td className="px-6 py-3 text-gray-700">{pay.vendor.split(" ").slice(0, 2).join(" ")}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${brandColors[pay.brand]}`}>{pay.brand}</span>
                  </td>
                  <td className="px-6 py-3 font-bold text-gray-900">{pay.amount.toLocaleString()}</td>
                  <td className="px-6 py-3 text-gray-600 text-xs">{pay.paymentMethod}</td>
                  <td className={`px-6 py-3 ${pay.status === "Overdue" ? "text-red-600 font-medium" : "text-gray-600"}`}>
                    {pay.dueDate}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{pay.paidDate || "—"}</td>
                  <td className="px-6 py-3 text-xs text-gray-500 font-mono">{pay.reference || "—"}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${paymentStatusColors[pay.status]}`}>
                      {pay.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {pay.status === "Scheduled" && (
                      <button className="text-xs text-green-600 hover:underline">Pay</button>
                    )}
                    {pay.status === "Overdue" && (
                      <button className="text-xs text-red-600 font-medium hover:underline">Pay Now</button>
                    )}
                    {pay.status === "Paid" && (
                      <button className="text-xs text-gray-400 hover:underline">Receipt</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Aging Schedule */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Accounts Payable Aging</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { bucket: "Current (< 30d)", amount: 215275 + 237620, color: "bg-green-50 border-green-200 text-green-800" },
            { bucket: "31–60 days", amount: 0, color: "bg-yellow-50 border-yellow-200 text-yellow-800" },
            { bucket: "61–90 days", amount: 0, color: "bg-orange-50 border-orange-200 text-orange-800" },
            { bucket: "> 90 days (Overdue)", amount: 5450, color: "bg-red-50 border-red-200 text-red-800" },
          ].map((b) => (
            <div key={b.bucket} className={`${b.color} border rounded-xl p-4`}>
              <div className="text-xs font-medium mb-1">{b.bucket}</div>
              <div className="text-2xl font-bold">RM {b.amount.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
