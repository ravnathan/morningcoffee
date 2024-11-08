'use client';

import { useEffect, useState } from 'react';
import { getCategories } from '@/libs/action/home';
import CategoryTemplate from './CategoryTemplate';
import { CategoryProductForm } from '@/types/category';

interface CategoryProps {
  setSelectedCategory: (categoryName: string | null) => void;
  selectedCategory: string | null;
}

export default function Category({ setSelectedCategory, selectedCategory }: CategoryProps) {
  const [data, setData] = useState<CategoryProductForm>();

  const fetchData = async () => {
    try {
      const dat = await getCategories();
      setData(dat);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName === 'All' ? null : categoryName);
  };

  return (
    <div>
      <div className="flex items-center justify-evenly pt-10 flex-wrap">
        <button onClick={() => handleCategoryClick('All')}>
          <CategoryTemplate
            category_name="All"
            category_url={`${process.env.NEXT_PUBLIC_BASE_API_URL}public/categories/all.png`}
            isActive={selectedCategory === null}
          />
        </button>
        {data?.categories?.map((cat, key) => (
          <button key={key} onClick={() => handleCategoryClick(cat.name)}>
            <CategoryTemplate
              category_name={cat.name}
              category_url={cat.image}
              isActive={selectedCategory === cat.name}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
