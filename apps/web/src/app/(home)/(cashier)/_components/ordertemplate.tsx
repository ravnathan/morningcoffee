import { useOrderStore } from '@/zustand/orderstore';
import Image from 'next/image';

interface TemplateProps {
  img: File;
  id: string; // Include the product ID for identifying
  name: string;
  price: number;
  quantity: number; // Pass quantity from Zustand
}

export default function OrderTemplate({ img, id, name, price, quantity }: TemplateProps) {
  // Destructure the required function from the store
  const { updateQuantity } = useOrderStore((state) => ({
    updateQuantity: state.updateQuantity, // Include this to avoid the error
  }));

  return (
    <div className="bg-whiteish w-[380px] h-20 flex items-center justify-between px-4">
      <Image src={`${img}`} width={64} height={64} alt="Picture" />
      <div className="w-[200px] space-y-2">
        <p className="font-semibold">{name}</p>
        <div className="flex items-center space-x-2">
          <button onClick={() => updateQuantity(id, Math.max(1, quantity - 1))} className="px-2 py-1 bg-gray-200 rounded">
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => updateQuantity(id, quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">
            +
          </button>
        </div>
      </div>
      <div>Rp. {price * quantity}</div>
    </div>
  );
}
