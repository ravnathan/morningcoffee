export interface ProductData {
  name: string;
  category_name: string;
  size?: string;
  type?: string;
  price_S?: number;
  price_M: number;
  price_L?: number;
  image_cold?: File;
  image_hot: File;
  stock: number;
  description: string;
}

export interface ProductFetch {
  products: Array<{
    name: string;
    category_name: string;
    medium: number;
    iced_small?: number;
    iced_medium?: number;
    iced_large?: number;
    image_iced?: File;
    image_hot: File;
    stock: number;
    stock_iced?: number;
    description: string;
    description_iced?: string;
    is_deleted: boolean;
    category: {
      hot_iced_variant: boolean;
    };
  }>;
}

export interface ProductTemplate {
  name: string;
  medium: number;
  iced_small?: number;
  iced_medium?: number;
  iced_large?: number;
  image_iced?: File;
  image_hot: File;
  stock: number;
  stock_iced?: number;
  description: string;
  description_iced?: string;
  hot_iced_variant: boolean;
}
