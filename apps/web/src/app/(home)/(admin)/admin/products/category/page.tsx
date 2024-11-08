'use client';

import { boong } from '@/libs/fonts';
import CreateProductCat from '../_components/CreateProdCat';
import ToolBar from '../_components/ToolBar';
import AppWrapper from '../_components/ProductWrapper';
import ProductList from '../_components/ProductList';
import CategoryList from './_components/CategoryList';

export default function CategoryPage() {
  return (
    <div className="p-10">
      <div className="flex justify-between border-b-2 border-coffee">
        <h1 className={`text-7xl ${boong.className} text-coffee pb-10`}>Categories</h1>
        <CreateProductCat />
      </div>
      <div className="pt-10 flex items-center justify-center">
        <ToolBar />
        <div className='w-full pt-20'>
          <AppWrapper>
            <CategoryList />
          </AppWrapper>
        </div>
      </div>
    </div>
  );
}
