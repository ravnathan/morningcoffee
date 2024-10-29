'use client';

import { useState } from 'react';
import Modal from '../(home)/(admin)/admin/_components/modal';
import ImageCropper from '../(home)/(admin)/admin/_components/imagecropper';
import { createProduct, prepareImageHot } from '@/libs/action/products';
import PictureModal from '../(home)/(admin)/admin/_components/picturemodal';

export default function TestModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Hi</button>
      {isOpen && 
      <PictureModal
        func={prepareImageHot}
        closeModal={() => setIsOpen(false)}
      />}
    </div>
  );
}
