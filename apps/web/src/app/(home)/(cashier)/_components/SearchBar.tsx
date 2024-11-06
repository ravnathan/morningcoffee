'use client';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  return (
    <div className="flex justify-between px-10 items-center pt-10 w-full">
      <div className="text-3xl text-coffee font-bold">Choose Category</div>
      <div className="relative w-96">
        <input
          type="text"
          placeholder="Search here..."
          className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-coffee focus:border-transparent transition duration-300"
        />
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <FaSearch className="w-5 h-5" />
        </span>
      </div>
    </div>
  );
}
