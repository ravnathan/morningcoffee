'use client'

import { boong } from '@/libs/fonts';
import SoldItemsReport from './_component/SoldItemsReport';
import AppWrapper from '../products/_components/ProductWrapper';

export default function Profit() {
  return (
    <div className="p-10 w-full">
      <h1 className={`text-7xl ${boong.className} text-coffee border-b-2 border-coffee pb-10`}>Profit</h1>
      <div className="pt-10">
        <AppWrapper>
          <SoldItemsReport />
        </AppWrapper>
      </div>
    </div>
  );
}
