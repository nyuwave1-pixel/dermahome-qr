'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShieldCheck, Clock, Smartphone, User, Ban, Home, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';

function UsedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const code = searchParams.get('code') || 'UNINCORE-XXXXX';

  return (
    <div className="max-w-lg mx-auto">
      <div
        className="text-center mb-8 transition-all duration-500"
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}
      >
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center shadow-xl">
            <ShieldCheck className="w-14 h-14 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center shadow-lg border-4 border-white">
            <Ban className="w-5 h-5 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e293b' }}>인증 완료된 QR 코드</h1>
        <p style={{ color: '#64748b' }}>본 QR 코드는 이미 인증 완료되었습니다</p>
      </div>

      <div
        className="transition-all duration-500 delay-150"
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}
      >
        <GlassCard className="p-6 mb-4">
          <h3 className="font-semibold mb-4" style={{ color: '#1e293b' }}>인증 정보</h3>
          <div className="space-y-4">
            {[
              { icon: ShieldCheck, label: 'QR 코드', value: code, mono: true },
              { icon: Clock, label: '최초 인증 시간', value: '2026.05.10 14:30', mono: false },
              { icon: Smartphone, label: '사용 기기', value: 'DermaHome Pro (DH-PRO-001)', mono: false },
              { icon: User, label: '등록 계정', value: 'u***@email.com', mono: false },
            ].map(({ icon: Icon, label, value, mono }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <Icon className="w-5 h-5 text-sky-500" />
                <div>
                  <div className="text-xs" style={{ color: '#94a3b8' }}>{label}</div>
                  <div className={`font-medium ${mono ? 'font-mono' : ''}`} style={{ color: '#334155' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div
        className="transition-all duration-500 delay-300"
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}
      >
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 mb-6">
          <p className="text-sm text-amber-700 text-center">
            이 QR 코드는 재사용이 불가합니다. 본인 인증이 아닌 경우 고객센터로 문의해주세요.
          </p>
        </div>

        <div className="space-y-3">
          <Button fullWidth variant="outline" onClick={() => router.push('/verify')}>
            <ArrowLeft className="w-5 h-5" />
            다른 QR 인증하기
          </Button>
          <Button fullWidth variant="ghost" onClick={() => router.push('/')}>
            <Home className="w-5 h-5" />
            메인으로 이동
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyUsedPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4 safe-top safe-bottom">
        <Suspense fallback={<div className="flex justify-center pt-20"><div style={{ color: '#94a3b8' }}>로딩 중...</div></div>}>
          <UsedContent />
        </Suspense>
      </main>
    </>
  );
}
