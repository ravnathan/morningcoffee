'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaFire, FaSnowflake } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function CoffeeTemplate() {
  const [type, setType] = useState('hot');
  const [size, setSize] = useState('M');

  return (
    <motion.div
      className="bg-white w-96 h-96 shadow-lg rounded-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex flex-col space-y-8 px-8">
        <motion.div
          className="flex gap-5 items-center pt-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Image
            src={'/images/category/coffee.png'}
            width={150}
            height={100}
            style={{ objectFit: 'cover' }}
            alt=""
          />
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-lg">Hot Cappucino</h3>
            <p className="text-sm text-gray-600">
              Made of espresso, steamed milk, and a thick layer of foamed milk.
            </p>
            <h3 className="font-semibold text-lg">Rp. 17.000</h3>
          </div>
        </motion.div>
        <div className="flex justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="font-semibold pb-4">Type</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => setType('hot')}
                className={`p-2 w-10 h-10 border rounded-full flex items-center justify-center ${type === 'hot' ? 'text-red-500 border-red-500' : 'text-gray-500 bg-gray-200 border-gray-400'}`}
              >
                <FaFire size={24} />
              </button>
              <button
                onClick={() => setType('ice')}
                className={`p-2 w-10 h-10 border rounded-full flex items-center justify-center ${type === 'ice' ? 'text-blue-500 border-blue-500' : 'text-gray-500 bg-gray-200 border-gray-400'}`}
              >
                <FaSnowflake size={24} />
              </button>
            </div>
          </motion.div>
          <motion.div
            className="font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="pb-4">Size</h3>
            <div className="flex space-x-4">
              {['S', 'M', 'L'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`p-2 border rounded-full w-10 h-10 ${size === s ? 'bg-coffee text-white' : 'border-gray-400 text-gray-600 bg-gray-200'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.button
          className="w-full bg-coffee text-white text-lg py-3 rounded-lg font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Add to Order
        </motion.button>
      </div>
    </motion.div>
  );
}
