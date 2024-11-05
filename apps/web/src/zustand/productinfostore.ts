import { create } from 'zustand';

type ProductInfoStore = {
    items: Array<{ id: string; prodID: string; quantity: number; variant: string | undefined }>;
    addProductInfo: (id: string, prodID: string, quantity: number, variant: string | undefined) => void;
    removeProductInfo: (id: string) => void;
    resetProductInfo: () => void;
}

export const useProductInfoStore = create<ProductInfoStore>((set) => ({
    price: 0,
    items: [],
    addProductInfo: (id, prodID, quantity, variant) => set((state) => ({
        items: [...state.items, { id, prodID, quantity, variant }],
    })),
    removeProductInfo: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id),
    })),
    resetProductInfo: () => set({ items: [] }),
}));
