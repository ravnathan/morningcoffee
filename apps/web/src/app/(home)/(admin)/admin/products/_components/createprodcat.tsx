'use client';

import { useState } from 'react';
import CreateProduct from './productform';
import ProductModal from './productmodal';
import CategoryModal from './categorymodal';
import CreateCategory from './categoryform';

export default function CreateProductCat() {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8 justify-center p-6">
      <div className="flex space-x-4">
        <button
          className="bg-coffee text-white font-semibold py-2 px-4 rounded-lg transform transition-transform duration-300 hover:scale-105"
          onClick={() => setProductModalOpen(true)}
        >
          Create Product
        </button>
        <button
          className="bg-lightbrown text-white font-semibold py-2 px-4 rounded-lg transform transition-transform duration-300 hover:scale-105"
          onClick={() => setCategoryModalOpen(true)}
        >
          Create Category
        </button>
      </div>
      {productModalOpen && (
        <ProductModal
          closeModal={() => setProductModalOpen(false)}
          children={<CreateProduct />}
        />
      )}
      {categoryModalOpen && (
        <CategoryModal
        closeModal={() => setCategoryModalOpen(false)}
        children={<CreateCategory/>}/>
      )}
    </div>
  );
}
