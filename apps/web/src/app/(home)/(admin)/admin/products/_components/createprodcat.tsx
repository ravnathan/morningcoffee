'use client';

import { useState } from 'react';
import Modal from '../../_components/modal';
import CreateProduct from './productform';


export default function CreateProductCat() {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8 justify-center p-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Manage Products and Categories
      </h1>
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
        <Modal closeModal={() => setProductModalOpen(false)} children={<CreateProduct/>}/>
      )}
      {/* {categoryModalOpen && (
        <Modal closeModal={() => setCategoryModalOpen(false)} />
      )} */}
    </div>
  );
}
