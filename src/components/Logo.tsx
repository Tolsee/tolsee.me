'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: 'rgba(255, 255, 255, 0)',
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: 'rgba(255, 255, 255, 1)',
  },
};

const Logo = () => (
  <div className="h-[50px] w-[50px] flex place-content-center rounded-lg bg-[--green]">
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="stroke-white stroke-2 w-1/2 [stroke-linejoin:round] [stroke-linecap:round]"
    >
      <motion.path
        d="M 0 20 V 0 L 100 0 v 20 L 60 20 L 60 100 L 40 100 L 40 100 L 40 20 L 0 20"
        variants={icon}
        initial="hidden"
        animate="visible"
        transition={{
          default: { duration: 2, ease: 'easeInOut' },
          fill: { duration: 2, ease: [1, 0, 0.8, 1] },
        }}
      />
    </motion.svg>
  </div>
);

export default Logo;
