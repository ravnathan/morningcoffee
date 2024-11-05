'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaHome, FaHistory, FaSignOutAlt } from 'react-icons/fa';

export default function SideBarMenu() {
  const [activeItem, setActiveItem] = useState('/');

  useEffect(() => {
    setActiveItem(window.location.pathname);
  }, []);

  const menuItems = [
    { name: 'Home', icon: <FaHome />, path: '/' },
    { name: 'History', icon: <FaHistory />, path: '/history' },
    { name: 'Logout', icon: <FaSignOutAlt />, path: '/logout' },
  ];

  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full w-52 bg-white shadow-lg fixed top-0 left-0 flex flex-col p-6"
    >
      <div className="flex items-center justify-center py-6">
        <Image src={'/images/logo/logo.png'} width={100} height={100} alt="Logo" />
      </div>
      <ul className="space-y-16 mt-40">
        {menuItems.slice(0, 2).map((item, index) => (
          <li
            key={index}
            className={`flex items-center space-x-4 p-3 rounded-md transition-colors duration-300 ${
              activeItem === item.path ? 'bg-coffee text-white' : 'hover:bg-coffee hover:text-white'
            }`}
            onClick={() => setActiveItem(item.path)}
          >
            <div className="p-3">{item.icon}</div>
            <span className="font-semibold">{item.name}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <li
          className={`flex items-center space-x-4 p-3 rounded-md transition-colors duration-300 ${
            activeItem === menuItems[2].path ? 'bg-coffee text-white' : 'hover:bg-coffee hover:text-white'
          }`}
          onClick={() => setActiveItem(menuItems[2].path)}
        >
          <div className="p-3">{menuItems[2].icon}</div>
          <span className="font-semibold">{menuItems[2].name}</span>
        </li>
      </div>
    </motion.aside>
  );
}
