export interface CategoryProductForm {
  categories: Array<{
    id: string
    name: string;
    image: string;
    hot_iced_variant: boolean;
    cold_only: boolean;
    size_small: boolean;
    size_medium: boolean;
    size_large: boolean;
    is_deleted: boolean;
  }>;
}
