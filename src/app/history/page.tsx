'use client';

import { useState, useEffect } from 'react';
import { History, QrCode, Smartphone, Gift, Calendar } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { sampleQRCodes, sampleCoupons } from '@/utils/sampleData';
import type { QRStatus } from '@/types';

type FilterType = 'all' | 'used' | 'unused' | 'expired';

export default function HistoryPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: '전체' },
    { key: 'used', label: '사용 완료' },
    { key: 'unused', label: '미사용' },
    { key: 'expired', label: '만료' },
  ];

  const filtered = sampleQRCodes.filter((qr) => {
    if (filter === 'all') return true;
    if (filter === 'unused') return qr.status === 'unused' || qr.status === 'active';
    return qr.status === filter;
  });

  const getCouponForQR = (couponId: string | null) =>
    sampleCoupons.find((c) => c.couponId === couponId);

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4 safe-top">
        <div className="max-w-2xl mx-auto">
          <div
            className="text-center mb-8 transition-all duration-500"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
              <History className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e293b' }}>QR 등록 현황</h1>
            <p className="text-sm" style={{ color: '#64748b' }}>등록한 기기와 QR 인증 이력을 확인하세요</p>
          </div>

          {/* Summary */}
          <div
            className="grid grid-cols-3 gap-3 mb-6 transition-all duration-500 delay-100"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}
          >
            {[
              { label: '전체 등록', value: sampleQRCodes.length, color: '#334155' },
              { label: '사용 완료', value: sampleQRCodes.filter((q) => q.status === 'used').length, color: '#0284c7' },
              { label: '쿠폰 발급', value: sampleCoupons.length, color: '#7c3aed' },
            ].map((stat) => (
              <GlassCard key={stat.label} className="p-3 text-center">
                <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs" style={{ color: '#94a3b8' }}>{stat.label}</div>
              </GlassCard>
            ))}
          </div>

          {/* Filters */}
          <div
            className="flex gap-2 mb-6 overflow-x-auto pb-1 transition-all duration-500 delay-200"
            style={{ opacity: mounted ? 1 : 0 }}
          >
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  filter === f.key
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* QR list */}
          <div className="space-y-3">
            {filtered.map((qr, i) => {
              const coupon = getCouponForQR(qr.couponId);
              return (
                <div
                  key={qr.qrId}
                  className="transition-all duration-500"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(15px)',
                    transitionDelay: `${300 + i * 50}ms`,
                  }}
                >
                  <GlassCard className="p-4" hover>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                          <QrCode className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <div className="font-mono font-semibold text-sm" style={{ color: '#1e293b' }}>{qr.qrId}</div>
                          <div className="flex items-center gap-1.5 text-xs mt-0.5" style={{ color: '#94a3b8' }}>
                            <Calendar className="w-3 h-3" />
                            {new Date(qr.createdAt).toLocaleDateString('ko-KR')}
                          </div>
                        </div>
                      </div>
                      <StatusBadge status={qr.status} />
                    </div>

                    <div className="flex items-center gap-4 text-xs" style={{ color: '#64748b' }}>
                      <div className="flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5" />
                        {qr.deviceId}
                      </div>
                      {coupon && (
                        <div className="flex items-center gap-1 text-violet-500">
                          <Gift className="w-3.5 h-3.5" />
                          {coupon.couponCode}
                        </div>
                      )}
                    </div>

                    {qr.usedAt && (
                      <div className="mt-2 pt-2 border-t border-slate-100 text-xs" style={{ color: '#94a3b8' }}>
                        인증 완료: {new Date(qr.usedAt).toLocaleString('ko-KR')}
                      </div>
                    )}
                  </GlassCard>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-12" style={{ color: '#94a3b8' }}>
                해당 조건의 QR 코드가 없습니다.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
