import type { InventoryUnit, InventoryModel, Brand } from "./types";

// ── Individual stock units (each physical motorcycle on the floor) ────────────

export const inventoryUnits: InventoryUnit[] = [
  // ── Kawasaki ────────────────────────────────────────────────────────────────
  {
    id: "u001", sku: "KAW-Z900-24", vin: "KAW900-001",
    brand: "Kawasaki", model: "Z900", year: 2024, color: "Metallic Spark Black",
    category: "Naked", engineCC: 948,
    costPrice: 52000, sellingPrice: 59800,
    status: "In Stock", location: "Showroom",
    receivedDate: "2024-10-30", poNumber: "PO-2024-0045", grnNumber: "GRN-2024-0031",
  },
  {
    id: "u002", sku: "KAW-Z900-24", vin: "KAW900-002",
    brand: "Kawasaki", model: "Z900", year: 2024, color: "Candy Lime Green",
    category: "Naked", engineCC: 948,
    costPrice: 52000, sellingPrice: 59800,
    status: "Reserved", location: "Showroom",
    receivedDate: "2024-10-30", poNumber: "PO-2024-0045", grnNumber: "GRN-2024-0031",
    reservedFor: "Amirul Hakimi — Deposit paid 2024-11-02",
  },
  {
    id: "u003", sku: "KAW-Z900-24", vin: "KAW900-003",
    brand: "Kawasaki", model: "Z900", year: 2024, color: "Pearl Robotic White",
    category: "Naked", engineCC: 948,
    costPrice: 52000, sellingPrice: 59800,
    status: "In Stock", location: "Warehouse",
    receivedDate: "2024-10-30", poNumber: "PO-2024-0045", grnNumber: "GRN-2024-0031",
  },
  {
    id: "u004", sku: "KAW-NINJA400-24", vin: "KAW400-011",
    brand: "Kawasaki", model: "Ninja 400", year: 2024, color: "Candy Lime Green",
    category: "Sport", engineCC: 399,
    costPrice: 28000, sellingPrice: 32500,
    status: "Sold", location: "Showroom",
    receivedDate: "2024-10-30", poNumber: "PO-2024-0045", grnNumber: "GRN-2024-0031",
    soldDate: "2024-11-03",
  },
  {
    id: "u005", sku: "KAW-NINJA400-24", vin: "KAW400-012",
    brand: "Kawasaki", model: "Ninja 400", year: 2024, color: "Metallic Spark Black",
    category: "Sport", engineCC: 399,
    costPrice: 28000, sellingPrice: 32500,
    status: "In Stock", location: "Showroom",
    receivedDate: "2024-10-30", poNumber: "PO-2024-0045", grnNumber: "GRN-2024-0031",
  },
  {
    id: "u006", sku: "KAW-NINJA400-24", vin: "KAW400-013",
    brand: "Kawasaki", model: "Ninja 400", year: 2024, color: "Pearl Robotic White",
    category: "Sport", engineCC: 399,
    costPrice: 28000, sellingPrice: 32500,
    status: "In Stock", location: "Warehouse",
    receivedDate: "2024-10-30", poNumber: "PO-2024-0045", grnNumber: "GRN-2024-0031",
  },
  {
    id: "u007", sku: "KAW-NINJA400-24", vin: "KAW400-014",
    brand: "Kawasaki", model: "Ninja 400", year: 2024, color: "Candy Lime Green",
    category: "Sport", engineCC: 399,
    costPrice: 28000, sellingPrice: 32500,
    status: "Reserved", location: "Showroom",
    receivedDate: "2024-10-30", poNumber: "PO-2024-0045", grnNumber: "GRN-2024-0031",
    reservedFor: "Tan Mei Ling — Full payment received",
  },
  {
    id: "u008", sku: "KAW-NINJA400-24", vin: "KAW400-015",
    brand: "Kawasaki", model: "Ninja 400", year: 2024, color: "Metallic Spark Black",
    category: "Sport", engineCC: 399,
    costPrice: 28000, sellingPrice: 32500,
    status: "In Stock", location: "Warehouse",
    receivedDate: "2024-10-30", poNumber: "PO-2024-0045", grnNumber: "GRN-2024-0031",
  },

  // ── Suzuki ───────────────────────────────────────────────────────────────────
  {
    id: "u009", sku: "SUZ-GSX-R1000-24", vin: "SUZGSX-001",
    brand: "Suzuki", model: "GSX-R1000", year: 2024, color: "Metallic Triton Blue",
    category: "Sport", engineCC: 999,
    costPrice: 78000, sellingPrice: 89900,
    status: "In Stock", location: "Showroom",
    receivedDate: "2024-11-05", poNumber: "PO-2024-0042", grnNumber: "GRN-2024-0032",
  },
  {
    id: "u010", sku: "SUZ-GSX-R1000-24", vin: "SUZGSX-002",
    brand: "Suzuki", model: "GSX-R1000", year: 2024, color: "Glass Sparkle Black",
    category: "Sport", engineCC: 999,
    costPrice: 78000, sellingPrice: 89900,
    status: "In Transit", location: "In Transit",
    receivedDate: "", poNumber: "PO-2024-0042", grnNumber: "",
    notes: "Delayed from supplier — expected 2024-11-12",
  },
  {
    id: "u011", sku: "SUZ-SV650-24", vin: "SUZSV-021",
    brand: "Suzuki", model: "SV650", year: 2024, color: "Pearl Glacier White",
    category: "Naked", engineCC: 645,
    costPrice: 35000, sellingPrice: 40500,
    status: "Sold", location: "Showroom",
    receivedDate: "2024-11-05", poNumber: "PO-2024-0042", grnNumber: "GRN-2024-0032",
    soldDate: "2024-11-07",
  },
  {
    id: "u012", sku: "SUZ-SV650-24", vin: "SUZSV-022",
    brand: "Suzuki", model: "SV650", year: 2024, color: "Metallic Triton Blue",
    category: "Naked", engineCC: 645,
    costPrice: 35000, sellingPrice: 40500,
    status: "In Stock", location: "Showroom",
    receivedDate: "2024-11-05", poNumber: "PO-2024-0042", grnNumber: "GRN-2024-0032",
  },
  {
    id: "u013", sku: "SUZ-SV650-24", vin: "SUZSV-023",
    brand: "Suzuki", model: "SV650", year: 2024, color: "Glass Sparkle Black",
    category: "Naked", engineCC: 645,
    costPrice: 35000, sellingPrice: 40500,
    status: "In Stock", location: "Warehouse",
    receivedDate: "2024-11-05", poNumber: "PO-2024-0042", grnNumber: "GRN-2024-0032",
  },
  {
    id: "u014", sku: "SUZ-SV650-24", vin: "SUZSV-024",
    brand: "Suzuki", model: "SV650", year: 2024, color: "Pearl Glacier White",
    category: "Naked", engineCC: 645,
    costPrice: 35000, sellingPrice: 40500,
    status: "Reserved", location: "Showroom",
    receivedDate: "2024-11-05", poNumber: "PO-2024-0042", grnNumber: "GRN-2024-0032",
    reservedFor: "Fadhli Ramli — Deposit RM5,000 paid",
  },

  // ── Honda ────────────────────────────────────────────────────────────────────
  {
    id: "u015", sku: "HND-CBR600RR-24", vin: "HNDCBR-007",
    brand: "Honda", model: "CBR600RR", year: 2024, color: "Grand Prix Red",
    category: "Sport", engineCC: 599,
    costPrice: 45000, sellingPrice: 52000,
    status: "In Stock", location: "Showroom",
    receivedDate: "2024-11-14", poNumber: "PO-2024-0041", grnNumber: "GRN-2024-0033",
  },
  {
    id: "u016", sku: "HND-CBR600RR-24", vin: "HNDCBR-008",
    brand: "Honda", model: "CBR600RR", year: 2024, color: "Matte Pearl Morion Black",
    category: "Sport", engineCC: 599,
    costPrice: 45000, sellingPrice: 52000,
    status: "In Stock", location: "Warehouse",
    receivedDate: "2024-11-14", poNumber: "PO-2024-0041", grnNumber: "GRN-2024-0033",
  },
  {
    id: "u017", sku: "HND-CBR600RR-24", vin: "HNDCBR-009",
    brand: "Honda", model: "CBR600RR", year: 2024, color: "Grand Prix Red",
    category: "Sport", engineCC: 599,
    costPrice: 45000, sellingPrice: 52000,
    status: "In Transit", location: "In Transit",
    receivedDate: "", poNumber: "PO-2024-0041", grnNumber: "GRN-2024-0033",
    notes: "Final unit — ETA 2024-11-15",
  },
  {
    id: "u018", sku: "HND-PCX160-24", vin: "HNDPCX-031",
    brand: "Honda", model: "PCX160", year: 2024, color: "Precious White Pearl",
    category: "Scooter", engineCC: 156,
    costPrice: 12500, sellingPrice: 14800,
    status: "Sold", location: "Showroom",
    receivedDate: "2024-11-14", poNumber: "PO-2024-0041", grnNumber: "GRN-2024-0033",
    soldDate: "2024-11-14",
  },
  {
    id: "u019", sku: "HND-PCX160-24", vin: "HNDPCX-032",
    brand: "Honda", model: "PCX160", year: 2024, color: "Radiant Red Metallic",
    category: "Scooter", engineCC: 156,
    costPrice: 12500, sellingPrice: 14800,
    status: "In Stock", location: "Showroom",
    receivedDate: "2024-11-14", poNumber: "PO-2024-0041", grnNumber: "GRN-2024-0033",
  },
  {
    id: "u020", sku: "HND-PCX160-24", vin: "HNDPCX-033",
    brand: "Honda", model: "PCX160", year: 2024, color: "Pearl Nightstar Black",
    category: "Scooter", engineCC: 156,
    costPrice: 12500, sellingPrice: 14800,
    status: "In Stock", location: "Showroom",
    receivedDate: "2024-11-14", poNumber: "PO-2024-0041", grnNumber: "GRN-2024-0033",
  },
  {
    id: "u021", sku: "HND-PCX160-24", vin: "HNDPCX-034",
    brand: "Honda", model: "PCX160", year: 2024, color: "Precious White Pearl",
    category: "Scooter", engineCC: 156,
    costPrice: 12500, sellingPrice: 14800,
    status: "Reserved", location: "Showroom",
    receivedDate: "2024-11-14", poNumber: "PO-2024-0041", grnNumber: "GRN-2024-0033",
    reservedFor: "Nurul Izzah — Full payment",
  },
  {
    id: "u022", sku: "HND-PCX160-24", vin: "HNDPCX-035",
    brand: "Honda", model: "PCX160", year: 2024, color: "Radiant Red Metallic",
    category: "Scooter", engineCC: 156,
    costPrice: 12500, sellingPrice: 14800,
    status: "In Stock", location: "Warehouse",
    receivedDate: "2024-11-14", poNumber: "PO-2024-0041", grnNumber: "GRN-2024-0033",
  },

  // ── Royal Enfield (Ordered — not yet received) ──────────────────────────────
  {
    id: "u023", sku: "RE-METEOR350-24", vin: "",
    brand: "Royal Enfield", model: "Meteor 350", year: 2024, color: "Fireball",
    category: "Classic", engineCC: 349,
    costPrice: 22000, sellingPrice: 25800,
    status: "In Transit", location: "In Transit",
    receivedDate: "", poNumber: "PO-2024-0043", grnNumber: "",
    notes: "6 units ordered — ETA 2024-12-01",
  },
  {
    id: "u024", sku: "RE-CLASSIC350-24", vin: "",
    brand: "Royal Enfield", model: "Classic 350", year: 2024, color: "Halcyon Black",
    category: "Classic", engineCC: 349,
    costPrice: 24000, sellingPrice: 28500,
    status: "In Transit", location: "In Transit",
    receivedDate: "", poNumber: "PO-2024-0043", grnNumber: "",
    notes: "4 units ordered — ETA 2024-12-01",
  },

  // ── Vogue (Submitted PO) ─────────────────────────────────────────────────────
  {
    id: "u025", sku: "VOG-URBAN200-24", vin: "",
    brand: "Vogue", model: "Urban 200", year: 2024, color: "Matte Grey",
    category: "Commuter", engineCC: 197,
    costPrice: 9800, sellingPrice: 11500,
    status: "In Transit", location: "In Transit",
    receivedDate: "", poNumber: "PO-2024-0046", grnNumber: "",
    notes: "8 units — PO submitted, awaiting confirmation",
  },

  // ── Indian (Draft PO) ────────────────────────────────────────────────────────
  {
    id: "u026", sku: "IND-CHIEF-24", vin: "",
    brand: "Indian", model: "Chief", year: 2024, color: "Spirit Blue Smoke",
    category: "Cruiser", engineCC: 1769,
    costPrice: 95000, sellingPrice: 109000,
    status: "In Transit", location: "In Transit",
    receivedDate: "", poNumber: "PO-2024-0044", grnNumber: "",
    notes: "2 units — PO pending management approval",
  },
];

// ── Model-level summary (aggregated view for stock management) ────────────────

export const inventoryModels: InventoryModel[] = [
  {
    sku: "KAW-Z900-24", brand: "Kawasaki", model: "Z900", year: 2024,
    category: "Naked", engineCC: 948,
    costPrice: 52000, sellingPrice: 59800,
    reorderPoint: 2, reorderQty: 4,
    totalStock: 3, availableStock: 2, reservedStock: 1, inTransitStock: 0, soldMTD: 0,
  },
  {
    sku: "KAW-NINJA400-24", brand: "Kawasaki", model: "Ninja 400", year: 2024,
    category: "Sport", engineCC: 399,
    costPrice: 28000, sellingPrice: 32500,
    reorderPoint: 3, reorderQty: 5,
    totalStock: 4, availableStock: 3, reservedStock: 1, inTransitStock: 0, soldMTD: 1,
  },
  {
    sku: "SUZ-GSX-R1000-24", brand: "Suzuki", model: "GSX-R1000", year: 2024,
    category: "Sport", engineCC: 999,
    costPrice: 78000, sellingPrice: 89900,
    reorderPoint: 1, reorderQty: 2,
    totalStock: 1, availableStock: 1, reservedStock: 0, inTransitStock: 1, soldMTD: 0,
  },
  {
    sku: "SUZ-SV650-24", brand: "Suzuki", model: "SV650", year: 2024,
    category: "Naked", engineCC: 645,
    costPrice: 35000, sellingPrice: 40500,
    reorderPoint: 2, reorderQty: 4,
    totalStock: 3, availableStock: 2, reservedStock: 1, inTransitStock: 0, soldMTD: 1,
  },
  {
    sku: "HND-CBR600RR-24", brand: "Honda", model: "CBR600RR", year: 2024,
    category: "Sport", engineCC: 599,
    costPrice: 45000, sellingPrice: 52000,
    reorderPoint: 2, reorderQty: 3,
    totalStock: 2, availableStock: 2, reservedStock: 0, inTransitStock: 1, soldMTD: 0,
  },
  {
    sku: "HND-PCX160-24", brand: "Honda", model: "PCX160", year: 2024,
    category: "Scooter", engineCC: 156,
    costPrice: 12500, sellingPrice: 14800,
    reorderPoint: 3, reorderQty: 5,
    totalStock: 4, availableStock: 3, reservedStock: 1, inTransitStock: 0, soldMTD: 1,
  },
  {
    sku: "RE-METEOR350-24", brand: "Royal Enfield", model: "Meteor 350", year: 2024,
    category: "Classic", engineCC: 349,
    costPrice: 22000, sellingPrice: 25800,
    reorderPoint: 3, reorderQty: 6,
    totalStock: 0, availableStock: 0, reservedStock: 0, inTransitStock: 6, soldMTD: 0,
  },
  {
    sku: "RE-CLASSIC350-24", brand: "Royal Enfield", model: "Classic 350", year: 2024,
    category: "Classic", engineCC: 349,
    costPrice: 24000, sellingPrice: 28500,
    reorderPoint: 2, reorderQty: 4,
    totalStock: 0, availableStock: 0, reservedStock: 0, inTransitStock: 4, soldMTD: 0,
  },
  {
    sku: "VOG-URBAN200-24", brand: "Vogue", model: "Urban 200", year: 2024,
    category: "Commuter", engineCC: 197,
    costPrice: 9800, sellingPrice: 11500,
    reorderPoint: 4, reorderQty: 8,
    totalStock: 0, availableStock: 0, reservedStock: 0, inTransitStock: 8, soldMTD: 3,
  },
  {
    sku: "IND-CHIEF-24", brand: "Indian", model: "Chief", year: 2024,
    category: "Cruiser", engineCC: 1769,
    costPrice: 95000, sellingPrice: 109000,
    reorderPoint: 1, reorderQty: 2,
    totalStock: 0, availableStock: 0, reservedStock: 0, inTransitStock: 2, soldMTD: 0,
  },
];

// ── Helper colour maps ────────────────────────────────────────────────────────

export const inventoryStatusColors: Record<string, string> = {
  "In Stock":     "bg-green-100 text-green-800",
  "Reserved":     "bg-blue-100 text-blue-800",
  "Sold":         "bg-gray-100 text-gray-600",
  "In Transit":   "bg-amber-100 text-amber-800",
  "Low Stock":    "bg-orange-100 text-orange-800",
  "Out of Stock": "bg-red-100 text-red-800",
};

export const categoryColors: Record<string, string> = {
  Sport:     "bg-red-50 text-red-700",
  Cruiser:   "bg-orange-50 text-orange-700",
  Commuter:  "bg-sky-50 text-sky-700",
  Adventure: "bg-teal-50 text-teal-700",
  Naked:     "bg-purple-50 text-purple-700",
  Scooter:   "bg-pink-50 text-pink-700",
  Classic:   "bg-amber-50 text-amber-700",
};

// ── Derived stats helpers ─────────────────────────────────────────────────────

export function getStockSummary() {
  const models = inventoryModels;
  return {
    totalModels:      models.length,
    totalUnits:       models.reduce((s, m) => s + m.totalStock, 0),
    availableUnits:   models.reduce((s, m) => s + m.availableStock, 0),
    reservedUnits:    models.reduce((s, m) => s + m.reservedStock, 0),
    inTransitUnits:   models.reduce((s, m) => s + m.inTransitStock, 0),
    soldMTD:          models.reduce((s, m) => s + m.soldMTD, 0),
    lowStockModels:   models.filter(m => m.availableStock <= m.reorderPoint && m.availableStock > 0),
    outOfStockModels: models.filter(m => m.availableStock === 0 && m.inTransitStock === 0),
    stockValue:       inventoryUnits
                        .filter(u => u.status !== "Sold" && u.status !== "In Transit")
                        .reduce((s, u) => s + u.costPrice, 0),
  };
}

export function getUnitsByBrand(brand: Brand) {
  return inventoryUnits.filter(u => u.brand === brand);
}

export function getModelsByBrand(brand: Brand) {
  return inventoryModels.filter(m => m.brand === brand);
}
