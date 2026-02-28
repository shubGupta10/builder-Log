"use client";

import React from 'react';
import { motion } from 'framer-motion';

/**
 * A component for rendering an animated, multi-color aurora background.
 * Uses Framer Motion for smooth, continuous animation of gradient blobs.
 * @returns {JSX.Element} The rendered aurora background.
 */
export const AuroraBackground = () => {
  const Blob = ({ style, animateProps }: { style: React.CSSProperties, animateProps: any }) => (
    <motion.div
      className="absolute rounded-full mix-blend-hard-light filter blur-2xl opacity-40"
      style={style}
      animate={animateProps}
      transition={{
        duration: 25,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    />
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Blob
        style={{
          top: '-20%',
          left: '-10%',
          width: '40rem',
          height: '40rem',
          background: 'rgba(91, 127, 255, 0.15)', // Brand Blue
        }}
        animateProps={{ x: [0, 100, -50, 0], y: [0, -80, 120, 0] }}
      />
      <Blob
        style={{
          top: '20%',
          right: '-20%',
          width: '30rem',
          height: '30rem',
          background: 'rgba(150, 150, 150, 0.1)', // Muted Grey
        }}
        animateProps={{ x: [0, -120, 70, 0], y: [0, 100, -90, 0] }}
      />
      <Blob
        style={{
          bottom: '-20%',
          left: '20%',
          width: '35rem',
          height: '35rem',
          background: 'rgba(50, 100, 255, 0.12)', // Deeper Blue
        }}
        animateProps={{ x: [0, 80, -110, 0], y: [0, -100, 60, 0] }}
      />
    </div>
  );
};

/**
 * A reusable container for the Bento Grid layout.
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element} The rendered Bento Grid container.
 */
export const BentoGrid = ({ children }: { children: React.ReactNode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[280px]"
    >
      {children}
    </motion.div>
  );
};

/**
 * A single item within the Bento Grid with hover and animation.
 * @param {object} props
 * @param {string} props.className
 * @param {React.ReactNode} props.children
 * @param {string} props.gradientFrom
 * @param {string} props.gradientTo
 * @returns {JSX.Element} The rendered grid item.
 */
export const BentoGridItem = ({
  className,
  children,
  gradientFrom,
  gradientTo,
}: {
  className?: string;
  children: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' } as any,
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className={`
        relative overflow-hidden group
        bg-gradient-to-br ${gradientFrom} ${gradientTo}
        rounded-2xl shadow-lg p-6 flex flex-col justify-between
        ${className}
      `}
    >
      {/* Shine effect on hover */}
      <div
        className="
          absolute top-0 left-[-150%] h-full w-[50%]
          bg-[linear-gradient(to_right,transparent_0%,#ffffff33_50%,transparent_100%)]
          skew-x-[-25deg]
          transition-all duration-700 ease-in-out
          group-hover:left-[125%]
        "
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};
