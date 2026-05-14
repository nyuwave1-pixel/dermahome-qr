'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner({ text = '분석 중...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-sky-100"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-blue-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-sky-400 to-blue-500"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ boxShadow: ['0 0 0 0 rgba(56,189,248,0.4)', '0 0 0 20px rgba(56,189,248,0)', '0 0 0 0 rgba(56,189,248,0)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <motion.p
        className="text-slate-500 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
}
