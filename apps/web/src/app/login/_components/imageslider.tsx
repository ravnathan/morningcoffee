'use client';

import React, { useEffect, useState } from 'react';

const images = [
  '/images/carousel/coffee1.jpg',
  '/images/carousel/dessert1.jpg',
  '/images/carousel/milkbased1.jpg',
  '/images/carousel/pasta4.jpg',
  '/images/carousel/juice1.jpg',
  '/images/carousel/icecoffee2.jpg',
  '/images/carousel/pasta1.jpg',
  '/images/carousel/coffee2.jpg',
  '/images/carousel/snacks2.jpg',
  '/images/carousel/pasta3.jpg',
  '/images/carousel/juice2.jpg',
  '/images/carousel/dessert2.jpg',
  '/images/carousel/meal1.jpg',
  '/images/carousel/snacks1.jpg',
  '/images/carousel/dessert3.jpg',
  '/images/carousel/icecoffee1.jpg',
  '/images/carousel/coffee3.jpg',
  '/images/carousel/icecoffee3.jpg',
  '/images/carousel/dessert4.jpg',
  '/images/carousel/pasta2.jpg',
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="absolute inset-0 w-full h-screen overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
}
