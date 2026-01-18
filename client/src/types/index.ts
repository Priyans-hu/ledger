/**
 * Ledger Application Type Definitions
 * These types define the structure of data entities used throughout the application.
 */

// ============================================
// Store / User Types
// ============================================

export interface Store {
  storeId: number;
  storeName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  gstNumber?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  phoneNumber: string;
  password: string;
}

export interface RegisterData {
  storeName: string;
  phoneNumber: string;
  password: string;
  email?: string;
  address?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    store: Store;
  };
}

// ============================================
// Customer Types
// ============================================

export interface Customer {
  customerId: number;
  storeId: number;
  name: string;
  phoneNumber: string;
  email?: string;
  address: string;
  totalSpent: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CustomerFormData {
  name: string;
  phoneNumber: string;
  email?: string;
  address: string;
}

export interface CustomerListResponse {
  success: boolean;
  data: {
    customers: Customer[];
    pagination: Pagination;
  };
}

// ============================================
// Transaction Types
// ============================================

export type TransactionType = 'credit' | 'debit';

export type PaymentMethod = 'cash' | 'upi' | 'neft' | 'cheque' | 'card';

export type ExpenseCategory =
  | 'none'
  | 'rent'
  | 'utilities'
  | 'supplies'
  | 'salary'
  | 'marketing'
  | 'maintenance'
  | 'transport'
  | 'inventory'
  | 'other';

export interface Transaction {
  transactionId: number;
  storeId: number;
  customerId?: number;
  customerName?: string;
  amount: number;
  type: TransactionType;
  method: PaymentMethod;
  category?: ExpenseCategory;
  description?: string;
  date: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TransactionFormData {
  amount: number;
  type: TransactionType;
  method: PaymentMethod;
  category?: ExpenseCategory;
  description?: string;
  date: string;
  customerId?: number | null;
}

export interface TransactionSummary {
  totalCredit: number;
  totalDebit: number;
  netBalance: number;
}

export interface TransactionListResponse {
  success: boolean;
  data: {
    transactions: Transaction[];
    summary: TransactionSummary;
    pagination?: Pagination;
  };
}

// ============================================
// Invoice Types
// ============================================

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'cancelled';

export interface InvoiceItem {
  itemId?: number;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Invoice {
  invoiceId: number;
  invoiceNumber: string;
  storeId: number;
  customerId?: number;
  customerName?: string;
  billingAddress?: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  status: InvoiceStatus;
  notes?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface InvoiceFormData {
  customerId?: number;
  billingAddress: string;
  items: Omit<InvoiceItem, 'itemId' | 'totalPrice'>[];
  discount?: number;
  taxRate?: number;
  notes?: string;
  dueDate?: string;
}

export interface InvoiceSummary {
  totalInvoices: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
}

export interface InvoiceListResponse {
  success: boolean;
  data: {
    invoices: Invoice[];
    summary?: InvoiceSummary;
  };
}

// ============================================
// Common Types
// ============================================

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// ============================================
// Filter & Sort Types
// ============================================

export type SortOrder = 'asc' | 'desc';

export interface CustomerFilters {
  search?: string;
  sortBy?: 'name' | 'total_spent' | 'created_at';
  order?: SortOrder;
  limit?: number;
  offset?: number;
}

export interface TransactionFilters {
  month?: number;
  year?: number;
  date?: string;
  type?: TransactionType;
  method?: PaymentMethod;
  category?: ExpenseCategory;
  limit?: number;
  offset?: number;
}

export interface InvoiceFilters {
  status?: InvoiceStatus;
  customerId?: number;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

// ============================================
// Form Validation Types
// ============================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// ============================================
// Dashboard Types
// ============================================

export interface DashboardMetrics {
  totalTransactions: number;
  totalCredit: number;
  totalDebit: number;
  netBalance: number;
  totalCustomers: number;
  totalInvoices: number;
}

export interface MonthlyTransactionCount {
  month: string;
  count: number;
  credit: number;
  debit: number;
}

export interface ExpenseSummary {
  category: ExpenseCategory;
  total: number;
  percentage: number;
}
