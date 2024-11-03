import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  header: string,
  message: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  header,
  message,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="max-w-md lg:mx-auto p-5 bg-white rounded-lg shadow-md mx-5">
        <h2 className="text-lg font-bold text-center">{header}</h2>
        <p className="my-4 text-center">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 w-24 bg-superlightbrown text-black rounded-md transition duration-200 hover:bg-coffee hover:text-white"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 w-24 bg-gray-300 text-black rounded-md transition duration-200 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
