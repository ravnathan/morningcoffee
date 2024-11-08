import { CategoryForm } from '@/types/category';
import Cookies from 'js-cookie';

export const createCategory = async (data: CategoryForm) => {
  const token = Cookies.get('token');
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('image', data.image);
  formData.append('hot_iced_variant', data.hot_iced_variant!.toString());
  formData.append('cold_only', data.cold_only!.toString());
  formData.append('size_small', data.size_small!.toString());
  formData.append('size_medium', data.size_medium!.toString());
  formData.append('size_large', data.size_large!.toString());

  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}category`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: formData,
  });

  return res.json();
};

export const deleteCategory = async (id: string) => {
  const token = Cookies.get('token');
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}category/soft`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'PATCH',
    body: JSON.stringify({ id }),
  });

  return res.json();
};
