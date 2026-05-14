'use client';

import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', hover = false, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl
        bg-white border border-slate-200/80
        shadow-sm hover:shadow-md
        transition-all duration-300
        ${hover ? 'hover:scale-[1.02] hover:shadow-lg' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-sky-50/30 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
