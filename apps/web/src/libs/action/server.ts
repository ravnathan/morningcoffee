'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const createCookie = (key: string, value: string) => {
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set(key, value, { expires: Date.now() + oneDay });
};

export const getCookie = async (key: string) => {
  return cookies().get(key)?.value;
};

export const deleteCookie = (key: string) => {
  cookies().delete(key);
};

export const navigate = (url: string) => {
  redirect(url);
};

export const tagRevalidate = (tag: string) => {
  revalidateTag(tag);
};

