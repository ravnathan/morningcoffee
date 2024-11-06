import { ProductInfoStore } from '@/types/transaction';
import Cookies from 'js-cookie';

export const transactionProcess = async (data: ProductInfoStore) => {
  const token = Cookies.get('token');

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}transaction`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify({
      items: data.items.map((item) => ({
        product_id: item.product_id,
        qty: item.qty,
        variant: item.variant,
      })),
      payment_type: data.payment_type,
      debit_info: data.debit_info,
    }),
  });

  return res.json();
};

export const getTransactionData = async () => {
  const token = Cookies.get('token');
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}transaction`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  });

  return res.json();
};

export const getTransactionDataByDate = async (date: string) => {
  const token = Cookies.get('token');
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}transaction/by-date?date=${date}`, {
    headers: {
      'Content-Type' : 'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'GET'
  })

  return res.json()
};
