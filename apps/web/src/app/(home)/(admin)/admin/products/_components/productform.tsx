'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import PictureModal from '../../_components/picturemodal';
import { prepareImageHot } from '@/libs/action/products';

export default function CreateProduct() {
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [type, setType] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: string }>({});

  const categories = [
    'Coffee',
    'Juice',
    'Milk based',
    'Snacks',
    'Meals',
    'Dessert',
  ];
  const types = ['Hot', 'Cold'];
  const sizeOptions = ['Small', 'Medium', 'Large'];

  const isFormDisabled = name.trim() === ''; 

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setType([]); 
    setSizes([]); 
    setPrices({}); 
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value;
    setType((prev) =>
      prev.includes(selectedType)
        ? prev.filter((t) => t !== selectedType)
        : [...prev, selectedType]
    );
    setSizes([]); 
  };

  const handleSizeChange = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handlePriceChange = (size: string, value: string) => {
    setPrices((prev) => ({
      ...prev,
      [size]: value,
    }));
  };

  
  return (
    <form className="space-y-4 p-6 w-full mx-auto bg-transparent">
      <div className="flex flex-col">
        <label className="text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-b-2 p-2 outline-none"
          placeholder="Product Name"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700">Category</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border-b-2 p-2 outline-none"
          disabled={isFormDisabled}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`flex flex-col ${
          isFormDisabled || !(category === 'Coffee' || category === 'Milk based')
            ? 'opacity-50 pointer-events-none'
            : ''
        }`}
      >
        <label className="text-gray-700">Type</label>
        <div className="flex space-x-4">
          {types.map((t) => (
            <label key={t} className="flex items-center">
              <input
                type="checkbox"
                value={t}
                checked={type.includes(t)}
                onChange={handleTypeChange}
                className="mr-2"
              />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div
        className={`flex flex-col ${
          isFormDisabled ||
          !(
            (category === 'Coffee' && type.includes('Cold')) ||
            category === 'Juice' ||
            (category === 'Milk based' && type.includes('Cold'))
          )
            ? 'opacity-50 pointer-events-none'
            : ''
        }`}
      >
        <label className="text-gray-700">Size</label>
        <div className="flex space-x-4">
          {sizeOptions.map((size) => (
            <label key={size} className="flex items-center">
              <input
                type="checkbox"
                value={size}
                checked={sizes.includes(size)}
                onChange={() => handleSizeChange(size)}
                className="mr-2"
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700">Price</label>
        {sizes.length > 0 ? (
          ['Small', 'Medium', 'Large']
            .filter((size) => sizes.includes(size))
            .map((size) => (
              <input
                key={size}
                type="text"
                placeholder={`${size} Size Price`}
                value={prices[size] || ''}
                onChange={(e) => handlePriceChange(size, e.target.value)}
                className="border-b-2 p-2 outline-none mt-2"
                disabled={isFormDisabled}
              />
            ))
        ) : (
          <input
            type="text"
            placeholder="Price"
            className="border-b-2 p-2 outline-none"
            disabled={isFormDisabled}
          />
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700">Image</label>
        <div className="space-y-2 flex flex-col">
          {type.includes('Hot') && (
            <button
              className="bg-coffee p-2 w-48 rounded-full text-white font-semibold"
              disabled={isFormDisabled}
            >
              Upload Hot Image
            </button>
          )}
          {type.includes('Cold') && (
            <button
              className="bg-coffee p-2 w-48 rounded-full text-white font-semibold"
              disabled={isFormDisabled}
            >
              Upload Cold Image
            </button>
          )}
          {type.length === 0 && (
            <button
              className="bg-coffee p-2 w-48 rounded-full text-white font-semibold"
              disabled={isFormDisabled}
              type='button'
              onClick={() => setModalOpen(true)}
            >
              Upload Image
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700">Stock</label>
        <input
          type="number"
          className="border-b-2 p-2 outline-none"
          placeholder="Stock Quantity"
          disabled={isFormDisabled}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700">Description</label>
        <textarea
          className="border-b-2 p-2 outline-none resize-none"
          rows={4}
          placeholder="Product Description"
          disabled={isFormDisabled}
        ></textarea>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-coffee text-white font-semibold p-2 rounded-full mt-4"
        disabled={isFormDisabled}
      >
        Submit
      </motion.button>
      {modalOpen && (
        <PictureModal func={prepareImageHot} closeModal={() => setModalOpen(false)}/>
      )}
    </form>
  );
}
