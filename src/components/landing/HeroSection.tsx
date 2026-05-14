'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-white" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl" />

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <div
          className="transition-all duration-700"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-200 mb-8">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span className="text-sm font-medium text-sky-700">AI 피부 분석 기반 스마트 디바이스</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span style={{ color: '#1e293b' }}>피부 컨디션</span>
            <br />
            <span style={{ background: 'linear-gradient(to right, #0ea5e9, #3b82f6, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              올인원
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-4 max-w-2xl mx-auto leading-relaxed" style={{ color: '#475569' }}>
            스캔 한 번으로 시작하는 스마트 더마홈 케어
          </p>
          <p className="text-sm md:text-base mb-10 max-w-xl mx-auto" style={{ color: '#64748b' }}>
            정품 인증부터 피부 분석, 맞춤 케어까지 — 더마홈이 함께합니다
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/verify">
              <Button size="lg" className="min-w-[200px]">
                <QrCode className="w-5 h-5" />
                QR 인증 시작하기
              </Button>
            </Link>
            <Link href="/app-connect">
              <Button variant="secondary" size="lg" className="min-w-[200px]">
                앱 연결하기
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Device mockup */}
        <div
          className="mt-16 relative max-w-md mx-auto transition-all duration-700 delay-300"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(50px)' }}
        >
          <div className="relative aspect-square max-w-[320px] mx-auto">
            <motion.div
              className="absolute inset-0 rounded-full bg-sky-300/20 blur-2xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-slate-100 via-white to-slate-50 border border-slate-200 shadow-2xl flex items-center justify-center">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
                <QrCode className="w-12 h-12 text-white" />
              </div>
            </div>

            {[
              { top: '50%', left: '95%' },
              { top: '88.97%', left: '72.5%' },
              { top: '88.97%', left: '27.5%' },
              { top: '50%', left: '5%' },
              { top: '11.03%', left: '27.5%' },
              { top: '11.03%', left: '72.5%' },
            ].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-sky-400"
                style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
