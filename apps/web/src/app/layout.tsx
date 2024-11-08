import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import DelayedLoadingWrapper from '@/components/delaywrapper';
import { Suspense } from 'react';
import Loading from './loading';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Morning Coffee',
  description: 'MorningCoffee.co',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DelayedLoadingWrapper>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </DelayedLoadingWrapper>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="custom-toast" 
          style={{ marginTop: '4rem', marginRight: '1rem' }} 
        />
      </body>
    </html>
  );
}
