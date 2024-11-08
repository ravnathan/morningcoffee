import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from './libs/action/server';

const homePage = ['/'];
const adminPage = '/admin';
const loginPage = ['/login'];

export default async function middleware(request: NextRequest) {
  const cookie = await getCookie('token');
  const url = request.nextUrl.pathname;
  let payload;

  if (cookie) {
    payload = JSON.parse(atob(cookie.split('.')[1]));
  }

  if (homePage.includes(url)) {
    if (!cookie) {
      if (url === '/') {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (loginPage.includes(url)) {
    if (cookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (url.startsWith(adminPage)) {
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (payload?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}
