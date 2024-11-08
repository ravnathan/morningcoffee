import { CashierData, shiftInterface, UserLogin } from '@/types/user';
import { useUserStore } from '@/zustand/UserStore';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const userLogin = async (data: UserLogin) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });

  const response = await res.json();
  return { result: response, ok: res.ok };
};

export const cashierShift = async (data: shiftInterface) => {
  const token = Cookies.get('token');
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}shift`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res.json();
};

const url = '/login';
export const onLogout = async () => {
  const { clearRole } = useUserStore.getState()
  clearRole()
  Cookies.remove('token');
  toast.success("You've logged out");
  window.location.href = url;
};

export const userData = async() => {
  const token = Cookies.get('token');
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  });

  return res.json();
}