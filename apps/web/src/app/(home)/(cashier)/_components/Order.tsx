'use client';
import { motion } from 'framer-motion';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';
import { OrderItem } from '../page';
import { usePriceStore } from '@/zustand/pricestore';
import { formatToRupiah } from '@/libs/formatrupiah';
import { ProductInfoStore } from '@/types/transaction';
import { transactionProcess } from '@/libs/action/transaction';
import { toast } from 'react-toastify';
import { useProductInfoStore } from '@/zustand/productinfostore';
import CashierStatus from './CashierStatus';
import OrderTemplate from './OrderTemplate';

interface OrderProps {
  items: OrderItem[];
  removeFromOrder: (id: string) => void;
  clearOrderItems: () => void;
}

export default function Order({ items, removeFromOrder, clearOrderItems }: OrderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('cash');
  const [rawDebitInfo, setRawDebitInfo] = useState('');
  const [cashReceived, setCashReceived] = useState<number | null>(null);

  const handleSelectMethod = (method: SetStateAction<string>) => {
    setSelectedMethod(method);
    if (method === 'cash') {
      setRawDebitInfo('');
    } else if (method === 'debit') {
      setCashReceived(null);
    }
  };

  const totalPrice = usePriceStore((state) => state.totalPrice);
  const productInfo = useProductInfoStore((state) => state.items);
  const resetProductInfo = useProductInfoStore((state) => state.resetProductInfo);

  const formatDebitInfo = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    const formattedValue = cleanValue.replace(/(\d{4})(?=\d)/g, '$1-');
    return formattedValue;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/[^0-9]/g, ''); 
  const numericValue = parseFloat(value);

  if (!isNaN(numericValue)) {
    setCashReceived(numericValue);
  } else {
    setCashReceived(null);
  }
};

  const handleDebitInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const cleanInput = inputValue.replace(/-/g, '');

    if (cleanInput.length <= 16) {
      setRawDebitInfo(cleanInput);
    }
  };

  const onCreateTransaction = async () => {
    if (productInfo.length === 0) {
      toast.error('No items to process in the transaction');
      return;
    }
    try {
      const data: ProductInfoStore = {
        items: productInfo.map((item) => ({
          product_id: item.prodID,
          qty: item.quantity,
          variant: item.variant || '',
        })),
        payment_type: selectedMethod,
        debit_info: selectedMethod === 'debit' ? rawDebitInfo : null,
      };
      const res = await transactionProcess(data);
      toast.success(res.msg);
      resetProductInfo();
      clearOrderItems();
      setCashReceived(null);
      setRawDebitInfo('');
    } catch (error) {
      toast.error('Transaction Failed');
    }
  };

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
        <div className="pb-8">
          <CashierStatus />
        </div>
        <div className="flex items-center flex-col">
          <div className="h-[400px] overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <OrderTemplate
                  key={item.id}
                  id={item.id}
                  prodID={item.prodID}
                  img={item.img}
                  name={item.name}
                  type={item.type}
                  size={item.size}
                  price={item.price}
                  hot_iced_variant={item.hot_iced_variant}
                  removeFromOrder={removeFromOrder}
                  clearOrderItems={clearOrderItems}
                />
              ))}
            </div>
          </div>
          <div></div>
          <div className="w-80 mx-auto">
            <div className="py-6 ">
              <div className="h-6">
                {cashReceived !== null && (
                  <div className="w-full flex justify-between font-semibold">
                    <p>Money Received:</p>
                    <p>{formatToRupiah(cashReceived!)}</p>
                  </div>
                )}
              </div>
              <div className="h-6 w-full flex justify-between font-semibold">
                <p>Total Price:</p>
                <p>{formatToRupiah(totalPrice)}</p>
              </div>
              <div className='h-6 border-t-2'>
                {cashReceived !== null && cashReceived > totalPrice && (
                  <div className=" w-full flex justify-between font-semibold">
                    <p>Change:</p>
                    <p>{formatToRupiah(cashReceived - totalPrice)}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-xl font-semibold mb-4">Payment Method</div>
            <div className="flex justify-evenly mb-6">
              <button
                onClick={() => handleSelectMethod('cash')}
                className={`flex flex-col items-center justify-center w-28 h-20 rounded-lg border-2 ${
                  selectedMethod === 'cash' ? 'border-coffee bg-white' : 'border-transparent bg-gray-100'
                } transition duration-300`}
              >
                <FaMoneyBillWave className="w-8 h-8 text-gray-600 mb-1" />
                <span className="text-gray-600 font-semibold">Cash</span>
              </button>
              <button
                onClick={() => handleSelectMethod('debit')}
                className={`flex flex-col items-center justify-center w-28 h-20 rounded-lg border-2 ${
                  selectedMethod === 'debit' ? 'border-coffee bg-white' : 'border-transparent bg-gray-100'
                } transition duration-300`}
              >
                <FaCreditCard className="w-8 h-8 text-gray-600 mb-1" />
                <span className="text-gray-600 font-semibold">Debit Card</span>
              </button>
            </div>
            <div className="mb-4 h-12">
              {' '}
              {selectedMethod === 'debit' && (
                <input
                  type="text"
                  placeholder="Enter Debit Info"
                  value={formatDebitInfo(rawDebitInfo)}
                  onChange={handleDebitInfoChange}
                  className="w-full p-2 border border-coffee rounded-lg"
                />
              )}
              {selectedMethod === 'cash' && (
                <input
                  type="number"
                  placeholder="Enter received amount"
                  value={cashReceived !== null ? cashReceived : ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-coffee rounded-lg"
                />
              )}
            </div>
            <button
              className={`w-full bg-coffee text-white text-lg py-4 rounded-lg font-semibold transition-opacity duration-300 ${selectedMethod === 'debit' && rawDebitInfo.length !== 16 ? 'opacity-50 cursor-not-allowed' : ''} ${selectedMethod === 'cash' && (cashReceived === null || cashReceived <= totalPrice) ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={onCreateTransaction}
              disabled={
                (selectedMethod === 'debit' && rawDebitInfo.length !== 16) ||
                (selectedMethod === 'cash' && (cashReceived === null || cashReceived <= totalPrice))
              }
            >
              Proceed
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
