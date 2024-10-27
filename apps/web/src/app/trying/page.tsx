'use client';

import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="w-40 h-40 relative">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2122 2122"
          className="w-full h-full"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <g>
            <path
              style={{ fill: '#472713' }}
              d="M1857.66,863.046c-3.427-83.725-32.457-162.573-124.905-167.222c-58.452-2.939-105.448,12.262-156.644,27.122v-63.334c0,112.354-294.022,203.434-656.719,203.434c-362.695,0-656.718-91.08-656.718-203.434v348.81c0,361.194,295.523,656.719,656.718,656.719h0.001c260.656,0,487.086-153.917,592.959-375.339c-0.007,0.016-0.014,0.03-0.02,0.044c82.385,3.706,196.642-14.764,257.189-75.564C1853.692,1129.753,1862.249,975.183,1857.66,863.046z M1731.583,940.883c-1.396,30.865-7.555,61.49-16.365,91.053c-10.33,34.662-40.339,71.069-74.654,87.673c-27.279,13.2-54.936,15.766-77.379,18.256c0,0.002-0.001,0.004-0.001,0.006c8.46-41.883,12.928-85.169,12.928-129.449V877.145c43.105-7.808,112.531-38.972,139.191-15.459C1735.196,879.232,1732.66,917.075,1731.583,940.883z"
            />
            <ellipse
              style={{ fill: '#F6EFE9' }}
              cx="919.392"
              cy="659.613"
              rx="656.718"
              ry="203.433"
            />
            <ellipse
              style={{ fill: '#EFDAD6' }}
              cx="919.393"
              cy="659.613"
              rx="614.773"
              ry="168.811"
            />
            <path
              style={{ fill: '#673522' }}
              d="M332.207,709.765c77.784,68.741,311.255,118.658,587.185,118.658s509.4-49.917,587.184-118.658c-77.784-68.742-311.254-118.659-587.184-118.659S409.992,641.023,332.207,709.765z"
            />
            {/* Add other paths and elements as needed */}
            <path
              style={{ fill: '#724128' }}
              d="M1361.321,810.079c17.822,16.274,34.887,33.34,50.332,51.887c27.607,33.151,48.946,70.951,60.193,112.755c6.557,24.37,9.047,49.185,10.891,74.278c2.345,31.92,3.883,63.896,4.769,95.889c1.777,64.178,0.931,128.403-1.226,192.562c-0.015,0.443-0.036,0.887-0.051,1.33c57.031-97.205,89.881-210.109,89.881-330.357V659.613C1576.11,719.242,1493.27,772.872,1361.321,810.079z"
            />
          </g>

          {/* Steam Animation */}
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M${40 + i * 15} 45 Q ${45 + i * 15} 30 ${50 + i * 15} 45`}
              fill="none"
              stroke="black"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0, 1, 0],
                y: [0, -10],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}
        </motion.svg>
      </div>
      <motion.h1
        className="absolute mt-36 text-2xl font-bold text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        Morning Coffee
      </motion.h1>
    </div>
  );
}
