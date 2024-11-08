interface ProductItem {
  product_id: string;
  qty: number; 
  variant: string; 
}

export interface ProductInfoStore {
  items: ProductItem[]; 
  payment_type: string
  debit_info: string | null
}


interface TransactionItem {
  product_id: string;
  qty: number;
  variant: string;
  price: number;
  total_price: number;
  product_name: string;
  product_image_1: string;
  product_image_2: string | null;
}

interface Transaction {
  id: string;
  total_price: number;
  cashier_on_duty: string;
  cashier_fullname: string
  transaction_date: string;
  payment_type: "cash" | "debit";
  transaction_items: TransactionItem[];
}

export interface TransactionResponse {
  transactions: Transaction[];
}

export interface ShiftData {
  startShiftTime: string;       
  endShiftTime: string;        
  startShiftValue: string;      
  endShiftValue: string;        
  shiftValueDifference: string; 
  totalCash: string;            
  totalDebit: string;           
  totalIncome: string;         
  match: boolean;              
}

export interface CashierShiftData {
  [cashierName: string]: ShiftData[]; 
}

interface SoldItem {
  name: string;
  variant: string;
  qty: number;
  totalPrice: number;
}

interface PaymentDetails {
  count: number;
  amount: number;
}

interface TransactionData {
  date: string;
  totalTransactions: number;
  totalAmount: number;
  cash: PaymentDetails;
  debit: PaymentDetails;
  soldItems: SoldItem[];
}

export type TransactionDialy = TransactionData[];
