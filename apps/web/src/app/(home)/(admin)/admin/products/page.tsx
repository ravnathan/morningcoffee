'use client'

import { boong } from '@/libs/fonts';
import ProductList from './_components/productlist';
import CreateProductCat from './_components/createprodcat';
import AppWrapper from './_components/productwrapper';

export default function Products() {
  return (
    <div className="p-10">
      <div className="flex justify-between border-b-2 border-coffee">
        <h1 className={`text-7xl ${boong.className} text-coffee pb-10`}>Products</h1>
        <CreateProductCat />
      </div>
      <div className='pt-10'>
        <AppWrapper>
          <ProductList />
        </AppWrapper>
      </div>
    </div>
  );
}
