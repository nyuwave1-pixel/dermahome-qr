'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

const variants: Record<string, string> = {
  primary:
    'bg-[#5c8a3c] text-white border border-[#7bae52]/40 hover:bg-[#6a9f47] hover:border-[#9dd470]/50 active:bg-[#4f7a34]',
  secondary:
    'bg-white/[0.06] text-[#f8f8f6] border border-white/[0.12] hover:bg-white/[0.10] hover:border-white/20 active:bg-white/[0.04]',
  outline:
    'bg-transparent text-[#7bae52] border border-[#5c8a3c]/60 hover:bg-[#5c8a3c]/10 hover:border-[#7bae52] active:bg-[#5c8a3c]/20',
  ghost:
    'bg-transparent text-[rgba(248,248,246,0.7)] border border-transparent hover:bg-white/[0.06] hover:text-[#f8f8f6]',
};

const sizes: Record<string, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl gap-1.5',
  md: 'px-6 py-3 text-base rounded-xl gap-2',
  lg: 'px-8 py-4 text-base font-semibold rounded-2xl gap-2.5',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-semibold tracking-wide
        transition-all duration-200
        disabled:opacity-40 disabled:cursor-not-allowed
        active:scale-[0.97]
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={variant === 'primary' ? {
        boxShadow: '0 0 24px rgba(92,138,60,0.25), 0 4px 12px rgba(0,0,0,0.3)',
      } : undefined}
    >
      {children}
    </button>
  );
}
