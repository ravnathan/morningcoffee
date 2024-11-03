'use client';

import { useEffect, useState } from 'react';
import Category from './_components/category';
import Order from './_components/order';
import SearchBar from './_components/searchbar';
import { ProductFetch } from '@/types/product';
import { getProduct } from '@/libs/action/products';
import LoadingScreen from '@/components/loadingcomp';
import ProductCardTemplate from './_components/producttemplate';

export default function Home() {
  const [data, setData] = useState<ProductFetch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getProduct();
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  console.log(data);
  

  if (loading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <div>No data found.</div>;
  }
  return (
    <div>
      <Order />
      <div className="mr-[400px]">
        <SearchBar />
        <Category />
        <div className="pt-10 mx-10 flex flex-wrap gap-7">
          {data.products.map((product, index) => (
            <ProductCardTemplate
              key={index}
              name={product.name}
              medium={product.medium}
              image_iced={product.image_iced}
              image_hot={product.image_hot}
              stock={product.stock}
              description={product.description}
              description_iced={product.description_iced}
              hot_iced_variant={product.category.hot_iced_variant}
              iced_small={product.iced_small}
              iced_medium={product.iced_medium}
              iced_large={product.iced_large}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
