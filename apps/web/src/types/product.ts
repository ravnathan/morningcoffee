export interface ProductData {
  name: string;
  category_name?: string;
  size?: string;
  type?: string;
  medium?: number;
  iced_small?: number;
  iced_medium?: number;
  iced_large?: number;
  image_cold?: File;
  image_1?: File;
  stock?: number;
  stock_iced?: number;
  description?: string;
  description_iced?: string;
}

export interface ProductFetch {
  products: Array<{
    id: string;
    name: string;
    category_name: string;
    medium: number;
    iced_small?: number;
    iced_medium?: number;
    iced_large?: number;
    image_2?: string;
    image_1?: string;
    stock?: number;
    stock_iced?: number;
    description?: string;
    description_iced?: string;
    is_deleted: boolean;
    category: {
      hot_iced_variant: boolean;
      cold_only: boolean;
    };
  }>;
}

export interface ProductTemplate {
  prodID: string;
  name: string;
  medium?: number;
  iced_small?: number;
  iced_medium?: number;
  iced_large?: number;
  image_2?: string;
  image_1?: string;
  stock?: number;
  stock_iced?: number;
  description?: string;
  description_iced?: string;
  hot_iced_variant: boolean;
  cold_only: boolean;
}

export interface ProductTable {
  products: Array<{
    id: string;
    name: string;
    category_name: string;
    medium: number;
    iced_small?: number;
    iced_medium?: number;
    iced_large?: number;
    image_2?: string;
    image_1: string;
    stock: number;
    stock_iced?: number;
    description: string;
    description_iced?: string;
    is_deleted: boolean;
    category: {
      hot_iced_variant: boolean;
      cold_only: boolean;
    };
  }>;
}
