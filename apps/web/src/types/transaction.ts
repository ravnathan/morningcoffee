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
