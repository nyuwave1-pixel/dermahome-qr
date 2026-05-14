'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { XCircle, AlertTriangle, Clock, ShieldOff, WifiOff, RefreshCw, Phone, Home } from 'lucide-react';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';

const errorConfig: Record<string, { icon: typeof XCircle; title: string; message: string; color: string; pulse: string }> = {
  used: {
    icon: ShieldOff,
    title: '이미 사용된 QR 코드',
    message: '이 QR 코드는 이미 인증이 완료되었습니다. 하나의 QR 코드는 1회만 사용 가능합니다.',
    color: 'from-amber-400 to-orange-500',
    pulse: 'bg-amber-400/20',
  },
  expired: {
    icon: Clock,
    title: '만료된 QR 코드',
    message: '이 QR 코드의 유효 기간이 만료되었습니다. 고객센터로 문의해주세요.',
    color: 'from-slate-400 to-slate-500',
    pulse: 'bg-slate-400/20',
  },
  invalid: {
    icon: XCircle,
    title: '유효하지 않은 QR 코드',
    message: '인식할 수 없는 QR 코드입니다. 정품 더마홈 기기의 QR 코드인지 확인해주세요.',
    color: 'from-red-400 to-rose-500',
    pulse: 'bg-red-400/20',
  },
  blocked: {
    icon: ShieldOff,
    title: '차단된 QR 코드',
    message: '이 QR 코드는 보안 사유로 차단되었습니다. 고객센터로 문의해주세요.',
    color: 'from-red-500 to-red-600',
    pulse: 'bg-red-500/20',
  },
  network: {
    icon: WifiOff,
    title: '네트워크 오류',
    message: '인터넷 연결을 확인한 후 다시 시도해주세요.',
    color: 'from-slate-400 to-slate-500',
    pulse: 'bg-slate-400/20',
  },
  server: {
    icon: AlertTriangle,
    title: '서버 오류',
    message: '일시적인 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    color: 'from-amber-400 to-orange-500',
    pulse: 'bg-amber-400/20',
  },
};

function FailedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const errorType = searchParams.get('type') || 'invalid';
  const config = errorConfig[errorType] || errorConfig.invalid;
  const Icon = config.icon;

  return (
    <div className="max-w-lg mx-auto">
      <div
        className="text-center mb-8 transition-all duration-500"
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'scale(1)' : 'scale(0.9)' }}
      >
        <div className="relative w-28 h-28 mx-auto mb-6">
          <motion.div
            className={`absolute inset-0 rounded-full ${config.pulse}`}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center shadow-xl`}>
            <Icon className="w-14 h-14 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e293b' }}>인증에 실패했습니다</h1>
        <p style={{ color: '#64748b' }}>{config.title}</p>
      </div>

      <div
        className="transition-all duration-500 delay-150"
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}
      >
        <GlassCard className="p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{config.message}</p>
          </div>
        </GlassCard>
      </div>

      <div
        className="space-y-3 transition-all duration-500 delay-300"
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}
      >
        <Button fullWidth onClick={() => router.push('/verify')}>
          <RefreshCw className="w-5 h-5" />
          다시 시도
        </Button>
        <Button fullWidth variant="outline">
          <Phone className="w-5 h-5" />
          고객센터 문의 (1588-0000)
        </Button>
        <Button fullWidth variant="ghost" onClick={() => router.push('/')}>
          <Home className="w-5 h-5" />
          메인으로 이동
        </Button>
      </div>
    </div>
  );
}

export default function VerifyFailedPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4 safe-top safe-bottom">
        <Suspense fallback={<div className="flex justify-center pt-20"><div style={{ color: '#94a3b8' }}>로딩 중...</div></div>}>
          <FailedContent />
        </Suspense>
      </main>
    </>
  );
}
