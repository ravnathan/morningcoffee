import { useCounterStore } from '@/zustand/counterstore';
import Image from 'next/image';

interface TemplateProps {
  img: string;
  name: string
  price: number;
}

export default function OrderTemplate({ img, name, price }: TemplateProps) {
 const count = useCounterStore((state) => state.count)

 const increment = useCounterStore((state) => state.increment)
 const decrement = useCounterStore((state) => state.decrement)

  return (
    <div className="bg-whiteish w-[380px] h-20 flex items-center justify-between px-4">
      <Image src={img} width={64} height={64} alt="Picture" />
      <div className="w-[200px] space-y-2">
        <p className="font-semibold">{name}</p>
        <div className="flex items-center space-x-2">
          <button onClick={decrement} className="px-2 py-1 bg-gray-200 rounded">-</button>
          <span>{count}</span>
          <button onClick={increment} className="px-2 py-1 bg-gray-200 rounded">+</button>
        </div>
      </div>
      <div>Rp. {price * count}</div>
    </div>
  );
}
