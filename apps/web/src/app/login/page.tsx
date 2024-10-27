'use client';

import Image from 'next/image';
import LoginForm from './_components/loginform';
import { boong } from '@/libs/fonts';
import ImageSlider from './_components/imageslider';

export default function Login() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
        <ImageSlider />
      <div className="absolute w-full h-full z-10">
        <svg
          id="visual"
          viewBox="0 0 1920 1080"
          width="1920"
          height="1080"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          className=""
        >
          <rect
            x="0"
            y="0"
            width="1920"
            height="1080"
            fill="transparent"
          ></rect>
          <path
            d="M1566 1080L1544.7 1044C1523.3 1008 1480.7 936 1428.8 864C1377 792 1316 720 1279 648C1242 576 1229 504 1226.2 432C1223.3 360 1230.7 288 1253.8 216C1277 144 1316 72 1335.5 36L1355 0L1920 0L1920 36C1920 72 1920 144 1920 216C1920 288 1920 360 1920 432C1920 504 1920 576 1920 648C1920 720 1920 792 1920 864C1920 936 1920 1008 1920 1044L1920 1080Z"
            fill="#6f4e37"
            fillOpacity="1"
            strokeLinecap="round"
            strokeLinejoin="miter"
          ></path>
        </svg>
      </div>

      <div className="absolute right-10 h-screen z-20 flex flex-col top-10 space-y-20  items-center">
        <Image
          src={'/images/logo/logo-white.png'}
          width={180}
          height={200}
          alt=""
        />
        <div>
          <h2
            className={`text-6xl font-semibold text-center text-white mb-6 ${boong.className}`}
          >
            Welcome back
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
