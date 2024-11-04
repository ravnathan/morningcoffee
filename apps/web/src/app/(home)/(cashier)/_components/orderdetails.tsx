import { useOrderStore } from '@/zustand/orderstore';
import OrderTemplate from './ordertemplate';

export default function OrderDetails() {
  const products = useOrderStore((state) => state.products);

  return (
    <div>
      {products.length === 0 ? (
        <p>No products ordered.</p>
      ) : (
        products.map((product) => (
          <OrderTemplate
            key={product.id}
            img={product.img} // Assuming you have an img field in the product
            id={product.id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
          />
        ))
      )}
    </div>
  );
}
