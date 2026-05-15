'use client';

import { useEffect, useState } from 'react';
import { Smartphone, Download, Bluetooth, RefreshCw, Activity, Database, Apple, PlayCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';

const connectSteps = [
  { step: 1, title: '앱 다운로드', description: 'App Store 또는 Google Play에서 더마 시리즈 앱을 다운로드합니다.', icon: Download },
  { step: 2, title: '블루투스 활성화', description: '기기와 스마트폰의 블루투스를 모두 켜주세요.', icon: Bluetooth },
  { step: 3, title: '기기 검색', description: '앱에서 "기기 연결" 버튼을 누르면 주변 기기를 자동 검색합니다.', icon: RefreshCw },
  { step: 4, title: '연결 완료', description: '기기를 선택하면 BLE 5.3으로 자동 페어링됩니다.', icon: Activity },
];

export default function AppConnectPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4 safe-top">
        <div className="max-w-2xl mx-auto">
          <div
            className="text-center mb-10 transition-all duration-500"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e293b' }}>앱 연결</h1>
            <p className="text-sm" style={{ color: '#64748b' }}>더마 시리즈 앱과 기기를 연결하여 스마트 케어를 시작하세요</p>
          </div>

          {/* Download buttons */}
          <div
            className="grid grid-cols-2 gap-3 mb-8 transition-all duration-500 delay-100"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <GlassCard className="p-4" hover>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                  <Apple className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-[10px]" style={{ color: '#94a3b8' }}>Download on the</div>
                  <div className="font-bold text-sm" style={{ color: '#1e293b' }}>App Store</div>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-4" hover>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                  <PlayCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-[10px]" style={{ color: '#94a3b8' }}>GET IT ON</div>
                  <div className="font-bold text-sm" style={{ color: '#1e293b' }}>Google Play</div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Connection steps */}
          <div
            className="transition-all duration-500 delay-200"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: '#1e293b' }}>
              <Bluetooth className="w-5 h-5 text-sky-500" />
              기기 연결 방법
            </h2>
            <div className="space-y-3">
              {connectSteps.map((s, i) => (
                <div
                  key={s.step}
                  className="transition-all duration-500"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
                    transitionDelay: `${300 + i * 100}ms`,
                  }}
                >
                  <GlassCard className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg shadow-sky-500/20">
                        {s.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1" style={{ color: '#1e293b' }}>{s.title}</h3>
                        <p className="text-sm" style={{ color: '#64748b' }}>{s.description}</p>
                      </div>
                      <s.icon className="w-5 h-5 text-sky-400 shrink-0 mt-1" />
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>

          {/* BLE explanation */}
          <div
            className="mt-8 transition-all duration-500"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '600ms',
            }}
          >
            <GlassCard className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: '#1e293b' }}>
                <Database className="w-5 h-5 text-violet-500" />
                피부 데이터 동기화
              </h3>
              <div className="space-y-4">
                {[
                  {
                    bg: 'bg-violet-50', iconColor: 'text-violet-500', icon: Bluetooth,
                    title: 'BLE 5.3 저전력 통신',
                    desc: '기기와 앱 간 실시간 데이터 전송, 최대 10m 거리에서 안정적 연결',
                  },
                  {
                    bg: 'bg-sky-50', iconColor: 'text-sky-500', icon: Activity,
                    title: '실시간 피부 데이터',
                    desc: '수분, 유분, 탄력, 색소, 주름 등 5개 채널 데이터 실시간 동기화',
                  },
                  {
                    bg: 'bg-emerald-50', iconColor: 'text-emerald-500', icon: Database,
                    title: '클라우드 저장',
                    desc: '측정 데이터는 클라우드에 안전하게 저장되어 기기 변경 시에도 유지',
                  },
                ].map(({ bg, iconColor, icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${iconColor}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm" style={{ color: '#334155' }}>{title}</h4>
                      <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
