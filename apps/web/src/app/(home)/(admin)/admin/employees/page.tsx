'use client';

import { boong } from '@/libs/fonts';
import EmployeeList from './_components/EmployeeList';
import CreateEmployee from './_components/CreateEmployee';
import Link from 'next/link';

export default function Employees() {
  return (
    <div className="p-10 w-full">
      <div className="flex justify-between  border-b-2 border-coffee items-center">
        <h1 className={`text-7xl ${boong.className} text-coffee pb-10`}>Employee List</h1>
        <div className="flex items-center">
          <Link href={'/admin/employees/performance'}>
            <button className="bg-coffee text-white h-10 font-semibold  px-4 rounded-lg transform transition-transform duration-300 hover:scale-105">
              Performance
            </button>
          </Link>
          <CreateEmployee />
        </div>
      </div>
      <div className="pt-10">
        <EmployeeList />
      </div>
    </div>
  );
}
