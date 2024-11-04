import { useOrderStore } from '@/zustand/orderstore';
import OrderTemplate from './ordertemplate';

export default function OrderDetails() {
  const products = useOrderStore((state) => state.products);

  return (
    <div>
     
    </div>
  );
}
