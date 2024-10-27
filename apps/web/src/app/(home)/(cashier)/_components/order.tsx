'use client';
import { motion } from "framer-motion";
import CashierStatus from './cashierstatus';
import OrderDetails from './orderdetails';
import Payment from './payment';

export default function Order() {
  return (
    <motion.div
      initial={{ x: 250, opacity: 0 }}  
      animate={{ x: 0, opacity: 1 }}  
      transition={{ duration: 0.5 }}   
      className="bg-white w-[400px] right-0 fixed z-10 h-full flex flex-col p-6 shadow-lg space-y-40"
    >
      <CashierStatus />
      <OrderDetails />
      <Payment />
    </motion.div>
  );
}
