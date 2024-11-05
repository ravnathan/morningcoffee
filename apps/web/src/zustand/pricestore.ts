import { create } from 'zustand'

type PriceStore = {
    totalPrice: number;
    addProductPrice: (price: number, quantity: number) => void;
    removeProductPrice: (price: number, quantity: number) => void;
    resetPrice: () => void;
}

export const usePriceStore = create<PriceStore>((set) => ({
    totalPrice: 0,
    addProductPrice: (price, quantity) => set((state) => ({
        totalPrice: state.totalPrice + price * quantity
    })),
    removeProductPrice: (price, quantity) => set((state) => ({
        totalPrice: state.totalPrice - price * quantity
    })),
    resetPrice: () => set({ totalPrice: 0 }),
}));