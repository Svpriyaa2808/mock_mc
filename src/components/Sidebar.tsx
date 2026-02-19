"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/purchase", label: "Dashboard", icon: "◼" },
  { href: "/purchase/orders", label: "Purchase Orders", icon: "◼" },
  { href: "/purchase/vendors", label: "Vendors / Suppliers", icon: "◼" },
  { href: "/purchase/receiving", label: "Goods Receiving (GRN)", icon: "◼" },
  { href: "/purchase/invoices", label: "Invoices", icon: "◼" },
  { href: "/purchase/payments", label: "Payments", icon: "◼" },
  { href: "/purchase/reports", label: "Reports & Analytics", icon: "◼" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col shrink-0">
      <div className="px-6 py-5 border-b border-gray-700">
        <div className="text-xl font-bold">MotoERP</div>
        <div className="text-xs text-gray-400 mt-0.5">Motorcycle Dealer System</div>
      </div>

      <div className="px-4 py-3 border-b border-gray-700">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Brands</div>
        <div className="flex flex-wrap gap-1">
          {["Suzuki", "Honda", "Kawasaki", "Vogue", "R.Enfield", "Indian"].map((b) => (
            <span key={b} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
              {b}
            </span>
          ))}
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <div className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2">Purchase</div>
        <div className="space-y-0.5">
          {navItems.map((link) => {
            const isActive =
              link.href === "/purchase"
                ? pathname === "/purchase"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white font-medium"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="px-6 py-4 border-t border-gray-700 text-xs text-gray-500">
        <div className="font-medium text-gray-300">Zulkifli Ahmad</div>
        <div>Purchase Manager</div>
      </div>
    </aside>
  );
}
