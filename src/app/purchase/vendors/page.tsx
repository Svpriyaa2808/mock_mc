import { vendors, brandColors } from "@/lib/data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} className={s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}>
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-500">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function VendorsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendors / Suppliers</h1>
          <p className="text-gray-500 text-sm mt-1">Manage brand distributors and supplier relationships</p>
        </div>
        <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          + Add Vendor
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500">Total Vendors</div>
          <div className="text-3xl font-bold text-gray-900">{vendors.length}</div>
          <div className="text-xs text-gray-400">All brands covered</div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500">Avg. Lead Time</div>
          <div className="text-3xl font-bold text-gray-900">
            {Math.round(vendors.reduce((s, v) => s + v.leadTimeDays, 0) / vendors.length)} days
          </div>
          <div className="text-xs text-gray-400">Across all vendors</div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500">Avg. On-Time Rate</div>
          <div className="text-3xl font-bold text-green-700">
            {Math.round(vendors.reduce((s, v) => s + v.onTimeDeliveryRate, 0) / vendors.length)}%
          </div>
          <div className="text-xs text-gray-400">Delivery performance</div>
        </div>
      </div>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${brandColors[vendor.brand]}`}>
                {vendor.brand}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${vendor.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {vendor.status}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 leading-tight">{vendor.name}</h3>
            <div className="text-sm text-gray-500 mb-3">{vendor.contactPerson}</div>

            <div className="space-y-1 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-4">@</span>
                <span className="truncate">{vendor.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-4">#</span>
                <span>{vendor.phone}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-gray-400">Payment Terms</div>
                <div className="font-medium text-gray-800">{vendor.paymentTerms}</div>
              </div>
              <div>
                <div className="text-gray-400">Lead Time</div>
                <div className="font-medium text-gray-800">{vendor.leadTimeDays} days</div>
              </div>
              <div>
                <div className="text-gray-400">Total Orders</div>
                <div className="font-medium text-gray-800">{vendor.totalOrders}</div>
              </div>
              <div>
                <div className="text-gray-400">On-Time Rate</div>
                <div className={`font-medium ${vendor.onTimeDeliveryRate >= 90 ? "text-green-700" : vendor.onTimeDeliveryRate >= 80 ? "text-amber-700" : "text-red-700"}`}>
                  {vendor.onTimeDeliveryRate}%
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="text-xs text-gray-400 mb-1">Supplier Rating</div>
              <StarRating rating={vendor.rating} />
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 text-xs border border-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors">
                View Profile
              </button>
              <button className="flex-1 text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                New PO
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Vendor Performance Table */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Vendor Performance Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 font-medium">Vendor</th>
                <th className="px-6 py-3 font-medium">Brand</th>
                <th className="px-6 py-3 font-medium">Payment Terms</th>
                <th className="px-6 py-3 font-medium">Lead Time</th>
                <th className="px-6 py-3 font-medium">Total Orders</th>
                <th className="px-6 py-3 font-medium">On-Time %</th>
                <th className="px-6 py-3 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {vendors.sort((a, b) => b.onTimeDeliveryRate - a.onTimeDeliveryRate).map((vendor) => (
                <tr key={vendor.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{vendor.name.split(" ").slice(0, 2).join(" ")}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${brandColors[vendor.brand]}`}>{vendor.brand}</span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{vendor.paymentTerms}</td>
                  <td className="px-6 py-3 text-gray-600">{vendor.leadTimeDays}d</td>
                  <td className="px-6 py-3 text-gray-600">{vendor.totalOrders}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${vendor.onTimeDeliveryRate >= 90 ? "bg-green-500" : vendor.onTimeDeliveryRate >= 80 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${vendor.onTimeDeliveryRate}%` }}
                        />
                      </div>
                      <span className={vendor.onTimeDeliveryRate >= 90 ? "text-green-700" : vendor.onTimeDeliveryRate >= 80 ? "text-amber-700" : "text-red-700"}>
                        {vendor.onTimeDeliveryRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <StarRating rating={vendor.rating} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
