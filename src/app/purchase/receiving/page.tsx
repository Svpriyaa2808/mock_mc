import { goodsReceivingNotes, brandColors } from "@/lib/data";

const grnStatusColors: Record<string, string> = {
  "Pending": "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  "Completed": "bg-green-100 text-green-800",
  "Rejected": "bg-red-100 text-red-800",
};

export default function ReceivingPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Goods Receiving (GRN)</h1>
          <p className="text-gray-500 text-sm mt-1">Record and inspect incoming motorcycle stock against purchase orders</p>
        </div>
        <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          + New GRN
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total GRNs", value: goodsReceivingNotes.length, color: "bg-gray-50" },
          { label: "In Progress", value: goodsReceivingNotes.filter(g => g.status === "In Progress").length, color: "bg-blue-50" },
          { label: "Completed", value: goodsReceivingNotes.filter(g => g.status === "Completed").length, color: "bg-green-50" },
          { label: "Pending", value: goodsReceivingNotes.filter(g => g.status === "Pending").length, color: "bg-yellow-50" },
        ].map((s) => (
          <div key={s.label} className={`${s.color} rounded-xl p-5 border border-gray-100`}>
            <div className="text-sm text-gray-500">{s.label}</div>
            <div className="text-3xl font-bold text-gray-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* GRN Cards */}
      <div className="space-y-6">
        {goodsReceivingNotes.map((grn) => (
          <div key={grn.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-bold text-gray-900">{grn.grnNumber}</div>
                  <div className="text-sm text-gray-500">PO: {grn.poNumber}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${brandColors[grn.brand]}`}>
                  {grn.brand}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${grnStatusColors[grn.status]}`}>
                  {grn.status}
                </span>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div>Received: {grn.receivedDate}</div>
                <div>By: {grn.receivedBy}</div>
              </div>
            </div>

            <div className="p-6">
              <div className="text-sm text-gray-500 mb-1 font-medium">Vendor</div>
              <div className="text-sm text-gray-800 mb-4">{grn.vendor}</div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-100 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-50 text-xs text-gray-500">
                      <th className="px-4 py-2 text-left font-medium">SKU</th>
                      <th className="px-4 py-2 text-left font-medium">Description</th>
                      <th className="px-4 py-2 text-center font-medium">Ordered</th>
                      <th className="px-4 py-2 text-center font-medium">Received</th>
                      <th className="px-4 py-2 text-center font-medium">Variance</th>
                      <th className="px-4 py-2 text-center font-medium">Condition</th>
                      <th className="px-4 py-2 text-left font-medium">VIN / Serial No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grn.items.map((item, idx) => {
                      const variance = item.receivedQty - item.orderedQty;
                      return (
                        <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 font-mono text-xs text-gray-600">{item.sku}</td>
                          <td className="px-4 py-3 text-gray-800">{item.description}</td>
                          <td className="px-4 py-3 text-center text-gray-600">{item.orderedQty}</td>
                          <td className="px-4 py-3 text-center font-medium text-gray-900">{item.receivedQty}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`font-medium ${variance === 0 ? "text-green-600" : variance < 0 ? "text-red-600" : "text-blue-600"}`}>
                              {variance > 0 ? "+" : ""}{variance}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              item.condition === "Good" ? "bg-green-100 text-green-700" :
                              item.condition === "Damaged" ? "bg-red-100 text-red-700" :
                              "bg-yellow-100 text-yellow-700"
                            }`}>
                              {item.condition}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-500 font-mono">{item.vinNumber || "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {grn.inspectionNotes && (
                <div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm text-amber-800">
                  <span className="font-medium">Inspection Notes: </span>{grn.inspectionNotes}
                </div>
              )}

              <div className="mt-4 flex gap-2 justify-end">
                <button className="text-sm border border-gray-200 text-gray-600 px-4 py-1.5 rounded-lg hover:bg-gray-50">
                  Print GRN
                </button>
                {grn.status === "In Progress" && (
                  <button className="text-sm bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700">
                    Complete GRN
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
