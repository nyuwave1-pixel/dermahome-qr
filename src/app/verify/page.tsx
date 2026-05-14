'use client';

import { useState, useCallback, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { QrCode, Shield, AlertCircle, ArrowLeft, CheckCircle2, Clock, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { verifyQRCode, getQRCodeInfo } from '@/services/qrService';

/* ── Inner component that reads searchParams ── */
function VerifyInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeParam = searchParams.get('code');

  const [state, setState] = useState<'idle' | 'verifying' | 'success' | 'used' | 'expired' | 'invalid' | 'error'>(
    codeParam ? 'verifying' : 'idle'
  );
  const [manualCode, setManualCode] = useState('');
  const [manualOpen, setManualOpen] = useState(false);
  const [deviceModel, setDeviceModel] = useState('더마10 PRO');

  // Auto-verify if ?code= is in the URL
  useEffect(() => {
    if (!codeParam) return;
    const run = async () => {
      setState('verifying');
      // small UX delay
      await new Promise((r) => setTimeout(r, 1200));

      const info = await getQRCodeInfo(codeParam);
      if (!info) { setState('invalid'); return; }
      if (info.status === 'used') { setState('used'); return; }
      if (info.status === 'expired' || new Date(info.expiredAt) < new Date()) {
        setState('expired'); return;
      }

      // Mark as used
      const result = await verifyQRCode(codeParam, 'customer');
      if (result.success) {
        setState('success');
      } else if (result.errorType === 'used') {
        setState('used');
      } else if (result.errorType === 'expired') {
        setState('expired');
      } else {
        setState('invalid');
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
        <h2 className="text-xl font-bold mb-2" style={{ color: '#f8f8f6' }}>
          QR 인증 처리 중
        </h2>
        <p className="text-sm" style={{ color: 'rgba(248,248,246,0.5)' }}>
          잠시만 기다려주세요...
        </p>
        <div className="mt-6 space-y-2">
          {['QR 코드 검증 중', '기기 사용 권한 확인 중', '세션 활성화 중'].map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-2 text-xs transition-all duration-500"
              style={{
                color: 'rgba(248,248,246,0.42)',
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

  if (state === 'success') {
    return (
      <div className="text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(92,138,60,0.15)', border: '2px solid rgba(92,138,60,0.45)' }}
        >
          <CheckCircle2 className="w-10 h-10" style={{ color: '#9dd470' }} />
        </div>
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
          style={{ background: 'rgba(92,138,60,0.15)', color: '#9dd470', border: '1px solid rgba(92,138,60,0.35)' }}
        >
          인증 완료
        </div>
        <h2 className="text-2xl font-black mb-2" style={{ color: '#f8f8f6' }}>
          기기 사용 권한이<br />부여되었습니다
        </h2>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(248,248,246,0.55)' }}>
          <span className="font-semibold" style={{ color: '#9dd470' }}>{deviceModel}</span>
          을(를) 사용하실 수 있습니다.
          <br />이 QR은 1회 사용으로 만료되었습니다.
        </p>

        {/* Usage guide chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['페이스 RF', '울트라소닉', '이온토포레시스', '고주파'].map((h) => (
            <span
              key={h}
              className="text-xs px-3 py-1.5 rounded-lg font-medium"
              style={{ background: 'rgba(92,138,60,0.10)', color: 'rgba(248,248,246,0.7)', border: '1px solid rgba(92,138,60,0.20)' }}
            >
              {h}
            </span>
          ))}
        </div>

        <Link
          href="/#guide"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.03]"
          style={{ background: '#5c8a3c', color: '#fff', boxShadow: '0 0 20px rgba(92,138,60,0.25)' }}
        >
          케어 가이드 보기
        </Link>
      </div>
    );
  }

  if (state === 'used') {
    return (
      <div className="text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(244,114,182,0.10)', border: '2px solid rgba(244,114,182,0.30)' }}
        >
          <Clock className="w-10 h-10" style={{ color: '#f472b6' }} />
        </div>
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
          style={{ background: 'rgba(244,114,182,0.10)', color: '#f472b6', border: '1px solid rgba(244,114,182,0.28)' }}
        >
          이미 사용됨
        </div>
        <h2 className="text-2xl font-black mb-2" style={{ color: '#f8f8f6' }}>
          만료된 QR 코드입니다
        </h2>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(248,248,246,0.55)' }}>
          이 QR 코드는 이미 사용되었습니다.
          <br />매장 운영자에게 새 QR을 요청하세요.
        </p>
        <p className="text-xs" style={{ color: 'rgba(248,248,246,0.30)' }}>
          재 스캔 시 만료 · 새 QR은 매장 운영자가 발급합니다
        </p>
      </div>
    );
  }

  if (state === 'expired') {
    return (
      <div className="text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(251,146,60,0.10)', border: '2px solid rgba(251,146,60,0.30)' }}
        >
          <Clock className="w-10 h-10" style={{ color: '#fb923c' }} />
        </div>
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
          style={{ background: 'rgba(251,146,60,0.10)', color: '#fb923c', border: '1px solid rgba(251,146,60,0.28)' }}
        >
          만료됨
        </div>
        <h2 className="text-2xl font-black mb-2" style={{ color: '#f8f8f6' }}>
          유효 시간이 만료되었습니다
        </h2>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(248,248,246,0.55)' }}>
          이 QR 코드의 유효 시간이 지났습니다.
          <br />매장 운영자에게 새 QR을 요청하세요.
        </p>
      </div>
    );
  }

  if (state === 'invalid' || state === 'error') {
    return (
      <div className="text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(244,114,182,0.10)', border: '2px solid rgba(244,114,182,0.30)' }}
        >
          <AlertCircle className="w-10 h-10" style={{ color: '#f472b6' }} />
        </div>
        <h2 className="text-2xl font-black mb-2" style={{ color: '#f8f8f6' }}>
          유효하지 않은 QR입니다
        </h2>
        <p className="text-sm mb-6" style={{ color: 'rgba(248,248,246,0.55)' }}>
          QR 코드를 다시 확인하거나 새 QR을 요청하세요.
        </p>
        <button
          onClick={() => { setState('idle'); setManualCode(''); }}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.06)', color: '#f8f8f6', border: '1px solid rgba(255,255,255,0.10)' }}
        >
          다시 시도
        </button>
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
        <h1 className="text-xl font-black mb-1" style={{ color: '#f8f8f6' }}>
          QR 세션 스캔
        </h1>
        <p className="text-sm" style={{ color: 'rgba(248,248,246,0.48)' }}>
          매장에서 받은 QR 코드를 스캔해주세요
        </p>
      </div>

      {/* Camera scan notice */}
      <div
        className="p-4 rounded-xl mb-4 text-sm"
        style={{ background: 'rgba(92,138,60,0.07)', border: '1px solid rgba(92,138,60,0.20)' }}
      >
        <p style={{ color: 'rgba(248,248,246,0.65)' }}>
          스마트폰 기본 카메라 앱으로 QR 코드를 스캔하면 자동으로 이 페이지로 연결됩니다.
        </p>
      </div>

      {/* Manual code entry */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <button
          className="w-full flex items-center justify-between p-4"
          onClick={() => setManualOpen(!manualOpen)}
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5" style={{ color: '#7bae52' }} />
            <span className="text-sm font-medium" style={{ color: 'rgba(248,248,246,0.72)' }}>
              코드 직접 입력
            </span>
          </div>
          <span
            className="text-xs transition-transform duration-300"
            style={{
              color: 'rgba(248,248,246,0.3)',
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
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#f8f8f6',
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
        style={{ background: '#07070a' }}
      >
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors"
            style={{ color: 'rgba(248,248,246,0.38)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#7bae52'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(248,248,246,0.38)'; }}
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>

          <div
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.09)',
            }}
          >
            <Suspense
              fallback={
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3" style={{ color: '#7bae52' }} />
                  <p className="text-sm" style={{ color: 'rgba(248,248,246,0.5)' }}>로딩 중...</p>
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
