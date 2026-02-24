/**
 * Accessory Inventory — Type Definitions
 *
 * All types related to accessory/parts inventory and accessory purchase orders.
 * Import from here instead of from accessoryUtils.ts.
 */

import type { Brand } from "./types";

// ── Category enum ──────────────────────────────────────────────────────────────

export type AccessoryCategory =
  | "Helmet"
  | "Gloves"
  | "Mirror"
  | "Jacket"
  | "Rain Gear"
  | "Boots"
  | "Knee & Shin Guard"
  | "Tank Bag"
  | "Tail Bag"
  | "Saddlebag"
  | "Disc Lock"
  | "Chain Lock"
  | "Phone Mount"
  | "USB Charger"
  | "GPS Mount"
  | "Intercom"
  | "Chain Lubricant"
  | "Tyre Inflator"
  | "Motorcycle Cover"
  | "Handlebar Accessory"
  | "Styling Accessory";

// ── Stock status ───────────────────────────────────────────────────────────────

export type AccessoryStockStatus =
  | "In Stock"
  | "Low Stock"
  | "Out of Stock"
  | "Discontinued";

// ── Unit of measure ────────────────────────────────────────────────────────────

export type AccessoryUnit = "pcs" | "pairs" | "sets" | "bottles" | "kits";

// ── Core accessory record (mirrors the JSON schema) ────────────────────────────

export interface Accessory {
  /** Unique internal ID, e.g. "acc001" */
  id: string;
  /** Display name of the product */
  name: string;
  /** Motorcycle brand this accessory belongs to */
  brand: Brand;
  /** Product category */
  category: AccessoryCategory;
  /** Supplier / manufacturer article number */
  articleNumber: string;
  /** Full product description */
  description: string;
  /** Unit of measure */
  unit: AccessoryUnit;
  /** Purchase (cost) price in RM */
  costPrice: number;
  /** Retail selling price in RM */
  sellingPrice: number;
  /** Current quantity on hand */
  qty: number;
  /** Stock level that triggers a reorder alert */
  reorderPoint: number;
  /** Vendor / distributor name (must match a Vendor.name in data.ts) */
  vendor: string;
}

// ── Accessory PO line ──────────────────────────────────────────────────────────

/** One line on an accessory Purchase Order — which item and how many to order */
export interface AccessoryOrderLine {
  accessory: Accessory;
  orderQty: number;
}

// ── Stock summary shape ────────────────────────────────────────────────────────

export interface AccessoryStockSummary {
  totalProducts: number;
  totalUnits: number;
  stockValueCost: number;
  stockValueSelling: number;
  lowStockCount: number;
  outOfStockCount: number;
  brands: Brand[];
  categories: AccessoryCategory[];
}

// ── Colour maps (UI helpers) ───────────────────────────────────────────────────

export const ACCESSORY_CATEGORY_COLORS: Record<AccessoryCategory, string> = {
  "Helmet":               "bg-red-100 text-red-800",
  "Gloves":               "bg-orange-100 text-orange-800",
  "Mirror":               "bg-sky-100 text-sky-800",
  "Jacket":               "bg-indigo-100 text-indigo-800",
  "Rain Gear":            "bg-blue-100 text-blue-800",
  "Boots":                "bg-amber-100 text-amber-800",
  "Knee & Shin Guard":    "bg-yellow-100 text-yellow-800",
  "Tank Bag":             "bg-teal-100 text-teal-800",
  "Tail Bag":             "bg-teal-100 text-teal-800",
  "Saddlebag":            "bg-teal-100 text-teal-800",
  "Disc Lock":            "bg-gray-200 text-gray-800",
  "Chain Lock":           "bg-gray-200 text-gray-800",
  "Phone Mount":          "bg-purple-100 text-purple-800",
  "USB Charger":          "bg-purple-100 text-purple-800",
  "GPS Mount":            "bg-purple-100 text-purple-800",
  "Intercom":             "bg-violet-100 text-violet-800",
  "Chain Lubricant":      "bg-lime-100 text-lime-800",
  "Tyre Inflator":        "bg-lime-100 text-lime-800",
  "Motorcycle Cover":     "bg-stone-100 text-stone-800",
  "Handlebar Accessory":  "bg-cyan-100 text-cyan-800",
  "Styling Accessory":    "bg-pink-100 text-pink-800",
};

export const ACCESSORY_STOCK_STATUS_COLORS: Record<AccessoryStockStatus, string> = {
  "In Stock":     "bg-green-100 text-green-800",
  "Low Stock":    "bg-amber-100 text-amber-800",
  "Out of Stock": "bg-red-100 text-red-800",
  "Discontinued": "bg-gray-100 text-gray-500",
};

// ── Derived stock status helper ────────────────────────────────────────────────

export function deriveStockStatus(accessory: Accessory): AccessoryStockStatus {
  if (accessory.qty === 0) return "Out of Stock";
  if (accessory.qty <= accessory.reorderPoint) return "Low Stock";
  return "In Stock";
}

// ── Margin helper ──────────────────────────────────────────────────────────────

export function grossMarginPct(accessory: Accessory): number {
  return Math.round(
    ((accessory.sellingPrice - accessory.costPrice) / accessory.sellingPrice) * 100
  );
}
