import { ProductData } from '@/types/product';
import Cookies from 'js-cookie';

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

export const createProduct = async (data: ProductData, hotUrl: string, icedUrl: string) => {
  const token = Cookies.get('token');
  const formData = new FormData();
  const imageHot = dataURLtoFile(hotUrl, 'image_hot.png');
  const imageIced = dataURLtoFile(icedUrl, 'image_iced.png');
  formData.append('name', data.name);
  formData.append('category_name', data.category_name);
  if (data.size) formData.append('size', data.size);
  if (data.type) formData.append('type', data.type);
  if (data.medium) formData.append('medium', data.medium.toString());
  if (data.iced_small)
    formData.append('iced_small', data.iced_small.toString());
  if (data.iced_medium)
    formData.append('iced_medium', data.iced_medium.toString());
  if (data.iced_large)
    formData.append('iced_large', data.iced_large.toString());
  formData.append('stock', data.stock.toString());
  if (data.stock_iced)
    formData.append('stock_iced', data.stock_iced.toString());
  formData.append('description', data.description);
  if (data.description_iced)
    formData.append('description_iced', data.description_iced);
  if (data.image_hot) formData.append('image_hot', imageHot);
  if (data.image_cold) formData.append('image_iced', imageIced);

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
