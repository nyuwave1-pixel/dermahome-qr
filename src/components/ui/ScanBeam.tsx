'use client';

import { motion } from 'framer-motion';

export default function ScanBeam({ active = true }: { active?: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <motion.div
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_20px_rgba(56,189,248,0.8)]"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 border-2 border-sky-400/30 rounded-2xl" />
      <div className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-sky-400 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-sky-400 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-sky-400 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-sky-400 rounded-br-2xl" />
    </div>
  );
}
