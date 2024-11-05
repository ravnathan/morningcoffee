'use client';
import { motion } from 'framer-motion';
import { SetStateAction, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import CashierStatus from './cashierstatus';
import { FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';
import OrderTemplate from './ordertemplate';
import { OrderItem } from '../page';
import { useOrderStore } from '@/zustand/orderstore';
import { formatToRupiah } from '@/libs/formatrupiah';

interface OrderProps {
  items: OrderItem[];
  removeFromOrder: (id: string) => void;
}

export default function Order({ items, removeFromOrder }: OrderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('Debit Card');

  const handleSelectMethod = (method: SetStateAction<string>) => {
    setSelectedMethod(method);
  };

  const totalPrice = useOrderStore((state) => state.totalPrice);

  return (
    <div className="relative">
      {isExpanded && (
        <motion.div
          className="fixed inset-0 bg-black opacity-50 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.5 }}
        />
      )}

      <motion.div
        initial={{ width: 400 }}
        animate={{ width: isExpanded ? 1600 : 400 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="bg-white right-0 fixed z-10 h-full flex flex-col p-6 shadow-lg"
      >
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-coffee rounded-full p-2 shadow-xl flex items-center justify-center text-white"
          style={{ width: 40, height: 40 }}
        >
          {isExpanded ? <FaArrowRight size={20} /> : <FaArrowLeft size={20} />}
        </motion.button>

        <CashierStatus />
        <div className="flex items-center flex-col">
          <div className="h-[400px] overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <OrderTemplate
                  key={item.id}
                  id={item.id}
                  img={item.img}
                  name={item.name}
                  type={item.type}
                  size={item.size}
                  price={item.price}
                  hot_iced_variant={item.hot_iced_variant}
                  removeFromOrder={removeFromOrder}
                />
              ))}
            </div>
          </div>
          <div></div>
          <div className="w-80 mx-auto">
          <div className="w-full flex justify-between font-semibold text-lg py-10">
            <p>Total Price:</p>
            <p>{formatToRupiah(totalPrice)}</p>
          </div>
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
            <button className="w-full bg-coffee text-white text-lg py-4 rounded-lg font-semibold">Proceed</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}