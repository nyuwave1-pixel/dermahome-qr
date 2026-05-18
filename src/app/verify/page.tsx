'use client';

import { useState, useCallback, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { QrCode, Shield, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { consumeQR } from '@/services/qrService';

function VerifyInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeParam = searchParams.get('code');

  const [state, setState] = useState<'idle' | 'verifying'>(
    codeParam ? 'verifying' : 'idle'
  );
  const [manualCode, setManualCode] = useState('');
  const [manualOpen, setManualOpen] = useState(false);

  useEffect(() => {
    if (!codeParam) return;
    const run = async () => {
      setState('verifying');
      await new Promise((r) => setTimeout(r, 1200));

      const result = await consumeQR(codeParam);

      if (result.success) {
        router.replace('/verify/success');
      } else {
        router.replace('/verify/used');
      }
    };
    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleManual = useCallback(async () => {
    const code = manualCode.trim();
    if (!code) return;
    router.push(`/verify?code=${encodeURIComponent(code)}`);
  }, [manualCode, router]);

  /* ── States ── */
  if (state === 'verifying') {
    return (
      <div className="text-center">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(92,138,60,0.12)', border: '1px solid rgba(92,138,60,0.30)' }}
        >
          <RefreshCw className="w-10 h-10 animate-spin" style={{ color: '#7bae52' }} />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--t-1)' }}>
          QR 인증 처리 중
        </h2>
        <p className="text-sm" style={{ color: 'var(--t-4)' }}>
          잠시만 기다려주세요...
        </p>
        <div className="mt-6 space-y-2">
          {['QR 코드 검증 중', '기기 사용 권한 확인 중', '세션 활성화 중'].map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-2 text-xs transition-all duration-500"
              style={{
                color: 'var(--t-5)',
                opacity: 1,
                transitionDelay: `${i * 400}ms`,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#5c8a3c',
                  animation: 'glowPulse 1.5s ease-in-out infinite',
                  animationDelay: `${i * 0.3}s`,
                }}
              />
              {step}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* Idle state — show manual entry */
  return (
    <div>
      {/* Icon */}
      <div className="text-center mb-8">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(92,138,60,0.12)', border: '1px solid rgba(92,138,60,0.30)' }}
        >
          <QrCode className="w-8 h-8" style={{ color: '#7bae52' }} />
        </div>
        <h1 className="text-xl font-black mb-1" style={{ color: 'var(--t-1)' }}>
          QR 세션 스캔
        </h1>
        <p className="text-sm" style={{ color: 'var(--t-4)' }}>
          본사에서 받은 QR 코드를 스캔해주세요
        </p>
      </div>

      {/* Camera scan notice */}
      <div
        className="p-4 rounded-xl mb-4 text-sm"
        style={{ background: 'rgba(92,138,60,0.07)', border: '1px solid rgba(92,138,60,0.20)' }}
      >
        <p style={{ color: 'var(--t-3)' }}>
          스마트폰 기본 카메라 앱으로 QR 코드를 스캔하면 자동으로 이 페이지로 연결됩니다.
        </p>
      </div>

      {/* Manual code entry */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid var(--bd-2)' }}
      >
        <button
          className="w-full flex items-center justify-between p-4"
          onClick={() => setManualOpen(!manualOpen)}
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5" style={{ color: '#7bae52' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--t-2)' }}>
              코드 직접 입력
            </span>
          </div>
          <span
            className="text-xs transition-transform duration-300"
            style={{
              color: 'var(--t-6)',
              transform: manualOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              display: 'inline-block',
            }}
          >
            ▾
          </span>
        </button>
        {manualOpen && (
          <div className="px-4 pb-4 space-y-3">
            <input
              type="text"
              placeholder="QR 코드 입력..."
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 rounded-xl text-center font-mono text-sm tracking-wider focus:outline-none"
              style={{
                background: 'var(--su-1)',
                border: '1px solid var(--bd-1)',
                color: 'var(--t-1)',
              }}
            />
            <button
              onClick={handleManual}
              disabled={!manualCode.trim()}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
              style={{ background: '#5c8a3c' }}
            >
              인증하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Page wrapper with Suspense (required for useSearchParams) ── */
export default function VerifyPage() {
  return (
    <>
      <Header />
      <main
        className="min-h-screen flex items-center justify-center px-4 py-24"
        style={{ background: 'var(--t-bg)' }}
      >
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors"
            style={{ color: 'var(--t-5)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#7bae52'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--t-5)'; }}
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>

          <div
            className="p-6 rounded-2xl"
            style={{
              background: 'var(--su-2)',
              border: '1px solid var(--bd-2)',
            }}
          >
            <Suspense
              fallback={
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3" style={{ color: '#7bae52' }} />
                  <p className="text-sm" style={{ color: 'var(--t-4)' }}>로딩 중...</p>
                </div>
              }
            >
              <VerifyInner />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  );
}
