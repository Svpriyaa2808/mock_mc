import { purchaseOrders, brandColors, poStatusColors } from "@/lib/data";

export default function PurchaseOrdersPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Purchase Orders</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track all purchase orders by brand</p>
        </div>
        <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          + New Purchase Order
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-wrap gap-3">
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
          <option value="">All Brands</option>
          <option>Suzuki</option>
          <option>Honda</option>
          <option>Kawasaki</option>
          <option>Vogue</option>
          <option>Royal Enfield</option>
          <option>Indian</option>
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
          <option value="">All Statuses</option>
          <option>Draft</option>
          <option>Submitted</option>
          <option>Approved</option>
          <option>Ordered</option>
          <option>Partially Received</option>
          <option>Received</option>
          <option>Closed</option>
          <option>Cancelled</option>
        </select>
        <input
          type="date"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="From Date"
        />
        <input
          type="date"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="To Date"
        />
        <input
          type="text"
          placeholder="Search PO number..."
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-6 py-3 font-medium">PO Number</th>
              <th className="px-6 py-3 font-medium">Brand</th>
              <th className="px-6 py-3 font-medium">Vendor</th>
              <th className="px-6 py-3 font-medium">Order Date</th>
              <th className="px-6 py-3 font-medium">Expected Delivery</th>
              <th className="px-6 py-3 font-medium">Items</th>
              <th className="px-6 py-3 font-medium">Total (RM)</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((po) => (
              <tr key={po.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-indigo-700">{po.poNumber}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${brandColors[po.brand]}`}>
                    {po.brand}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <div>{po.vendor.name.split(" ").slice(0, 3).join(" ")}</div>
                  <div className="text-xs text-gray-400">{po.vendor.contactPerson}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{po.orderDate}</td>
                <td className="px-6 py-4 text-gray-600">{po.expectedDelivery}</td>
                <td className="px-6 py-4 text-gray-600">{po.items.length} item{po.items.length > 1 ? "s" : ""}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{po.totalAmount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${poStatusColors[po.status]}`}>
                    {po.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-xs text-indigo-600 hover:underline">View</button>
                    {po.status === "Draft" && <button className="text-xs text-green-600 hover:underline">Submit</button>}
                    {po.status === "Submitted" && <button className="text-xs text-blue-600 hover:underline">Approve</button>}
                    {po.status === "Draft" && <button className="text-xs text-red-500 hover:underline">Delete</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PO Detail Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {purchaseOrders.slice(0, 2).map((po) => (
          <div key={po.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-bold text-gray-900">{po.poNumber}</div>
                <div className="text-sm text-gray-500">{po.vendor.name}</div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${poStatusColors[po.status]}`}>
                {po.status}
              </span>
            </div>
            <div className="space-y-2">
              {po.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">{item.description}</span>
                    <span className="text-gray-400 ml-2 text-xs">({item.sku})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-600">{item.quantity} units</span>
                    <span className="ml-3 font-medium">RM {item.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
              <span className="text-gray-500">Total</span>
              <span className="font-bold text-gray-900">RM {po.totalAmount.toLocaleString()}</span>
            </div>
            {po.notes && (
              <div className="mt-3 text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                {po.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
