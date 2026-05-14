'use client';

import { useTheme } from '@/components/ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${className}`}
      style={{
        background: 'var(--su-1)',
        border: '1px solid var(--bd-2)',
        color: 'var(--t-4)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.color = 'var(--t-1)';
        (e.currentTarget as HTMLElement).style.background = 'var(--su-hover)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.color = 'var(--t-4)';
        (e.currentTarget as HTMLElement).style.background = 'var(--su-1)';
      }}
    >
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-300"
        style={{ opacity: theme === 'dark' ? 1 : 0, transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(90deg)' }}
      >
        <Moon className="w-4 h-4" />
      </span>
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-300"
        style={{ opacity: theme === 'light' ? 1 : 0, transform: theme === 'light' ? 'rotate(0deg)' : 'rotate(-90deg)' }}
      >
        <Sun className="w-4 h-4" />
      </span>
    </button>
  );
}
