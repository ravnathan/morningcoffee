import { create } from 'zustand'

type CounterStore = {
    count: number
    increment: () => void
    decrement: () => void
}

export const useCounterStore = create<CounterStore>((set) => ({
    count: 1,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count > 1 ? state.count - 1 : state.count })),
}));
