'use client';

import { useState } from 'react';
import PictureModal from '../../_components/picturemodal';

export default function CreateCategory() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [coldVariant, setColdVariant] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  const sizes = ['Small', 'Medium', 'Large'];

  const handleSizeChange = (size: string) => setSelectedSize(size);

  return (
    <form className="p-6 w-full mx-auto bg-transparent flex flex-col space-y-10">
      <div className="flex flex-col">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-b-2 p-2 outline-none"
          placeholder="Category Name"
        />
      </div>

      <div className="flex items-center space-x-4">
        <label className="text-gray-700">Cold Variant</label>
        <div
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
            coldVariant ? 'bg-coffee' : 'bg-gray-300'
          }`}
          onClick={() => setColdVariant(!coldVariant)}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              coldVariant ? 'translate-x-6' : ''
            }`}
          ></div>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700">Size</label>
        <div className="flex space-x-4">
          {sizes.map((size) => (
            <label key={size} className="flex items-center">
              <input
                type="radio"
                name="size"
                value={size}
                checked={selectedSize === size}
                onChange={() => handleSizeChange(size)}
                className="mr-2"
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-5">
        <label className="text-gray-700">Image</label>
        <button
          className="bg-coffee p-2 w-48 rounded-full text-white font-semibold"
          type="button"
          onClick={() => setModalOpen(true)}
        >
          Upload Image
        </button>
      </div>

      <div className="mx-auto pt-8">
        <button
          type="submit"
          className="bg-coffee w-48 text-white font-semibold p-2 rounded-full"
        >
          Submit
        </button>
      </div>

      {/* {modalOpen && (
        <PictureModal
          func={prepareImageHot}
          closeModal={() => setModalOpen(false)}
        />
      )} */}
    </form>
  );
}
