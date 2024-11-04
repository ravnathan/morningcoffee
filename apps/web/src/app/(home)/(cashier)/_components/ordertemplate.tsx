import { capitalizeFirstLetter } from '@/libs/formatcapital';
import { formatToRupiah } from '@/libs/formatrupiah';
import Image from 'next/image';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

interface TemplateProps {
  img: string;
  id: string; 
  name: string;
  type: string;
  size: string;
  price: number; 
  hot_iced_variant: boolean;
  removeFromOrder: (id: string) => void; 
}

export default function OrderTemplate({ img, id, name, type, size, price, hot_iced_variant, removeFromOrder }: TemplateProps) {
  const [quantity, setQuantity] = useState(1); 

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev)); 
  };

  return (
    <div className="bg-whiteish w-[380px] h-20 flex items-center justify-between px-4 rounded-lg shadow-sm gap-3">
      <Image src={`${img}`} width={64} height={64} alt="Product Image" />
      <div className="w-[200px] space-y-2">
      <p className="font-semibold text-sm">
          {hot_iced_variant ? `${capitalizeFirstLetter(type)} ` : ''}
          {name}
          {type === 'ice' && ` (${size.charAt(0).toUpperCase()})`}
        </p>
        <div className="flex items-center space-x-2">
          <button onClick={handleDecrement} className="px-2 py-1 bg-gray-200 rounded text-sm font-medium">
            -
          </button>
          <span className="text-sm">{quantity}</span>
          <button onClick={handleIncrement} className="px-2 py-1 bg-gray-200 rounded text-sm font-medium">
            +
          </button>
        </div>
      </div>
      <div className="text-sm font-semibold w-20">{formatToRupiah(price * quantity)}</div>
      <button 
        onClick={() => removeFromOrder(id)}
        className="text-red-500 hover:text-red-700 p-2"
        aria-label="Remove item"
      >
        <FaTrash size={16} />
      </button>
    </div>
  );
}
