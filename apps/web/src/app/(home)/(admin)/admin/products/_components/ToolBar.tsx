import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ToolBar() {
  const [activePage, setActivePage] = useState<string>('');

  useEffect(() => {
    setActivePage(window.location.pathname);
  }, []);

  return (
    <div className="absolute z-20 top-44">
      <div className="flex gap-6">
        <Link href={'/admin/products'}>
          <button
            className={`w-32 border-coffee border-2 font-semibold py-2 px-4 rounded-lg transform transition-transform duration-300 hover:scale-105 ${
              activePage === '/admin/products' ? 'bg-coffee text-white' : 'bg-white text-black'
            }`}
          >
            Product
          </button>
        </Link>
        <Link href={'/admin/products/category'}>
          <button
            className={`w-32 border-coffee border-2 font-semibold py-2 px-4 rounded-lg transform transition-transform duration-300 hover:scale-105 ${
              activePage === '/admin/products/category' ? 'bg-coffee text-white' : 'bg-white text-black'
            }`}
          >
            Category
          </button>
        </Link>
      </div>
    </div>
  );
}
