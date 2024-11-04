'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import CashierStatus from './cashierstatus';
import OrderDetails from './orderdetails';
import Payment from './payment';

export default function Order() {
  const [isExpanded, setIsExpanded] = useState(false);

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
          <div className='h-[550px]'>
            <OrderDetails />
          </div>
          <Payment />
        </div>
      </motion.div>
    </div>
  );
}
