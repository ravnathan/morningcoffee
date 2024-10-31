'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaFire, FaSnowflake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ProductTemplate } from '@/types/product';
import { formatToRupiah } from '@/libs/formatrupiah';

export default function Template({
  name,
  price_medium,
  price_iced_small,
  price_iced_medium,
  price_iced_large,
  image_iced,
  image_hot,
  stock,
  stock_iced,
  description,
  description_iced,
  hot_iced_variant,
}: ProductTemplate) {
  const [type, setType] = useState<'hot' | 'ice'>('hot');
  const [size, setSize] = useState<'S' | 'M' | 'L'>('M');
  const [currentImage, setCurrentImage] = useState<File | undefined>(image_hot);

  useEffect(() => {
    setCurrentImage(type === 'hot' ? image_hot : image_iced);
  }, [type, image_hot, image_iced]);

  const getPrice = () => {
    if (type === 'hot') {
      return price_medium;
    } else {
      switch (size) {
        case 'S':
          return price_iced_small;
        case 'L':
          return price_iced_large;
        default:
          return price_iced_medium;
      }
    }
  };

  const getDescription = () =>
    type === 'hot' ? description : description_iced;

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
            src={`${currentImage}`}
            width={150}
            height={100}
            style={{ objectFit: 'cover' }}
            className="w-[150px] h-[150px]"
            alt={name}
          />
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-gray-600">{getDescription()}</p>
            <h3 className="font-semibold text-lg">
              {formatToRupiah(getPrice()!)}
            </h3>
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
                onClick={() => {
                  if (hot_iced_variant) {
                    setType('hot');
                    setSize('M');
                  }
                }}
                disabled={!hot_iced_variant}
                className={`p-2 w-10 h-10 border rounded-full flex items-center justify-center ${type === 'hot' ? 'text-red-500 border-red-500' : 'text-gray-500 bg-gray-200 border-gray-400'} ${!hot_iced_variant ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <FaFire size={24} />
              </button>
              <button
                onClick={() => {
                  if (hot_iced_variant) {
                    setType('ice');
                    setSize('M');
                  }
                }}
                disabled={!hot_iced_variant}
                className={`p-2 w-10 h-10 border rounded-full flex items-center justify-center ${type === 'ice' ? 'text-blue-500 border-blue-500' : 'text-gray-500 bg-gray-200 border-gray-400'} ${!hot_iced_variant ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <FaSnowflake size={24} />
              </button>
            </div>
          </motion.div>

          {type === 'ice' && hot_iced_variant && (
            <motion.div
              className="font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="pb-4">Size</h3>
              <div className="flex space-x-4">
                {['S', 'M', 'L'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s as 'S' | 'M' | 'L')}
                    className={`p-2 border rounded-full w-10 h-10 ${size === s ? 'bg-coffee text-white' : 'border-gray-400 text-gray-600 bg-gray-200'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
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
