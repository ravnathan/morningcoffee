'use client';

import Trying from '@/app/trying/_components/template';
import { boong } from '@/libs/fonts';
import HistoryListTable from './_components/HistoryListTable';
import AppWrapper from '../../(admin)/admin/products/_components/ProductWrapper';

export default function History() {
  return (
    <div className="p-10">
      <h1 className={`text-7xl ${boong.className} text-coffee pb-10`}>Transaction History</h1>
      <AppWrapper>
        <HistoryListTable />
      </AppWrapper>
    </div>
  );
}
