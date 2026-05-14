'use client';

import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  accent?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  hover = false,
  onClick,
  accent = false,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl
        transition-all duration-300
        ${accent ? 'glass-accent' : 'glass-dark'}
        ${hover ? 'hover:scale-[1.02] cursor-pointer hover:border-white/20' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Subtle top-edge highlight */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
