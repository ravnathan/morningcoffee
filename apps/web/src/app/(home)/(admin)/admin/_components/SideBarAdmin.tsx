'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaListAlt, FaDollarSign, FaUserFriends, FaBox, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { onLogout } from '@/libs/action/user';

export default function SideBarAdmin() {
  const [activePage, setActivePage] = useState('');

  useEffect(() => {
    setActivePage(window.location.pathname);
  }, []);

  const handleItemClick = (path: string) => {
    setActivePage(path);
  };

  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full w-64 bg-white shadow-lg fixed top-0 left-0 flex flex-col p-6"
    >
      <div className="flex items-center justify-center py-6">
        <Link href={'/'}>
          <Image src={'/images/logo/logo.png'} width={100} height={100} alt="Logo" />
        </Link>
      </div>
      <div className="flex flex-col space-y-48">
        <div className="flex flex-col space-y-8 mt-8">
          <Link href="/admin/">
            <div
              onClick={() => handleItemClick('/report/transaction-history')}
              className={`flex items-center space-x-4 p-3 rounded-md transition-colors duration-300 cursor-pointer ${
                activePage === '/admin' ? 'bg-coffee text-white' : 'hover:bg-coffee hover:text-white'
              }`}
            >
              <div className="p-3">
                <FaListAlt />
              </div>
              <span className="font-semibold">Transaction History</span>
            </div>
          </Link>

          <Link href="/admin/profit">
            <div
              onClick={() => handleItemClick('/report/profit')}
              className={`flex items-center space-x-4 p-3 rounded-md transition-colors duration-300 cursor-pointer ${
                activePage === '/report/profit' ? 'bg-coffee text-white' : 'hover:bg-coffee hover:text-white'
              }`}
            >
              <div className="p-3">
                <FaDollarSign />
              </div>
              <span className="font-semibold">Profit</span>
            </div>
          </Link>

          <Link href="/admin/employees">
            <div
              onClick={() => handleItemClick('/admin/employees')}
              className={`flex items-center space-x-4 p-3 rounded-md transition-colors duration-300 cursor-pointer ${
                activePage === '/admin/employees' ? 'bg-coffee text-white' : 'hover:bg-coffee hover:text-white'
              }`}
            >
              <div className="p-3">
                <FaUserFriends />
              </div>
              <span className="font-semibold">Employees</span>
            </div>
          </Link>

          <Link href="/admin/products">
            <div
              onClick={() => handleItemClick('/admin/products')}
              className={`flex items-center space-x-4 p-3 rounded-md transition-colors duration-300 cursor-pointer ${
                activePage === '/admin/products' ? 'bg-coffee text-white' : 'hover:bg-coffee hover:text-white'
              }`}
            >
              <div className="p-3">
                <FaBox />
              </div>
              <span className="font-semibold">Products</span>
            </div>
          </Link>
        </div>
        <div>
          <button
            onClick={onLogout}
            className={`flex items-center space-x-4 p-3 rounded-md transition-colors duration-300 cursor-pointer w-full ${
              activePage === '/logout' ? 'bg-coffee text-white' : 'hover:bg-coffee hover:text-white'
            }`}
          >
            <div className="p-3">
              <FaSignOutAlt />
            </div>
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
