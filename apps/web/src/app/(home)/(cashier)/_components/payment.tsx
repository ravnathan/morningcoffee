'use client';
import { SetStateAction, useState } from 'react';
import { FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState('Debit Card');

  const handleSelectMethod = (method: SetStateAction<string>) => {
    setSelectedMethod(method);
  };

  return (
    <div className="w-80 mx-auto">
      <div className="text-xl font-semibold mb-4">Payment Method</div>
      <div className="flex justify-evenly mb-6">
        <button
          onClick={() => handleSelectMethod('Cash')}
          className={`flex flex-col items-center justify-center w-28 h-20 rounded-lg border-2 ${
            selectedMethod === 'Cash' ? 'border-coffee bg-white' : 'border-transparent bg-gray-100'
          } transition duration-300`}
        >
          <FaMoneyBillWave className="w-8 h-8 text-gray-600 mb-1" />
          <span className="text-gray-600 font-semibold">Cash</span>
        </button>
        <button
          onClick={() => handleSelectMethod('Debit Card')}
          className={`flex flex-col items-center justify-center w-28 h-20 rounded-lg border-2 ${
            selectedMethod === 'Debit Card' ? 'border-coffee bg-white' : 'border-transparent bg-gray-100'
          } transition duration-300`}
        >
          <FaCreditCard className="w-8 h-8 text-gray-600 mb-1" />
          <span className="text-gray-600 font-semibold">Debit Card</span>
        </button>
      </div>
      <button className="w-full bg-coffee text-white text-lg py-4 rounded-lg font-semibold">
        Proceed
      </button>
    </div>
  );
}
