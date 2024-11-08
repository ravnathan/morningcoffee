'use client';

import { boong } from '@/libs/fonts';
import AdminHistory from './_components/AdminHistoryList';
import AppWrapper from './products/_components/ProductWrapper';

export default function AdminPage() {
  return (
    <div className="p-10 w-full">
      <h1 className={`text-7xl ${boong.className} text-coffee border-b-2 border-coffee pb-10`}>Transaction History</h1>
      <div className="pt-10">
        <AppWrapper>
          <AdminHistory />
        </AppWrapper>
      </div>
    </div>
  );
}
