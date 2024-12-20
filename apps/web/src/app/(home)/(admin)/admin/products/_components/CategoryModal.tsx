import React from 'react';
import CloseIcon from '../../_components/CloseIcon';

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

export default function CategoryModal({ closeModal, children }: ModalProps) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crop-image-dialog"
    >
      <div className="relative w-[50%] h-[80%] rounded-2xl bg-floral text-black text-left shadow-xl transition-all">
        <div className="px-5 py-4 relative">
          <button
            type="button"
            className="absolute top-2 right-2 rounded-md p-1 text-black hover:bg-coffee hover:text-white focus:outline-none"
            onClick={closeModal}
          >
            <span className="sr-only">Close menu</span>
            <CloseIcon />
          </button>
          <div className="flex justify-center items-center h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
