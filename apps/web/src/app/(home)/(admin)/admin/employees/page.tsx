'use client';

import { boong } from '@/libs/fonts';
import EmployeeList from './_components/EmployeeList';
import CreateEmployee from './_components/CreateEmployee';
import ShiftDetails from './_components/ShiftDetails';

export default function Employees() {
  return (
    <div className="p-10 w-full">
      <div className="flex justify-between  border-b-2 border-coffee">
        <h1 className={`text-7xl ${boong.className} text-coffee pb-10`}>Employee List</h1>
        <CreateEmployee />
      </div>
      <div className='pt-10'>
        <EmployeeList />
        <ShiftDetails />
      </div>
    </div>
  );
}
