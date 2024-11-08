'use client';

import { boong } from '@/libs/fonts';
import AppWrapper from '../../products/_components/ProductWrapper';
import ShiftDetails from './_components/ShiftDetails';

export default function EmployeePerformance() {
  return (
    <div className="w-full p-10">
      <h1 className={`text-7xl ${boong.className} text-coffee py-10 border-b-2 border-coffee`}>Cashier Performance</h1>
      <div className="pt-10">
        <AppWrapper>
          <ShiftDetails />
        </AppWrapper>
      </div>
    </div>
  );
}
