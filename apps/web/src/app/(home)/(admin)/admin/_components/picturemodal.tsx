import React from 'react';
import CloseIcon from './closeicon';
import ImageCropper from './imagecropper';
import { prepareImageHot } from '@/libs/action/products';

interface ModalProps {
  func: (data: string) => void;
  closeModal: () => void;
}

export default function PictureModal({ closeModal, func }: ModalProps) {
  return (
    <div
      className="relative z-10"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black bg-opacity-10 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center">
          <div className="relative w-[90%] sm:w-[60%] lg:w-[40%] min-h-[40vh] rounded-2xl bg-floral text-black text-left shadow-xl transition-all">
            <div className="px-5 py-4">
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center text-main-black hover:bg-main hover:text-secondary focus:outline-none absolute top-2 right-2"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                <CloseIcon />
              </button>
              <ImageCropper
                picture={func}
                closeModal={closeModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
