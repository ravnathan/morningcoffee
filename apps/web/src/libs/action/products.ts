import { EditProductData, ProductData } from '@/types/product';
import Cookies from 'js-cookie';

export const createProduct = async (data: ProductData) => {
  const token = Cookies.get('token');
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('category_name', data.category_name!);
  if (data.medium) formData.append('medium', data.medium.toString());
  if (data.iced_small) formData.append('iced_small', data.iced_small.toString());
  if (data.iced_medium) formData.append('iced_medium', data.iced_medium.toString());
  if (data.iced_large) formData.append('iced_large', data.iced_large.toString());
  if (data.stock) formData.append('stock', data.stock.toString());
  if (data.stock_iced) formData.append('stock_iced', data.stock_iced.toString());
  if (data.description) formData.append('description', data.description);
  if (data.description_iced) formData.append('description_iced', data.description_iced);
  if (data.image_1) formData.append('image_1', data.image_1);
  if (data.image_cold) formData.append('image_2', data.image_cold);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}product`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: formData,
  });

  return res.json();
};

export const getProduct = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}product`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return res.json();
};

export const getProdByCategory = async (categoryName: string) => {
  const token = Cookies.get('token');
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}product/by-category?categoryName=${categoryName}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  });

  return res.json();
};

export const deleteProduct = async (id: string) => {
  const token = Cookies.get('token');
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}product/soft`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'PATCH',
    body: JSON.stringify({ id }),
  });

  return res.json();
};

export const editProduct = async (id: string, data: EditProductData) => {

  const token = Cookies.get('token');
  const formData = new FormData();

  if (data.name) formData.append('name', data.name);
  if (data.category_name) formData.append('category_name', data.category_name);
  if (data.medium) formData.append('medium', data.medium.toString());
  if (data.iced_small) formData.append('iced_small', data.iced_small.toString());
  if (data.iced_medium) formData.append('iced_medium', data.iced_medium.toString());
  if (data.iced_large) formData.append('iced_large', data.iced_large.toString());
  if (data.stock) formData.append('stock', data.stock.toString());
  if (data.stock_iced) formData.append('stock_iced', data.stock_iced.toString());
  if (data.description) formData.append('description', data.description);
  if (data.description_iced) formData.append('description_iced', data.description_iced);
  if (data.image_1) formData.append('image_1', data.image_1);
  if (data.image_cold) formData.append('image_2', data.image_cold);


  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'PATCH',
    body: formData,
  });

  return res.json();
};

