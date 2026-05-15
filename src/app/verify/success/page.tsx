'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Sparkles, ArrowRight, Shield } from 'lucide-react';

export default function VerifySuccessPage() {
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

        {/* ── Animated checkmark ── */}
        <div
          className="relative w-28 h-28 mx-auto mb-8 transition-all duration-700"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? 'scale(1)' : 'scale(0.5)',
          }}
        >
          {/* Pulse ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'rgba(92,138,60,0.15)',
              animation: step >= 1 ? 'ripple 2s ease-out infinite' : 'none',
            }}
          />
          {/* Second ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'rgba(92,138,60,0.10)',
              animation: step >= 1 ? 'ripple 2s ease-out infinite 0.4s' : 'none',
            }}
          />
          {/* Icon circle */}
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #5c8a3c 0%, #7bae52 100%)',
              boxShadow: '0 0 40px rgba(92,138,60,0.40), 0 0 80px rgba(92,138,60,0.15)',
            }}
          >
            <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2.2} />
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
              background: 'rgba(92,138,60,0.14)',
              border: '1px solid rgba(92,138,60,0.40)',
              color: '#9dd470',
            }}
          >
            <Shield className="w-3 h-3" />
            인증 완료
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
            인증에 성공했습니다
          </h1>
          <p
            className="text-base font-semibold mb-2"
            style={{ color: '#9dd470' }}
          >
            1회 더마 시리즈 사용 가능합니다.
          </p>
          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: 'var(--t-4)' }}
          >
            이 QR 코드는 1회 사용으로 만료되었습니다.
            <br />다음 이용 시 매장에서 새 QR을 발급받으세요.
          </p>
        </div>

        {/* ── Device info card ── */}
        <div
          className="transition-all duration-500 delay-100"
          style={{
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <div
            className="rounded-2xl p-5 mb-6"
            style={{
              background: 'var(--su-1)',
              border: '1px solid var(--bd-2)',
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="rounded-xl flex items-center justify-center shrink-0 px-2.5 py-1.5"
                style={{
                  background: '#f5f5f3',
                  border: '1px solid rgba(92,138,60,0.25)',
                }}
              >
                <Image
                  src="/images/logo_with_slogan.png"
                  alt="UNI&CORE"
                  width={100}
                  height={30}
                  className="h-7 w-auto object-contain"
                />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold" style={{ color: 'var(--t-1)' }}>
                  더마 시리즈
                </div>
                <div className="text-xs" style={{ color: 'var(--t-5)' }}>
                  8종 헤드 올인원 피부 미용 기기
                </div>
              </div>
            </div>

            {/* Available heads */}
            <div className="flex flex-wrap gap-1.5">
              {[
                '페이스 RF',
                '바디 RF',
                '갈바닉',
                '울트라소닉',
                '이온토포레시스',
                'LED',
                '쿨링',
                '산소 인퓨전',
              ].map((head) => (
                <span
                  key={head}
                  className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
                  style={{
                    background: 'rgba(92,138,60,0.08)',
                    border: '1px solid rgba(92,138,60,0.18)',
                    color: 'var(--t-3)',
                  }}
                >
                  {head}
                </span>
              ))}
            </div>
          </div>

          {/* ── One-time notice ── */}
          <div
            className="flex items-center gap-2 justify-center mb-6 px-3 py-2.5 rounded-xl"
            style={{
              background: 'rgba(251,146,60,0.08)',
              border: '1px solid rgba(251,146,60,0.20)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: '#fb923c' }} />
            <span className="text-xs font-medium" style={{ color: '#fb923c' }}>
              본 QR은 1회 전용입니다 · 재사용 불가
            </span>
          </div>

          {/* ── CTA buttons ── */}
          <div className="space-y-3">
            <Link
              href="/#guide"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: '#5c8a3c',
                boxShadow: '0 0 20px rgba(92,138,60,0.25)',
              }}
            >
              케어 가이드 보기
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
