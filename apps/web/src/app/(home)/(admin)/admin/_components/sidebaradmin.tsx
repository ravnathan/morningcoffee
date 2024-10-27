'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaFileAlt, FaListAlt, FaDollarSign, FaUserFriends, FaBox, FaSignOutAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function SideBarAdmin() {
  const [isReportOpen, setIsReportOpen] = useState(false);

  const menuItems = [
    {
      name: "Report",
      icon: <FaFileAlt />,
      subMenu: [
        { name: "Transaction History", icon: <FaListAlt /> },
        { name: "Profit", icon: <FaDollarSign /> },
      ],
    },
    { name: "Employees", icon: <FaUserFriends /> },
    { name: "Products", icon: <FaBox /> },
  ];

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
              onClick={() => item.name === "Report" && setIsReportOpen(!isReportOpen)}
              className="flex items-center justify-between space-x-4 p-3 rounded-md transition-colors duration-300 hover:bg-coffee hover:text-white cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 rounded-full p-3 transition-colors duration-300 hover:bg-coffee hover:text-white">
                  {item.icon}
                </div>
                <span className="font-semibold hover:text-white">{item.name}</span>
              </div>
              {item.name === "Report" && (
                <div className="text-gray-500">
                  {isReportOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              )}
            </li>
            
            {item.name === "Report" && isReportOpen && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="ml-10 space-y-2 overflow-hidden"
              >
                {item.subMenu!.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="flex items-center space-x-3 p-2 pl-3 rounded-md transition-colors duration-300 hover:bg-coffee hover:text-white cursor-pointer"
                  >
                    <div className="text-gray-600 hover:text-white">
                      {subItem.icon}
                    </div>
                    <span className="text-gray-700 hover:text-white">{subItem.name}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        ))}
      </ul>
      <div className="mt-auto">
        <li
          className="flex items-center space-x-4 p-3 rounded-md transition-colors duration-300 hover:bg-coffee hover:text-white cursor-pointer"
        >
          <div className="bg-gray-100 rounded-full p-3 hover:bg-coffee hover:text-white transition-colors duration-300">
            <FaSignOutAlt />
          </div>
          <span className="font-semibold hover:text-white">Logout</span>
        </li>
      </div>
    </motion.aside>
  );
}
