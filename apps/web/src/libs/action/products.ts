import { ProductData } from '@/types/product';
import Cookies from 'js-cookie';

export function dataURLtoFile(dataUrl: string, fileName: string): File {
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

export const createProduct = async (data: ProductData) => {
  const token = Cookies.get('token');
  const formData = new FormData();

  // Add text fields to formData
  formData.append('name', data.name);
  formData.append('category_id', data.category_id!);
  if (data.medium) formData.append('medium', data.medium.toString());
  if (data.iced_small) formData.append('iced_small', data.iced_small.toString());
  if (data.iced_medium) formData.append('iced_medium', data.iced_medium.toString());
  if (data.iced_large) formData.append('iced_large', data.iced_large.toString());
  formData.append('stock', data.stock.toString());
  if (data.stock_iced) formData.append('stock_iced', data.stock_iced.toString());
  formData.append('description', data.description);
  if (data.description_iced) formData.append('description_iced', data.description_iced);

  // Append image files if they exist
  if (data.image_hot) formData.append('image_hot', data.image_hot);
  if (data.image_cold) formData.append('image_iced', data.image_cold);

  // Debugging: Log each entry in the formData
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  // Send request
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
