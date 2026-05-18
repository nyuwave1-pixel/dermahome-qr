'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { XCircle, ShieldOff, AlertTriangle, ArrowRight } from 'lucide-react';

export default function VerifyUsedPage() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 100);
    const t2 = setTimeout(() => setStep(2), 600);
    const t3 = setTimeout(() => setStep(3), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'var(--t-bg)' }}
    >
      <div className="w-full max-w-sm text-center">

        {/* ── Animated X icon ── */}
        <div
          className="relative w-28 h-28 mx-auto mb-8 transition-all duration-700"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? 'scale(1)' : 'scale(0.5)',
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'rgba(239,68,68,0.15)',
              animation: step >= 1 ? 'ripple 2s ease-out infinite' : 'none',
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'rgba(239,68,68,0.10)',
              animation: step >= 1 ? 'ripple 2s ease-out infinite 0.4s' : 'none',
            }}
          />
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
              boxShadow: '0 0 40px rgba(239,68,68,0.40), 0 0 80px rgba(239,68,68,0.15)',
            }}
          >
            <XCircle className="w-14 h-14 text-white" strokeWidth={2.2} />
          </div>
        </div>

        {/* ── Badge ── */}
        <div
          className="transition-all duration-500"
          style={{
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
            style={{
              background: 'rgba(239,68,68,0.14)',
              border: '1px solid rgba(239,68,68,0.40)',
              color: '#fca5a5',
            }}
          >
            <ShieldOff className="w-3 h-3" />
            사용 불가
          </div>
        </div>

        {/* ── Main message ── */}
        <div
          className="transition-all duration-600"
          style={{
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <h1
            className="text-2xl md:text-3xl font-black leading-tight mb-3"
            style={{ color: 'var(--t-1)' }}
          >
            해당 QR은 더 이상<br />사용 불가입니다
          </h1>
          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: 'var(--t-4)' }}
          >
            이 QR 코드는 이미 사용되었거나 만료되었습니다.
            <br />본사에서 새로운 QR 코드를 발급받아 주세요.
          </p>
        </div>

        {/* ── Warning notice + CTA ── */}
        <div
          className="transition-all duration-500 delay-100"
          style={{
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <div
            className="flex items-center gap-2 justify-center mb-6 px-3 py-2.5 rounded-xl"
            style={{
              background: 'rgba(251,146,60,0.08)',
              border: '1px solid rgba(251,146,60,0.20)',
            }}
          >
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: '#fb923c' }} />
            <span className="text-xs font-medium" style={{ color: '#fb923c' }}>
              1회 사용된 QR은 재사용이 불가합니다
            </span>
          </div>

          {/* ── CTA buttons ── */}
          <div className="space-y-3">
            <Link
              href="/verify"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: '#5c8a3c',
                boxShadow: '0 0 20px rgba(92,138,60,0.25)',
              }}
            >
              새 QR 코드 인증하기
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                color: 'var(--t-4)',
                border: '1px solid var(--bd-2)',
              }}
            >
              홈으로 이동
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
