'use client';

import { getProduct } from '@/libs/action/products';
import { ProductFetch } from '@/types/product';
import { useEffect, useState } from 'react';
import Template from './_components/template';
import LoadingScreen from '@/components/loadingcomp';

export default function Trying() {
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

  if (loading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {data.products.map((product, index) => (
        <Template
          key={index}
          name={product.name}
          price_medium={product.price_medium}
          image_iced={product.image_iced}
          image_hot={product.image_hot}
          stock={product.stock}
          description={product.description}
          description_iced={product.description_iced}
          hot_iced_variant={product.category.hot_iced_variant}
          price_iced_small={product.price_iced_small}
          price_iced_medium={product.price_iced_medium}
          price_iced_large={product.price_iced_large}
        />
      ))}
    </div>
  );
}
