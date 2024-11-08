import React from 'react';
import CloseIcon from '../../_components/CloseIcon';


interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

export default function CreateEmployeeModal({ closeModal, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crop-image-dialog"
    >
      <div className="relative w-[30%] h-[60%] rounded-2xl bg-floral text-black text-left shadow-xl transition-all">
        <div className="px-5 py-4 relative">
          <button
            type="button"
            className="absolute top-2 right-2 rounded-md p-1 text-black hover:bg-coffee hover:text-white focus:outline-none"
            onClick={closeModal}
          >
            <span className="sr-only">Close menu</span>
            <CloseIcon />
          </button>
          <h2 className="text-center text-lg font-bold">Create Cashier</h2>
          <div className="flex justify-center items-center w-full h-full pt-20">{children}</div>
        </div>
      </div>
    </div>
  );
}
