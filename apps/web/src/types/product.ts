export interface ProductData {
    name: string
    category_name: string
    size?: string
    type?: string
    price_S?: number
    price_M: number
    price_L?: number
    image_cold?: File
    image_hot: File
    stock: number
    description: string
}