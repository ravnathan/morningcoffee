import { create } from 'zustand'

type OrderStore = {
    totalPrice: number;
    addProductPrice: (price: number, quantity: number) => void;
    removeProductPrice: (price: number, quantity: number) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
    totalPrice: 0,
    addProductPrice: (price, quantity) => set((state) => ({
        totalPrice: state.totalPrice + price * quantity
    })),
    removeProductPrice: (price, quantity) => set((state) => ({
        totalPrice: state.totalPrice - price * quantity
    })),
}));
