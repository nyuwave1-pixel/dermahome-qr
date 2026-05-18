'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, QrCode, Home, Cpu, Building2, BookOpen, MapPin } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navItems = [
  { href: '/', label: '홈', icon: Home },
  { href: '#device', label: '기기소개', icon: Cpu },
  { href: '#guide', label: '케어가이드', icon: BookOpen },
  { href: '#stores', label: '본사안내', icon: MapPin },
  { href: '#about', label: '회사소개', icon: Building2 },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setMobileVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setMobileVisible(false);
    }
  }, [isOpen]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-3">
        <div
          className="flex items-center justify-between h-16 px-5 rounded-2xl transition-all duration-300"
          style={{
            background: scrolled ? 'var(--t-bg-dp)' : 'var(--t-bg-gl)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid var(--bd-2)',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.18)' : 'none',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <div
              className="flex items-center px-3 py-1.5 rounded-xl transition-all duration-200"
              style={{ background: '#f5f5f3', border: '1px solid var(--bd-2)' }}
            >
              <Image
                src="/images/logo_with_slogan.png"
                alt="UNI&CORE — United power of uni&core to the global"
                width={160}
                height={48}
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all duration-200"
                style={{ color: 'var(--t-4)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--t-1)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(92,138,60,0.12)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--t-4)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            <ThemeToggle />
            <Link
              href="/generate"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-all duration-200 text-white"
              style={{ background: '#5c8a3c', boxShadow: '0 0 16px rgba(92,138,60,0.30)' }}
            >
              <QrCode className="w-3.5 h-3.5" />
              QR 생성
            </Link>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-xl transition-colors"
              style={{ color: 'var(--t-3)' }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="메뉴"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="lg:hidden mx-4 mt-2 transition-all duration-300"
          style={{
            opacity: mobileVisible ? 1 : 0,
            transform: mobileVisible ? 'translateY(0)' : 'translateY(-8px)',
          }}
        >
          <nav
            className="flex flex-col gap-1 p-3 rounded-2xl"
            style={{
              background: 'var(--t-bg-dp)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid var(--bd-2)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                style={{ color: 'var(--t-3)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--t-1)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(92,138,60,0.10)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--t-3)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            <div className="h-px mx-2 mt-1 mb-2" style={{ background: 'var(--bd-3)' }} />
            <Link
              href="/generate"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all"
              style={{ background: '#5c8a3c' }}
            >
              <QrCode className="w-5 h-5" />
              매장 QR 세션 생성
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
