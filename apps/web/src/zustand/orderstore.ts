import { create } from 'zustand'

type Product = {
    img: string;
    id: string; // Unique identifier for the product
    name: string;
    price: number;
    quantity: number;
}

type OrderStore = {
    products: Product[];
    addProduct: (product: Omit<Product, 'quantity'>) => void;
    removeProduct: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
    products: [],
    addProduct: (product) => set((state) => ({
        products: [...state.products, { ...product, quantity: 1 }]
    })),
    removeProduct: (id) => set((state) => ({
        products: state.products.filter(product => product.id !== id)
    })),
    updateQuantity: (id, quantity) => set((state) => ({
        products: state.products.map(product =>
            product.id === id ? { ...product, quantity } : product
        )
    })),
}));
