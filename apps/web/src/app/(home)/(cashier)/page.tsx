'use client';

import { useEffect, useState } from 'react';
import { ProductFetch } from '@/types/product';
import { getProduct } from '@/libs/action/products';
import LoadingScreen from '@/components/loadingcomp';
import Order from './_components/Order';
import SearchBar from './_components/SearchBar';
import Category from './_components/Category';
import ProductCardTemplate from './_components/ProductTemplate';
import { FaSignOutAlt } from 'react-icons/fa';
import ShiftModal from './_components/ShiftModal';
import EndShift from './_components/EndShift';

export interface OrderItem {
  id: string;
  prodID: string;
  img: string;
  name: string;
  type: string;
  size: string | undefined;
  price: number;
  quantity: number;
  hot_iced_variant: boolean;
}

export default function Home() {
  const [data, setData] = useState<ProductFetch | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getProduct();
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  const addToOrder = (item: OrderItem) => {
    setOrderItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((orderItem) => orderItem.name === item.name && orderItem.price === item.price);

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromOrder = (id: string) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearOrderItems = () => {
    setOrderItems([]);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <div>No data found.</div>;
  }
  return (
    <div>
      <Order items={orderItems} removeFromOrder={removeFromOrder} clearOrderItems={clearOrderItems} />
      <button className="absolute w-14 h-14 right-3 z-40 top-6"
      onClick={() => setModalOpen(true)}>
        <div className="text-lg">
          <FaSignOutAlt />
        </div>
      </button>
      <div className="mr-[400px]">
        <SearchBar />
        <Category />
        <div className="pt-10 mx-10 flex flex-wrap gap-7">
          {data.products.map((product, index) => (
            <ProductCardTemplate
              key={index}
              prodID={product.id}
              name={product.name}
              medium={product.medium}
              image_2={product.image_2}
              image_1={product.image_1}
              stock={product.stock}
              description={product.description}
              description_iced={product.description_iced}
              hot_iced_variant={product.category.hot_iced_variant}
              cold_only={product.category.cold_only}
              iced_small={product.iced_small}
              iced_medium={product.iced_medium}
              iced_large={product.iced_large}
              addToOrder={addToOrder}
            />
          ))}
        </div>
      </div>
      {modalOpen && (
        <ShiftModal children={<EndShift/>} closeModal={() => setModalOpen(false)}/>
      )}
    </div>
  );
}
