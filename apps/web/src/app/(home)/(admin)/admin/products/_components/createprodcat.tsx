'use client';

import { useState } from 'react';
import CategoryModal from './categorymodal';
import CreateCategory from './categoryform';
import AppWrapper from './productwrapper';
import Link from 'next/link';

export default function CreateProductCat() {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8 justify-center p-6">
      <div className="flex space-x-4">
        <Link href={'/admin/products/create'}>
          <button className="bg-coffee text-white font-semibold py-2 px-4 rounded-lg transform transition-transform duration-300 hover:scale-105">
            Create Product
          </button>
        </Link>
        <button
          className="bg-lightbrown text-white font-semibold py-2 px-4 rounded-lg transform transition-transform duration-300 hover:scale-105"
          onClick={() => setCategoryModalOpen(true)}
        >
          Create Category
        </button>
      </div>
      {categoryModalOpen && (
        <CategoryModal
          closeModal={() => setCategoryModalOpen(false)}
          children={
            <AppWrapper>
              <CreateCategory closeModal={() => setCategoryModalOpen(false)}/>
            </AppWrapper>
          }
        />
      )}
    </div>
  );
}
