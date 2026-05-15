'use client';

import { useState } from 'react';
import { Gift, Copy, Check, Clock, Tag, Smartphone, Percent, QrCode } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import { sampleCoupons } from '@/utils/sampleData';

export default function CouponPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4 safe-top">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/25">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e293b' }}>프로모션 쿠폰</h1>
            <p className="text-sm" style={{ color: '#64748b' }}>인증 완료 시 발급된 할인 쿠폰을 확인하세요</p>
          </div>

          <div className="space-y-4">
            {sampleCoupons.map((coupon) => {
              const isUsed = !!coupon.usedAt;
              const isExpired = new Date(coupon.expiredAt) < new Date();

              return (
                <GlassCard key={coupon.couponId} className={`overflow-hidden ${isUsed || isExpired ? 'opacity-70' : ''}`}>
                  <div className={`p-4 ${isUsed ? 'bg-slate-300' : 'bg-gradient-to-r from-sky-500 to-blue-600'} text-white relative overflow-hidden`}>
                    <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Percent className="w-5 h-5" />
                          <span className="text-2xl font-bold">{coupon.discountPercent}%</span>
                        </div>
                        <p className={`text-sm ${isUsed ? 'text-slate-600' : 'text-sky-100'}`}>{coupon.description}</p>
                      </div>
                      {isUsed && (
                        <div className="px-3 py-1 rounded-full bg-slate-500 text-white text-xs font-semibold">사용완료</div>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 rounded-full bg-slate-100 border border-slate-200 -ml-7" />
                      <div className="flex-1 border-t-2 border-dashed border-slate-200" />
                      <div className="w-4 h-4 rounded-full bg-slate-100 border border-slate-200 -mr-7" />
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                      <Tag className="w-4 h-4" style={{ color: '#94a3b8' }} />
                      <code className="flex-1 font-mono text-base tracking-wider font-semibold" style={{ color: '#334155' }}>
                        {coupon.couponCode}
                      </code>
                      {!isUsed && (
                        <button onClick={() => handleCopy(coupon.couponCode, coupon.couponId)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                          {copiedId === coupon.couponId ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" style={{ color: '#94a3b8' }} />}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs" style={{ color: '#94a3b8' }}>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>~{new Date(coupon.expiredAt).toLocaleDateString('ko-KR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>앱에서 사용 가능</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          <div className="mt-8">
            <GlassCard className="p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#334155' }}>
                <QrCode className="w-5 h-5 text-sky-500" />
                쿠폰 사용 안내
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: '#64748b' }}>
                <li className="flex items-start gap-2"><span className="text-sky-400 mt-1">•</span>더마 시리즈 공식 앱 또는 온라인 스토어에서 사용 가능합니다.</li>
                <li className="flex items-start gap-2"><span className="text-sky-400 mt-1">•</span>쿠폰 코드를 결제 시 입력하여 할인을 받으세요.</li>
                <li className="flex items-start gap-2"><span className="text-sky-400 mt-1">•</span>타 쿠폰/할인과 중복 사용이 불가합니다.</li>
                <li className="flex items-start gap-2"><span className="text-sky-400 mt-1">•</span>유효 기간 내 사용하지 않은 쿠폰은 자동 소멸됩니다.</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
