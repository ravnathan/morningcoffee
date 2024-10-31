import Image from "next/image";

export default function OrderDetails() {
  return (
    // <div className="mx-6 font-semibold">
    //   <h1 className="text-2xl">Bills</h1>
    //   <div className="flex justify-between">
    //     <p>Subtotal</p>
    //     <p>Rp. 200</p>
    //   </div>
    //   <div className="flex justify-between">
    //     <p>Tax</p>
    //     <p>Rp. 200</p>
    //   </div>
    //   <hr className="border-t-2 border-gray-400 my-4" />
    //   <div className="flex justify-between">
    //     <p>Total</p>
    //     <p>Rp. 200</p>
    //   </div>
    // </div>
    <div className="mx-auto">
      <Image
      src={'/images/idleorder.webp'}
      width={200}
      height={200}
      alt=""/>
    </div>
  );
}
