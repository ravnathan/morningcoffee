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