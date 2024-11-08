'use client';

import { useEffect, useState } from 'react';
import { ProductFetch } from '@/types/product';
import { getProdByCategory, getProduct } from '@/libs/action/products';
import LoadingScreen from '@/components/loadingcomp';
import Order from './_components/Order';
import Category from './_components/Category';
import ProductCardTemplate from './_components/ProductTemplate';
import { FaSignOutAlt } from 'react-icons/fa';
import ShiftModal from './_components/ShiftModal';
import EndShift from './_components/EndShift';
import { getCookie } from '@/libs/action/server';
import { boong } from '@/libs/fonts';
import { TextField } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [enable, setEnable] = useState();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchRole = async () => {
    const cookie = await getCookie('token');
    let payload = JSON.parse(atob(cookie!.split('.')[1]));
    setEnable(payload.role);
  };

  useEffect(() => {
    fetchRole();
  }, []);

  const fetchProducts = async (categoryName: string | null) => {
    setLoading(true);
    if (categoryName && categoryName !== 'All') {
      const categoryData = await getProdByCategory(categoryName);
      setData(categoryData);
    } else {
      const allProducts = await getProduct();
      setData(allProducts);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const addToOrder = (item: OrderItem) => {
    setOrderItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (orderItem) => orderItem.name === item.name && orderItem.price === item.price
      );

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = data?.products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {

    const categoryFromURL = searchParams.get('category');
    const searchFromURL = searchParams.get('search') || '';

    if (categoryFromURL) setSelectedCategory(categoryFromURL);
    setSearchQuery(searchFromURL);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (searchQuery) params.set('search', searchQuery);
    router.replace(`?${params.toString()}`);
  }, [selectedCategory, searchQuery, router]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  return (
    <div>
      <Order items={orderItems} removeFromOrder={removeFromOrder} clearOrderItems={clearOrderItems} />
      {enable === 'cashier' ? (
        <button
          className="fixed w-24 h-8 pl-4 right-3 z-20 top-5 bg-coffee rounded-full flex items-center gap-2 text-white"
          onClick={() => setModalOpen(true)}
        >
          <p className="text-sm">Logout</p>
          <FaSignOutAlt />
        </button>
      ) : (
        ''
      )}
      <div className="mr-[400px]">
        <div className='flex justify-between p-10'>
          <h1 className={`text-7xl text-coffee ${boong.className}`}>Choose Category</h1>
          <div className="w-96">
            <TextField
              label="Search Products"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                marginBottom: '1rem',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '9999px',
                },
              }}
            />
          </div>
        </div>
        <Category setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
        <div className="pt-10 mx-10 flex flex-wrap gap-7">
          {filteredProducts?.map((product, index) => (
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
      {modalOpen && <ShiftModal children={<EndShift closeModal={() => setModalOpen(false)} />} closeModal={() => setModalOpen(false)} />}
    </div>
  );
}
