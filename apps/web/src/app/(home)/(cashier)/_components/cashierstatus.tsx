import Image from 'next/image';

export default function CashierStatus() {
  return (
    <div className="flex gap-5 p-6">
      <Image src={'/images/defaultavatar.webp'} width={50} height={50} alt="" />
      <div>
        <p className="text-gray-400 font-semibold">Cashier</p>
        <p className="text-xl font-semibold">Aryana</p>
      </div>
    </div>
  );
}
