'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, QrCode, Shield, AlertCircle, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import ScanBeam from '@/components/ui/ScanBeam';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useQRStore } from '@/store/useQRStore';

export default function VerifyPage() {
  const router = useRouter();
  const { isScanning, isVerifying, setScanning, setVerifying, setVerifyResult } = useQRStore();
  const [manualCode, setManualCode] = useState('');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);

  const handleScan = useCallback(async (code: string) => {
    if (isVerifying) return;
    setScanning(false);
    setVerifying(true);

    const qrCode = code.includes('code=') ? new URL(code).searchParams.get('code') : code;
    if (!qrCode) {
      setVerifyResult({ success: false, message: '유효하지 않은 QR 코드입니다.', errorType: 'invalid' });
      router.push('/verify/failed?type=invalid');
      return;
    }

    await new Promise((r) => setTimeout(r, 2000));

    if (qrCode === 'UNINCORE-A1B2C') {
      router.push('/verify/used?code=' + qrCode);
    } else if (qrCode === 'UNINCORE-G5H6I') {
      router.push('/verify/failed?type=expired');
    } else {
      setVerifyResult({
        success: true,
        message: '정품 인증이 완료되었습니다.',
        coupon: {
          couponId: 'new-coupon',
          userId: 'demo-user',
          couponCode: 'DH-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
          discountPercent: 15,
          description: '더마홈 정품 인증 프로모션 쿠폰',
          expiredAt: new Date(Date.now() + 30 * 86400000).toISOString(),
          usedAt: null,
          createdAt: new Date().toISOString(),
        },
      });
      router.push('/verify/success');
    }
  }, [isVerifying, setScanning, setVerifying, setVerifyResult, router]);

  const startCamera = useCallback(async () => {
    setScanning(true);
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      stream.getTracks().forEach((t) => t.stop());
    } catch {
      setCameraError('카메라 접근 권한이 필요합니다. 브라우저 설정에서 카메라를 허용해주세요.');
      setScanning(false);
    }
  }, [setScanning]);

  const handleManualSubmit = () => {
    if (manualCode.trim()) handleScan(manualCode.trim());
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4 safe-top safe-bottom">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-500/25">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e293b' }}>QR 정품 인증</h1>
            <p className="text-sm" style={{ color: '#64748b' }}>더마홈 기기의 QR 코드를 스캔해주세요</p>
          </div>

          <AnimatePresence mode="wait">
            {isVerifying ? (
              <motion.div key="verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GlassCard className="p-8">
                  <LoadingSpinner text="피부 분석 디바이스 인증 중..." />
                  <div className="mt-4 space-y-2">
                    {['QR 코드 검증 중', '기기 정보 확인 중', '정품 데이터베이스 조회 중'].map((step, i) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.6 }}
                        className="flex items-center gap-2 text-sm text-slate-500"
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full bg-sky-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                        {step}
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ) : isScanning ? (
              <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GlassCard className="p-0 overflow-hidden">
                  <div className="relative aspect-square bg-slate-900 rounded-2xl flex items-center justify-center">
                    <ScanBeam active />
                    <div className="text-center z-10">
                      <Camera className="w-12 h-12 text-sky-400 mx-auto mb-3" />
                      <p className="text-sky-200 text-sm">QR 코드를 화면에 맞춰주세요</p>
                    </div>
                  </div>
                  <div className="p-4 flex gap-3">
                    <Button variant="ghost" onClick={() => setScanning(false)} className="flex-1">
                      취소
                    </Button>
                    <Button onClick={() => handleScan('UNINCORE-D3E4F')} className="flex-1">
                      데모 인증
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <GlassCard className="p-6" hover onClick={startCamera}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
                      <Camera className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800">카메라로 스캔</h3>
                      <p className="text-sm text-slate-500">QR 코드를 카메라로 촬영합니다</p>
                    </div>
                  </div>
                </GlassCard>

                {cameraError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <p className="text-sm text-red-600">{cameraError}</p>
                  </motion.div>
                )}

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-slate-400">또는</span>
                  </div>
                </div>

                <GlassCard className="p-6">
                  <button
                    className="w-full flex items-center justify-between mb-4"
                    onClick={() => setShowManual(!showManual)}
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-sky-500" />
                      <span className="font-medium text-slate-700">코드 직접 입력</span>
                    </div>
                  </button>
                  <AnimatePresence>
                    {showManual && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="UNINCORE-XXXXX"
                            value={manualCode}
                            onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-center font-mono text-lg tracking-wider focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                          />
                          <Button fullWidth onClick={handleManualSubmit} disabled={!manualCode.trim()}>
                            인증하기
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>

                <div className="text-center">
                  <button onClick={() => router.push('/')} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-sky-500 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    메인으로 돌아가기
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
