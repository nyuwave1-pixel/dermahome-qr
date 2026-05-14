'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Gift, Smartphone, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import { useQRStore } from '@/store/useQRStore';

export default function VerifySuccessPage() {
  const router = useRouter();
  const { verifyResult } = useQRStore();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const couponCode = verifyResult?.coupon?.couponCode || 'DH-DEMO1234';

  useEffect(() => { setMounted(true); }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4 safe-top safe-bottom">
        <div className="max-w-lg mx-auto">
          {/* Success animation */}
          <div
            className="text-center mb-8 transition-all duration-500"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'scale(1)' : 'scale(0.9)' }}
          >
            <div className="relative w-28 h-28 mx-auto mb-6">
              <motion.div
                className="absolute inset-0 rounded-full bg-emerald-400/20"
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                <CheckCircle className="w-14 h-14 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e293b' }}>정품 인증이 완료되었습니다</h1>
            <p style={{ color: '#64748b' }}>유니앤코어 더마홈 케어가 시작됩니다</p>
          </div>

          <div
            className="space-y-4 transition-all duration-500 delay-200"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}
          >
            {/* Coupon card */}
            <GlassCard className="p-0 overflow-hidden">
              <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Gift className="w-5 h-5" />
                  <span className="font-semibold">프로모션 쿠폰 발급 완료</span>
                </div>
                <p className="text-sky-100 text-sm">정품 인증 고객 전용 할인 쿠폰</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold" style={{ color: '#0284c7' }}>15%</div>
                    <div className="text-sm" style={{ color: '#64748b' }}>할인 쿠폰</div>
                  </div>
                  <Sparkles className="w-8 h-8 text-sky-400" />
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <code className="flex-1 text-center font-mono text-lg tracking-wider" style={{ color: '#334155' }}>
                    {couponCode}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5 text-slate-400" />}
                  </button>
                </div>
                <p className="text-xs mt-3 text-center" style={{ color: '#94a3b8' }}>
                  유효 기간: 발급일로부터 30일
                </p>
              </div>
            </GlassCard>

            {/* Skin care start */}
            <GlassCard className="p-6" hover>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold" style={{ color: '#1e293b' }}>피부 관리 시작하기</h3>
                  <p className="text-sm" style={{ color: '#64748b' }}>AI 기반 맞춤 피부 분석을 시작해보세요</p>
                </div>
              </div>
            </GlassCard>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Button fullWidth onClick={() => router.push('/coupon')}>
                <Gift className="w-5 h-5" />
                쿠폰 확인하기
              </Button>
              <Button fullWidth variant="secondary" onClick={() => router.push('/app-connect')}>
                <Smartphone className="w-5 h-5" />
                앱 연결하기
                <ArrowRight className="w-4 h-4" />
              </Button>
              <button
                onClick={() => router.push('/')}
                className="w-full text-center text-sm py-2 transition-colors hover:text-sky-500"
                style={{ color: '#94a3b8' }}
              >
                메인으로 이동
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
