'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface CategoryList {
  category_url: string;
  category_name: string;
  isActive: boolean;
}

export default function CategoryTemplate({ category_url, category_name, isActive }: CategoryList) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-main flex flex-col justify-end"
      >
        <Image
          src={category_url}
          alt="Category image"
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-110 bg-white"
        />
        <div
          className={`absolute bottom-0 w-full text-center py-1 ${isActive ? 'bg-coffee text-white' : 'bg-white bg-opacity-80 text-gray-800'}`}
        >
          <p className="text-sm font-semibold">{category_name}</p>
        </div>
      </motion.div>
    </div>
  );
}
