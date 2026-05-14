'use client';

import { ReactNode, CSSProperties } from 'react';

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

const variantStyles: Record<string, CSSProperties> = {
  primary: {
    background: '#5c8a3c',
    color: '#ffffff',
    border: '1px solid rgba(123,174,82,0.40)',
    boxShadow: '0 0 24px rgba(92,138,60,0.25), 0 4px 12px rgba(0,0,0,0.20)',
  },
  secondary: {
    background: 'var(--su-1)',
    color: 'var(--t-1)',
    border: '1px solid var(--bd-1)',
  },
  outline: {
    background: 'transparent',
    color: '#7bae52',
    border: '1px solid rgba(92,138,60,0.60)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--t-3)',
    border: '1px solid transparent',
  },
};

const hoverStyles: Record<string, CSSProperties> = {
  primary: {
    background: '#6a9f47',
    border: '1px solid rgba(157,212,112,0.50)',
  },
  secondary: {
    background: 'var(--su-hover)',
    border: '1px solid var(--bd-1)',
  },
  outline: {
    background: 'rgba(92,138,60,0.10)',
    color: '#9dd470',
    border: '1px solid #7bae52',
  },
  ghost: {
    background: 'var(--su-1)',
    color: 'var(--t-1)',
  },
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
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={variantStyles[variant]}
      onMouseEnter={(e) => {
        if (disabled) return;
        const el = e.currentTarget as HTMLElement;
        const hover = hoverStyles[variant];
        Object.assign(el.style, hover);
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        const base = variantStyles[variant];
        // Reset all hover-touched properties back to base
        el.style.background = (base.background as string) ?? '';
        el.style.color = (base.color as string) ?? '';
        el.style.border = (base.border as string) ?? '';
      }}
    >
      {children}
    </button>
  );
}
