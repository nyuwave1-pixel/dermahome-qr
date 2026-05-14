'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, QrCode, Shield, Smartphone, Gift, LayoutDashboard } from 'lucide-react';

const navItems = [
  { href: '/', label: '홈', icon: Shield },
  { href: '/verify', label: 'QR 인증', icon: QrCode },
  { href: '/coupon', label: '쿠폰', icon: Gift },
  { href: '/history', label: '등록 현황', icon: Smartphone },
  { href: '/admin', label: '관리자', icon: LayoutDashboard },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-3">
        <div className="flex items-center justify-between h-16 px-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-800">
                DermaHome
              </span>
              <span className="text-[10px] block -mt-1 text-slate-400 font-medium tracking-wider">
                by UNI&CORE
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50/50 transition-all"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 mt-2"
          >
            <nav className="flex flex-col gap-1 p-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-xl">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-sky-600 hover:bg-sky-50/50 transition-all"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
