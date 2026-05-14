'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { QrCode, RefreshCw, CheckCircle2, Clock, ArrowLeft, Store, AlertCircle } from 'lucide-react';
import { createStoreSession, getQRCodeInfo } from '@/services/qrService';
import Header from '@/components/layout/Header';

interface Session {
  token: string;
  qrImageUrl: string;
  verifyUrl: string;
  expiredAt: string;
  status: 'unused' | 'used' | 'expired' | 'checking';
}

function useCountdown(expiredAt: string | null) {
  const [remaining, setRemaining] = useState('');
  useEffect(() => {
    if (!expiredAt) return;
    const tick = () => {
      const diff = new Date(expiredAt).getTime() - Date.now();
      if (diff <= 0) { setRemaining('만료됨'); return; }
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1_000);
      setRemaining(`${h > 0 ? `${h}시간 ` : ''}${m}분 ${s}초`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiredAt]);
  return remaining;
}

export default function GeneratePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const countdown = useCountdown(session?.expiredAt ?? null);

  // Poll Firebase every 15 s to check if QR was scanned
  useEffect(() => {
    if (!session || session.status !== 'unused') return;
    const id = setInterval(async () => {
      const info = await getQRCodeInfo(session.token);
      if (info?.status === 'used') {
        setSession((s) => s ? { ...s, status: 'used' } : s);
        clearInterval(id);
      } else if (info?.status === 'expired' || (info && new Date(info.expiredAt) < new Date())) {
        setSession((s) => s ? { ...s, status: 'expired' } : s);
        clearInterval(id);
      }
    }, 15_000);
    return () => clearInterval(id);
  }, [session]);

  const generate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await createStoreSession('default');
      setSession({ ...result, status: 'unused' });
    } catch {
      setError('QR 생성에 실패했습니다. Firebase 연결을 확인해주세요.');
    } finally {
      setLoading(false);
    }
  }, []);

  const statusColor =
    session?.status === 'unused'
      ? '#9dd470'
      : session?.status === 'used'
      ? '#38bdf8'
      : '#f472b6';

  const statusLabel =
    session?.status === 'unused'
      ? '대기 중 — 고객 스캔 전'
      : session?.status === 'used'
      ? '사용됨 — 고객이 스캔했습니다'
      : '만료됨';

  return (
    <>
      <Header />
      <main
        className="min-h-screen flex items-center justify-center px-4 py-24"
        style={{ background: 'var(--t-bg)' }}
      >
        <div className="w-full max-w-md">

          {/* Back link */}
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

          {/* Header card */}
          <div
            className="p-5 rounded-2xl mb-5"
            style={{
              background: 'rgba(92,138,60,0.07)',
              border: '1px solid rgba(92,138,60,0.25)',
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(92,138,60,0.15)' }}
              >
                <Store className="w-5 h-5" style={{ color: '#9dd470' }} />
              </div>
              <div>
                <h1 className="text-base font-bold" style={{ color: 'var(--t-1)' }}>
                  매장 QR 세션 생성
                </h1>
                <p className="text-xs" style={{ color: 'var(--t-5)' }}>
                  고객용 1회성 더마10 기기 사용 QR
                </p>
              </div>
            </div>
          </div>

          {/* Main card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'var(--su-2)',
              border: '1px solid var(--bd-2)',
            }}
          >
            {/* QR display area */}
            <div
              className="flex flex-col items-center justify-center p-8"
              style={{ minHeight: '300px' }}
            >
              {!session && !loading && (
                <div className="text-center">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'rgba(92,138,60,0.10)', border: '1px solid rgba(92,138,60,0.25)' }}
                  >
                    <QrCode className="w-10 h-10" style={{ color: '#7bae52' }} />
                  </div>
                  <p className="text-sm font-semibold mb-1.5" style={{ color: 'var(--t-1)' }}>
                    새 QR 세션을 생성하세요
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t-5)' }}>
                    생성된 QR을 고객에게 보여주면<br />고객이 스캔해 기기 사용 권한을 받습니다.
                  </p>
                </div>
              )}

              {loading && (
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(92,138,60,0.10)' }}
                  >
                    <RefreshCw
                      className="w-8 h-8 animate-spin"
                      style={{ color: '#7bae52' }}
                    />
                  </div>
                  <p className="text-sm" style={{ color: 'var(--t-4)' }}>
                    QR 생성 중...
                  </p>
                </div>
              )}

              {session && !loading && (
                <div className="w-full text-center">
                  {/* Status badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
                    style={{
                      background: `${statusColor}18`,
                      border: `1px solid ${statusColor}35`,
                      color: statusColor,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: statusColor,
                        display: 'inline-block',
                        animation: session.status === 'unused' ? 'glowPulse 1.5s ease-in-out infinite' : 'none',
                      }}
                    />
                    {statusLabel}
                  </div>

                  {/* QR Image */}
                  {session.status === 'unused' && (
                    <div className="flex justify-center mb-4">
                      <div
                        className="p-4 rounded-2xl"
                        style={{ background: '#f8f8f6' }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={session.qrImageUrl}
                          alt="QR 세션 코드"
                          width={220}
                          height={220}
                          style={{ display: 'block' }}
                        />
                      </div>
                    </div>
                  )}

                  {session.status === 'used' && (
                    <div className="flex flex-col items-center gap-3 mb-4 py-6">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.3)' }}
                      >
                        <CheckCircle2 className="w-8 h-8" style={{ color: '#38bdf8' }} />
                      </div>
                      <p className="text-base font-bold" style={{ color: 'var(--t-1)' }}>
                        고객이 성공적으로 스캔했습니다
                      </p>
                      <p className="text-xs" style={{ color: 'var(--t-5)' }}>
                        이 QR은 만료되었습니다. 다음 고객을 위해 새 QR을 생성하세요.
                      </p>
                    </div>
                  )}

                  {session.status === 'expired' && (
                    <div className="flex flex-col items-center gap-3 mb-4 py-6">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(244,114,182,0.10)', border: '1px solid rgba(244,114,182,0.25)' }}
                      >
                        <Clock className="w-8 h-8" style={{ color: '#f472b6' }} />
                      </div>
                      <p className="text-base font-bold" style={{ color: 'var(--t-1)' }}>
                        QR 유효 시간이 만료되었습니다
                      </p>
                    </div>
                  )}

                  {/* Countdown + token */}
                  {session.status === 'unused' && (
                    <div className="space-y-2 mb-2">
                      <div
                        className="flex items-center justify-center gap-2 text-xs"
                        style={{ color: 'var(--t-5)' }}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        유효 시간: {countdown}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--t-7)' }}>
                        코드: {session.token.slice(0, 18)}…
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div
                className="mx-5 mb-4 p-3.5 rounded-xl flex items-start gap-2.5 text-sm"
                style={{ background: 'rgba(244,114,182,0.08)', border: '1px solid rgba(244,114,182,0.25)' }}
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#f472b6' }} />
                <p style={{ color: 'var(--t-2)' }}>{error}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="p-5 pt-0 space-y-3">
              <button
                onClick={generate}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ background: '#5c8a3c', boxShadow: '0 0 20px rgba(92,138,60,0.25)' }}
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <QrCode className="w-4 h-4" />
                )}
                {session ? '새 QR 세션 생성' : 'QR 세션 생성하기'}
              </button>

              {session?.status === 'unused' && (
                <p
                  className="text-center text-xs"
                  style={{ color: 'var(--t-6)' }}
                >
                  새 QR 생성 시 현재 QR은 즉시 만료됩니다
                </p>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div
            className="mt-5 p-4 rounded-2xl space-y-2.5"
            style={{ background: 'var(--su-3)', border: '1px solid var(--bd-3)' }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--t-6)' }}
            >
              사용 방법
            </p>
            {[
              '① 「QR 세션 생성하기」 버튼을 눌러 QR을 생성합니다',
              '② 화면의 QR을 고객 스마트폰으로 스캔하게 합니다',
              '③ 고객 스캔 완료 시 기기 사용 권한이 자동 부여됩니다',
              '④ 다음 고객을 위해 새 QR을 다시 생성하세요',
            ].map((step) => (
              <p key={step} className="text-xs leading-relaxed" style={{ color: 'var(--t-5)' }}>
                {step}
              </p>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
