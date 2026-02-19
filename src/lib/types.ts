export type Brand = "Suzuki" | "Honda" | "Kawasaki" | "Vogue" | "Royal Enfield" | "Indian";

export type POStatus = "Draft" | "Submitted" | "Approved" | "Ordered" | "Partially Received" | "Received" | "Closed" | "Cancelled";

export type GRNStatus = "Pending" | "In Progress" | "Completed" | "Rejected";

export type InvoiceStatus = "Pending" | "Matched" | "Approved" | "Paid" | "Disputed" | "Overdue";

export type PaymentStatus = "Scheduled" | "Processing" | "Paid" | "Overdue" | "Cancelled";

export interface Vendor {
  id: string;
  name: string;
  brand: Brand;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  paymentTerms: string;
  leadTimeDays: number;
  rating: number;
  totalOrders: number;
  onTimeDeliveryRate: number;
  status: "Active" | "Inactive";
}

export interface POItem {
  id: string;
  sku: string;
  description: string;
  brand: Brand;
  category: "Motorcycle" | "Part" | "Accessory";
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  receivedQty: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendor: Vendor;
  brand: Brand;
  status: POStatus;
  items: POItem[];
  orderDate: string;
  expectedDelivery: string;
  totalAmount: number;
  notes: string;
  approvedBy?: string;
  approvedDate?: string;
}

export interface GRNItem {
  poItemId: string;
  sku: string;
  description: string;
  orderedQty: number;
  receivedQty: number;
  condition: "Good" | "Damaged" | "Pending Inspection";
  vinNumber?: string;
}

export interface GoodsReceivingNote {
  id: string;
  grnNumber: string;
  poNumber: string;
  vendor: string;
  brand: Brand;
  receivedDate: string;
  receivedBy: string;
  status: GRNStatus;
  items: GRNItem[];
  inspectionNotes: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  vendorInvoiceNumber: string;
  poNumber: string;
  grnNumber?: string;
  vendor: string;
  brand: Brand;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  tax: number;
  totalAmount: number;
  status: InvoiceStatus;
  matchStatus: "Unmatched" | "2-Way Match" | "3-Way Match";
}

export interface Payment {
  id: string;
  paymentNumber: string;
  invoiceNumber: string;
  vendor: string;
  brand: Brand;
  amount: number;
  dueDate: string;
  paidDate?: string;
  paymentMethod: "Bank Transfer" | "Cheque" | "Online";
  status: PaymentStatus;
  reference?: string;
}

// ── Inventory ────────────────────────────────────────────────────────────────

export type InventoryStatus = "In Stock" | "Reserved" | "Sold" | "In Transit" | "Low Stock" | "Out of Stock";

export type StockLocation = "Showroom" | "Warehouse" | "Service Bay" | "In Transit";

export type MotorcycleCategory = "Sport" | "Cruiser" | "Commuter" | "Adventure" | "Naked" | "Scooter" | "Classic";

export interface InventoryUnit {
  id: string;
  sku: string;
  vin: string;
  brand: Brand;
  model: string;
  year: number;
  color: string;
  category: MotorcycleCategory;
  engineCC: number;
  costPrice: number;
  sellingPrice: number;
  status: InventoryStatus;
  location: StockLocation;
  receivedDate: string;
  poNumber: string;
  grnNumber: string;
  reservedFor?: string;
  soldDate?: string;
  notes?: string;
}

export interface InventoryModel {
  sku: string;
  brand: Brand;
  model: string;
  year: number;
  category: MotorcycleCategory;
  engineCC: number;
  costPrice: number;
  sellingPrice: number;
  reorderPoint: number;
  reorderQty: number;
  totalStock: number;
  availableStock: number;
  reservedStock: number;
  inTransitStock: number;
  soldMTD: number;
}
