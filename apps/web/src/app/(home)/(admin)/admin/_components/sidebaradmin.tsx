'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaFileAlt, FaListAlt, FaDollarSign, FaUserFriends, FaBox, FaSignOutAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function SideBarAdmin() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [activePage, setActivePage] = useState('');

  const menuItems = [
    {
      name: 'Report',
      icon: <FaFileAlt />,
      path: '/report',
      subMenu: [
        { name: 'Transaction History', icon: <FaListAlt />, path: '/report/transaction-history' },
        { name: 'Profit', icon: <FaDollarSign />, path: '/report/profit' },
      ],
    },
    { name: 'Employees', icon: <FaUserFriends />, path: '/admin/employees' },
    { name: 'Products', icon: <FaBox />, path: '/admin/products' },
  ];

  useEffect(() => {
    setActivePage(window.location.pathname);
  }, []);

  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full w-64 bg-white shadow-lg fixed top-0 left-0 flex flex-col p-6"
    >
      <div className="flex items-center justify-center py-6">
        <Image src={'/images/logo/logo.png'} width={100} height={100} alt="Logo" />
      </div>
      <ul className="space-y-4 mt-8">
        {menuItems.map((item, index) => (
          <div key={index}>
            <li
              onClick={() => {
                if (item.name === 'Report') {
                  setIsReportOpen(!isReportOpen);
                } else {
                  setActivePage(item.path);
                }
              }}
              className={`flex items-center justify-between space-x-4 p-3 rounded-md transition-colors duration-300 cursor-pointer ${
                activePage === item.path || (item.name === 'Report' && isReportOpen) ? 'bg-coffee text-white' : 'hover:bg-coffee hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3">{item.icon}</div>
                <span className="font-semibold">{item.name}</span>
              </div>
              {item.name === 'Report' && (
                <div className="text-gray-500">
                  {isReportOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              )}
            </li>

            {item.name === 'Report' && isReportOpen && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="ml-10 space-y-2 overflow-hidden"
              >
                {item.subMenu!.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    onClick={() => setActivePage(subItem.path)} // Set active page on click
                    className={`flex items-center space-x-3 p-2 pl-3 rounded-md transition-colors duration-300 cursor-pointer ${
                      activePage === subItem.path ? 'bg-coffee text-white' : 'hover:bg-superlightbrown'
                    }`}
                  >
                    <div className="text-black">{subItem.icon}</div>
                    <span className="text-black">{subItem.name}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        ))}
      </ul>
      <div className="mt-auto">
        <li
          className={`flex items-center space-x-4 p-3 rounded-md transition-colors duration-300 ${
            activePage === '/logout' ? 'bg-coffee text-white' : 'hover:bg-coffee hover:text-white'
          }`}
          onClick={() => setActivePage('/logout')}
        >
          <div className="p-3">{<FaSignOutAlt />}</div>
          <span className="font-semibold">Logout</span>
        </li>
      </div>
    </motion.aside>
  );
}
