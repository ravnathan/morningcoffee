"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'

interface CategoryList {
  category_url: string
  category_name: string
}

export default function CategoryTemplate({ category_url, category_name }: CategoryList) {
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
        {/* Image */}
        <Image
          src={category_url}
          alt="Category image"
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-110 bg-white"
        />
        
        {/* Text Overlay */}
        <div className="absolute bottom-0 w-full bg-white bg-opacity-80 text-center py-1">
          <p className="text-sm font-semibold text-gray-800">{category_name}</p>
        </div>
      </motion.div>
    </div>
  )
}
