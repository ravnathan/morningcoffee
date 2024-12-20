'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaHome, FaHistory, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import Link from 'next/link';
import { getCookie } from '@/libs/action/server';
import { onLogout } from '@/libs/action/user';

export default function SideBarMenu() {
  const [activePage, setActivePage] = useState('');
  const [enable, setEnable] = useState();

  const fetchRole = async () => {
    const cookie = await getCookie('token');
    let payload = JSON.parse(atob(cookie!.split('.')[1]));
    setEnable(payload.role);
  };

  useEffect(() => {
    fetchRole();
  }, []);

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
      className="h-full w-52 bg-white shadow-lg fixed top-0 left-0 flex flex-col p-6"
    >
      <div className="flex items-center justify-center py-6">
        <Image src={'/images/logo/logo.png'} width={100} height={100} alt="Logo" />
      </div>
      <div className="flex flex-col space-y-16 mt-40">
        <Link href="/">
          <div
            onClick={() => handleItemClick('/')}
            className={`flex items-center space-x-4 p-3 rounded-md transition-colors duration-300 cursor-pointer ${
              activePage === '/' ? 'bg-coffee text-white' : 'hover:bg-coffee hover:text-white'
            }`}
          >
            <div className="p-3">
              <FaHome />
            </div>
            <span className="font-semibold">Home</span>
          </div>
        </Link>
        <Link href="/history">
          <div
            onClick={() => handleItemClick('/history')}
            className={`flex items-center space-x-4 p-3 rounded-md transition-colors duration-300 cursor-pointer ${
              activePage === '/history' ? 'bg-coffee text-white' : 'hover:bg-coffee hover:text-white'
            }`}
          >
            <div className="p-3">
              <FaHistory />
            </div>
            <span className="font-semibold">History</span>
          </div>
        </Link>
        {enable === 'admin' ? (
          <div className="flex flex-col space-y-16">
            <Link href="/admin">
              <div
                onClick={() => handleItemClick('/admin')}
                className={`flex items-center space-x-4 p-3 rounded-md transition-colors duration-300 cursor-pointer ${
                  activePage === '/admin' ? 'bg-coffee text-white' : 'hover:bg-coffee hover:text-white'
                }`}
              >
                <div className="p-3">
                  <FaTachometerAlt />
                </div>
                <span className="font-semibold">Admin Dashboard</span>
              </div>
            </Link>
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
        ) : (
          ''
        )}
      </div>
    </motion.aside>
  );
}
