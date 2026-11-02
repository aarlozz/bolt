'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Layered Himalayan skyline silhouette in the brand palette.
 * Pure SVG, scales to container width.
 */
export function HimalayanSkyline({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg
      className={className}
      viewBox="0 0 1440 280"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="hk1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--mocha-soft) / 0.5)" />
          <stop offset="100%" stopColor="hsl(var(--mocha) / 0.18)" />
        </linearGradient>
        <linearGradient id="hk2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--mocha) / 0.4)" />
          <stop offset="100%" stopColor="hsl(var(--mocha-dark) / 0.35)" />
        </linearGradient>
      </defs>
      {/* Back range */}
      <motion.path
        d="M0 200 L120 140 L210 180 L320 90 L430 160 L540 120 L660 170 L780 80 L900 150 L1020 110 L1140 170 L1260 95 L1360 150 L1440 120 L1440 280 L0 280 Z"
        fill="url(#hk1)"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Front range */}
      <motion.path
        d="M0 230 L100 190 L200 215 L300 170 L420 210 L520 185 L640 215 L760 165 L880 205 L1000 180 L1120 215 L1240 175 L1360 210 L1440 195 L1440 280 L0 280 Z"
        fill="url(#hk2)"
        animate={reduce ? undefined : { y: [0, -3, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </svg>
  );
}