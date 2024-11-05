import { CashierData, UserLogin } from '@/types/user';
import Cookies from 'js-cookie';

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

function dataURLtoFile(dataUrl: string, fileName: string): File {
  const [header, base64Data] = dataUrl.split(',');
  const mimeType = header.match(/:(.*?);/)![1];
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new File([byteArray], fileName, { type: mimeType });
}

export const createCashier = async (data: CashierData, dataUrl: string) => {
  const token = Cookies.get('token');
  const formData = new FormData();
  const portraitImage = dataURLtoFile(dataUrl, 'cashier-avatar.png');
  formData.append('fullname', data.fullname);
  formData.append('password', data.password);
  formData.append('avatar', portraitImage);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}admin/cashier`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: formData,
  });

  return res.json();
};

export const getCashier = async () => {
  const token = Cookies.get('token');
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}admin/cashier`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  });

  return res.json();
};

export const deleteCashierData = async (id: string) => {
  const token = Cookies.get('token');
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}admin/cashier`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });

  return res;
};
