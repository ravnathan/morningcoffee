'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import { FaHome, FaHistory, FaTags, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function SideBarMenu() {
  const menuItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "History", icon: <FaHistory /> },
    { name: "Promo", icon: <FaTags /> },
    { name: "Report", icon: <FaChartBar /> },
    { name: "Settings", icon: <FaCog /> },
    { name: "Logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full w-64 bg-white shadow-lg fixed top-0 left-0 flex flex-col p-6"
    >
      <div className="flex items-center justify-center py-6">
        <Image
        src={'/images/logo/logo.png'}
        width={100}
        height={100}
        alt=""/>
      </div>
      <ul className="space-y-4 mt-8">
        {menuItems.slice(0, 5).map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 p-3 rounded-md transition-colors duration-300 hover:bg-coffee hover:text-white group"
          >
            <div className="bg-gray-100 rounded-full p-3 hover:bg-coffee group-hover:text-white transition-colors duration-300">
              {item.icon}
            </div>
            <span className="font-semibold group-hover:text-white">{item.name}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <li
          className="flex items-center space-x-4 p-3 rounded-md transition-colors duration-300 hover:bg-coffee hover:text-white group"
        >
          <div className="bg-gray-100 rounded-full p-3 hover:bg-coffee group-hover:text-white transition-colors duration-300">
            {menuItems[5].icon}
          </div>
          <span className="font-semibold group-hover:text-white">{menuItems[5].name}</span>
        </li>
      </div>
    </motion.aside>
  );
}
