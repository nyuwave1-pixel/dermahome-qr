'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, QrCode, Home, Cpu, Building2 } from 'lucide-react';

const navItems = [
  { href: '/', label: '홈', icon: Home },
  { href: '/verify', label: 'QR 인증', icon: QrCode },
  { href: '#device', label: '기기 소개', icon: Cpu },
  { href: '#about', label: '회사 소개', icon: Building2 },
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
            background: scrolled ? 'rgba(7,7,10,0.94)' : 'rgba(7,7,10,0.65)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-7 w-auto">
              <Image
                src="/images/logo_horizontal_mono.png"
                alt="UNI&CORE"
                width={160}
                height={28}
                className="h-7 w-auto object-contain"
                style={{ filter: 'invert(1) brightness(0.9)' }}
                priority
              />
            </div>
            <div
              className="hidden sm:block h-4 w-px"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            />
            <span
              className="hidden sm:block text-xs font-medium tracking-widest uppercase"
              style={{ color: 'rgba(248,248,246,0.40)', letterSpacing: '0.15em' }}
            >
              DermaHome
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{ color: 'rgba(248,248,246,0.58)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#f8f8f6';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(92,138,60,0.12)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(248,248,246,0.58)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/verify"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 text-white"
              style={{ background: '#5c8a3c', boxShadow: '0 0 16px rgba(92,138,60,0.30)' }}
            >
              <QrCode className="w-4 h-4" />
              QR 인증
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl transition-colors"
            style={{ color: 'rgba(248,248,246,0.8)' }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="메뉴"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden mx-4 mt-2 transition-all duration-300"
          style={{
            opacity: mobileVisible ? 1 : 0,
            transform: mobileVisible ? 'translateY(0)' : 'translateY(-8px)',
          }}
        >
          <nav
            className="flex flex-col gap-1 p-3 rounded-2xl"
            style={{
              background: 'rgba(7,7,10,0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                style={{ color: 'rgba(248,248,246,0.7)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#f8f8f6';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(92,138,60,0.10)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(248,248,246,0.7)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            <div className="h-px mx-2 mt-1 mb-2" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <Link
              href="/verify"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all"
              style={{ background: '#5c8a3c' }}
            >
              <QrCode className="w-5 h-5" />
              QR 정품 인증하기
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
