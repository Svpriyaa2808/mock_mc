import { invoices, brandColors, invoiceStatusColors } from "@/lib/data";

const matchColors: Record<string, string> = {
  "Unmatched": "bg-red-100 text-red-700",
  "2-Way Match": "bg-yellow-100 text-yellow-800",
  "3-Way Match": "bg-green-100 text-green-700",
};

export default function InvoicesPage() {
  const totalInvoiced = invoices.reduce((s, i) => s + i.totalAmount, 0);
  const pendingApproval = invoices.filter((i) => i.status === "Pending" || i.status === "Matched");
  const overdue = invoices.filter((i) => i.status === "Overdue");

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Invoices</h1>
          <p className="text-gray-500 text-sm mt-1">3-way matching: Purchase Order → GRN → Invoice</p>
        </div>
        <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          + Register Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500">Total Invoiced</div>
          <div className="text-2xl font-bold text-gray-900">RM {(totalInvoiced / 1000).toFixed(0)}K</div>
        </div>
        <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-100">
          <div className="text-sm text-yellow-700">Pending Approval</div>
          <div className="text-2xl font-bold text-yellow-900">{pendingApproval.length}</div>
          <div className="text-xs text-yellow-600">RM {pendingApproval.reduce((s, i) => s + i.totalAmount, 0).toLocaleString()}</div>
        </div>
        <div className="bg-red-50 rounded-xl p-5 border border-red-100">
          <div className="text-sm text-red-700">Overdue</div>
          <div className="text-2xl font-bold text-red-900">{overdue.length}</div>
          <div className="text-xs text-red-600">RM {overdue.reduce((s, i) => s + i.totalAmount, 0).toLocaleString()}</div>
        </div>
        <div className="bg-green-50 rounded-xl p-5 border border-green-100">
          <div className="text-sm text-green-700">3-Way Matched</div>
          <div className="text-2xl font-bold text-green-900">{invoices.filter(i => i.matchStatus === "3-Way Match").length}</div>
          <div className="text-xs text-green-600">Ready for payment</div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-semibold text-gray-800">All Invoices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs border-b border-gray-100">
                <th className="px-6 py-3 font-medium">Invoice No.</th>
                <th className="px-6 py-3 font-medium">Vendor Ref.</th>
                <th className="px-6 py-3 font-medium">Brand</th>
                <th className="px-6 py-3 font-medium">PO / GRN</th>
                <th className="px-6 py-3 font-medium">Invoice Date</th>
                <th className="px-6 py-3 font-medium">Due Date</th>
                <th className="px-6 py-3 font-medium">Amount (RM)</th>
                <th className="px-6 py-3 font-medium">Tax (RM)</th>
                <th className="px-6 py-3 font-medium">Total (RM)</th>
                <th className="px-6 py-3 font-medium">Match</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-3 font-semibold text-indigo-700">{inv.invoiceNumber}</td>
                  <td className="px-6 py-3 text-gray-500 text-xs">{inv.vendorInvoiceNumber}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${brandColors[inv.brand]}`}>{inv.brand}</span>
                  </td>
                  <td className="px-6 py-3 text-xs text-gray-600">
                    <div>{inv.poNumber}</div>
                    {inv.grnNumber && <div className="text-gray-400">{inv.grnNumber}</div>}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{inv.invoiceDate}</td>
                  <td className="px-6 py-3 text-gray-600">
                    <span className={inv.status === "Overdue" ? "text-red-600 font-medium" : ""}>{inv.dueDate}</span>
                  </td>
                  <td className="px-6 py-3 text-gray-700">{inv.amount.toLocaleString()}</td>
                  <td className="px-6 py-3 text-gray-700">{inv.tax.toLocaleString()}</td>
                  <td className="px-6 py-3 font-bold text-gray-900">{inv.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${matchColors[inv.matchStatus]}`}>
                      {inv.matchStatus}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${invoiceStatusColors[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-1">
                      <button className="text-xs text-indigo-600 hover:underline">View</button>
                      {inv.status === "Matched" && <button className="text-xs text-green-600 hover:underline">Approve</button>}
                      {inv.status === "Pending" && <button className="text-xs text-blue-600 hover:underline">Match</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How 3-Way Matching Works */}
      <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-xl p-6">
        <h3 className="font-semibold text-indigo-900 mb-3">3-Way Matching Process</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex-1 bg-white rounded-lg p-3 border border-indigo-100 text-center">
            <div className="font-bold text-indigo-800 text-lg">1</div>
            <div className="font-medium text-gray-800">Purchase Order</div>
            <div className="text-xs text-gray-500 mt-1">What was ordered and at what price</div>
          </div>
          <div className="text-indigo-400 text-xl">→</div>
          <div className="flex-1 bg-white rounded-lg p-3 border border-indigo-100 text-center">
            <div className="font-bold text-indigo-800 text-lg">2</div>
            <div className="font-medium text-gray-800">Goods Receipt (GRN)</div>
            <div className="text-xs text-gray-500 mt-1">What was actually received</div>
          </div>
          <div className="text-indigo-400 text-xl">→</div>
          <div className="flex-1 bg-white rounded-lg p-3 border border-indigo-100 text-center">
            <div className="font-bold text-indigo-800 text-lg">3</div>
            <div className="font-medium text-gray-800">Vendor Invoice</div>
            <div className="text-xs text-gray-500 mt-1">What the vendor is charging</div>
          </div>
          <div className="text-indigo-400 text-xl">→</div>
          <div className="flex-1 bg-green-100 rounded-lg p-3 border border-green-200 text-center">
            <div className="font-bold text-green-800 text-lg">✓</div>
            <div className="font-medium text-green-800">Approve Payment</div>
            <div className="text-xs text-green-600 mt-1">Only if all 3 match</div>
          </div>
        </div>
      </div>
    </div>
  );
}
