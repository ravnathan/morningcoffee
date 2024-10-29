import { ProductData } from '@/types/product';
import Cookies from 'js-cookie';

// Converts dataURL to a File
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

export function prepareImageCold(imageCold: string | File): File {
  return typeof imageCold === 'string'
    ? dataURLtoFile(imageCold, 'image_cold.png')
    : imageCold;
}

export function prepareImageHot(imageHot: string | File): File {
  return typeof imageHot === 'string'
    ? dataURLtoFile(imageHot, 'image_hot.png')
    : imageHot;
    
}

// Main function for creating product
export const createProduct = async (data: ProductData) => {
  const token = Cookies.get('token');
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('category_name', data.category_name);
  if (data.size) formData.append('size', data.size);
  if (data.type) formData.append('type', data.type);
  if (data.price_S) formData.append('price_S', data.price_S.toString());
  formData.append('price_M', data.price_M!.toString());
  if (data.price_L) formData.append('price_L', data.price_L.toString());
  formData.append('stock', data.stock.toString());
  formData.append('description', data.description);
  if (data.image_cold) {
    const imageColdFile = prepareImageCold(data.image_cold);
    formData.append('image_cold', imageColdFile);
  }
  const imageHotFile = prepareImageHot(data.image_hot);
  formData.append('image_hot', imageHotFile);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}product`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: formData,
  });

  return res.json();
};
