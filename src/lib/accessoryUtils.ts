/**
 * Accessory Inventory — PO Generator Utility
 *
 * Loads accessories from src/data/accessories.json and provides
 * functions to build Purchase Orders from selected accessories.
 */

import accessories from "@/data/accessories.json";
import type { PurchaseOrder, POItem, Brand } from "./types";
import { vendors } from "./data";

// ── Accessory type (matches the JSON schema) ──────────────────────────────────

export interface Accessory {
  id: string;
  name: string;
  brand: Brand;
  category: string;
  articleNumber: string;
  description: string;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  qty: number;
  reorderPoint: number;
  vendor: string;
}

// Cast the raw JSON to the typed list
export const accessoryInventory: Accessory[] = accessories as Accessory[];

// ── Selection item: which accessory + how many to order ──────────────────────

export interface AccessoryOrderLine {
  accessory: Accessory;
  orderQty: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Return all accessories that are at or below their reorder point */
export function getLowStockAccessories(): Accessory[] {
  return accessoryInventory.filter((a) => a.qty <= a.reorderPoint);
}

/** Return accessories grouped by brand */
export function getAccessoriesByBrand(brand: Brand): Accessory[] {
  return accessoryInventory.filter((a) => a.brand === brand);
}

/** Return accessories grouped by category */
export function getAccessoriesByCategory(category: string): Accessory[] {
  return accessoryInventory.filter((a) => a.category === category);
}

/** All unique categories present in the accessory list */
export const accessoryCategories: string[] = [
  ...new Set(accessoryInventory.map((a) => a.category)),
];

// ── PO Generator ─────────────────────────────────────────────────────────────

/**
 * Build a draft PurchaseOrder object from a list of selected accessories.
 *
 * All accessories in one call must belong to the same brand/vendor —
 * one PO per vendor is the standard practice. Pass `expectedDelivery`
 * as "YYYY-MM-DD"; defaults to 14 days from today.
 *
 * @example
 * const lines = [
 *   { accessory: acc001, orderQty: 10 },
 *   { accessory: acc003, orderQty: 20 },
 * ];
 * const po = generateAccessoryPO(lines, "2024-12-15", "MGR-01");
 */
export function generateAccessoryPO(
  lines: AccessoryOrderLine[],
  expectedDelivery?: string,
  approvedBy?: string
): Omit<PurchaseOrder, "id"> {
  if (lines.length === 0) throw new Error("No accessories selected.");

  // Validate: all lines must share the same brand
  const brands = [...new Set(lines.map((l) => l.accessory.brand))];
  if (brands.length > 1) {
    throw new Error(
      `All items in one PO must share the same brand. Got: ${brands.join(", ")}`
    );
  }

  const brand = brands[0];

  // Find the matching vendor record from existing vendors list
  const vendorName = lines[0].accessory.vendor;
  const vendor = vendors.find((v) => v.name === vendorName);
  if (!vendor) {
    throw new Error(
      `Vendor not found for "${vendorName}". Add the vendor first.`
    );
  }

  // Build PO line items
  const poItems: POItem[] = lines.map((line, idx) => ({
    id: `acc-item-${idx + 1}`,
    sku: line.accessory.articleNumber,
    description: line.accessory.name,
    brand,
    category: "Accessory",
    quantity: line.orderQty,
    unitPrice: line.accessory.costPrice,
    totalPrice: line.accessory.costPrice * line.orderQty,
    receivedQty: 0,
  }));

  const totalAmount = poItems.reduce((sum, item) => sum + item.totalPrice, 0);

  // Default expected delivery: today + vendor lead time
  const today = new Date();
  const deliveryDate = expectedDelivery
    ? expectedDelivery
    : new Date(today.getTime() + vendor.leadTimeDays * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

  const orderDate = today.toISOString().split("T")[0];

  // Build the PO number: PO-YYYY-BRAND-ACC-TIMESTAMP
  const poNumber = `PO-${today.getFullYear()}-${brand.toUpperCase().replace(/\s+/g, "").slice(0, 3)}-ACC-${Date.now().toString().slice(-5)}`;

  const po: Omit<PurchaseOrder, "id"> = {
    poNumber,
    vendor,
    brand,
    status: "Draft",
    items: poItems,
    orderDate,
    expectedDelivery: deliveryDate,
    totalAmount,
    notes: `Accessory restock PO — ${poItems.length} line${poItems.length > 1 ? "s" : ""} · Auto-generated`,
    ...(approvedBy ? { approvedBy, approvedDate: orderDate } : {}),
  };

  return po;
}

/**
 * Auto-generate POs for all brands that have accessories below reorder point.
 * Returns one draft PO per brand with all low-stock items.
 */
export function generateLowStockPOs(): Omit<PurchaseOrder, "id">[] {
  const lowStock = getLowStockAccessories();
  if (lowStock.length === 0) return [];

  // Group by brand
  const byBrand = lowStock.reduce<Record<string, Accessory[]>>((acc, item) => {
    if (!acc[item.brand]) acc[item.brand] = [];
    acc[item.brand].push(item);
    return acc;
  }, {});

  return Object.entries(byBrand).map(([, items]) => {
    const lines: AccessoryOrderLine[] = items.map((a) => ({
      accessory: a,
      // Order double the reorder point by default
      orderQty: a.reorderPoint * 2,
    }));
    return generateAccessoryPO(lines);
  });
}

// ── Stock value summary ───────────────────────────────────────────────────────

export function getAccessoryStockSummary() {
  return {
    totalProducts: accessoryInventory.length,
    totalUnits: accessoryInventory.reduce((s, a) => s + a.qty, 0),
    stockValueCost: accessoryInventory.reduce((s, a) => s + a.costPrice * a.qty, 0),
    stockValueSelling: accessoryInventory.reduce((s, a) => s + a.sellingPrice * a.qty, 0),
    lowStockCount: getLowStockAccessories().length,
    brands: [...new Set(accessoryInventory.map((a) => a.brand))],
    categories: accessoryCategories,
  };
}
