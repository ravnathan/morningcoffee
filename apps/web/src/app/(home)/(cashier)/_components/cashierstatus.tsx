import { userData } from '@/libs/action/user';
import { capitalizeFirstLetter } from '@/libs/formatcapital';
import type { CashierStatus } from '@/types/user';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CashierStatus() {
  const [data, setData] = useState<CashierStatus>();

  const fetchData = async () => {
    try {
      const dat = await userData();
      setData(dat);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex gap-5 w-full">
      <Image
        src={data?.user.avatar ? data.user.avatar : '/images/defaultavatar.webp'}
        width={50}
        height={50}
        alt="/images/defaultavatar.webp"
      />
      <div className="flex flex-col space-y-2">
        <p className="text-gray-400 font-semibold">
          {data?.user.role === 'cashier' ? 'Cashier on duty' : capitalizeFirstLetter(data?.user.role)}
        </p>
        <p className=" font-semibold">{data?.user.fullname}</p>
      </div>
    </div>
  );
}
