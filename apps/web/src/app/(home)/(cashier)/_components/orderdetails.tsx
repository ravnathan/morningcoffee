import { usePriceStore } from '@/zustand/pricestore';
import OrderTemplate from './ordertemplate';

export default function OrderDetails() {
  const products = usePriceStore((state) => state.products);

  return <div></div>;
}
