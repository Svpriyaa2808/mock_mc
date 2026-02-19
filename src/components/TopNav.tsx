"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/purchase",           label: "Dashboard" },
  { href: "/purchase/orders",    label: "Purchase Orders" },
  { href: "/purchase/vendors",   label: "Vendors / Suppliers" },
  { href: "/purchase/receiving", label: "Goods Receiving" },
  { href: "/purchase/invoices",  label: "Invoices" },
  { href: "/purchase/payments",  label: "Payments" },
  { href: "/purchase/reports",   label: "Reports" },
];

const brands = ["Suzuki", "Honda", "Kawasaki", "Vogue", "R.Enfield", "Indian"];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="bg-gray-900 text-white shrink-0">
      {/* Brand bar + title */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-gray-700">
        <div>
          <div className="text-xl font-bold">MotoERP</div>
          <div className="text-xs text-gray-400">Motorcycle Dealer System</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider mr-1">Brands:</span>
          {brands.map((b) => (
            <span key={b} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
              {b}
            </span>
          ))}
        </div>
        <div className="text-right text-xs text-gray-400">
          <div className="font-medium text-gray-300">Zulkifli Ahmad</div>
          <div>Purchase Manager</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-6 gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/purchase"
              ? pathname === "/purchase"
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? "border-indigo-400 text-white"
                  : "border-transparent text-gray-400 hover:text-white hover:border-gray-500"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
