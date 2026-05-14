'use client';

import { Scan, Activity, Droplets, Zap, Shield, Wifi } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const features = [
  {
    icon: Scan,
    title: 'AI 피부 스캔',
    description: '고정밀 센서와 AI 분석으로 피부 상태를 정확하게 진단합니다.',
    color: 'from-sky-400 to-blue-500',
  },
  {
    icon: Activity,
    title: '실시간 모니터링',
    description: '피부 수분, 유분, 탄력을 실시간으로 측정하고 추적합니다.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Droplets,
    title: '맞춤 케어 솔루션',
    description: '분석 결과에 기반한 개인 맞춤형 피부 관리 프로그램을 제공합니다.',
    color: 'from-violet-400 to-purple-500',
  },
  {
    icon: Zap,
    title: '갈바닉 이온 테라피',
    description: '미세 전류로 유효 성분의 피부 흡수를 극대화합니다.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: Shield,
    title: '정품 인증 시스템',
    description: 'QR 기반 1회성 정품 인증으로 위조 제품을 차단합니다.',
    color: 'from-sky-400 to-cyan-500',
  },
  {
    icon: Wifi,
    title: 'BLE 스마트 연동',
    description: '블루투스 저전력 통신으로 앱과 실시간 데이터를 동기화합니다.',
    color: 'from-rose-400 to-pink-500',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50/30 to-white" />
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-sky-500 tracking-wider uppercase mb-3 block">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1e293b' }}>
            스마트 피부 관리의 시작
          </h2>
          <p style={{ color: '#64748b' }} className="max-w-lg mx-auto">
            더마홈 디바이스와 함께하는 혁신적인 피부 분석 기술
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <GlassCard key={feature.title} hover className="p-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#1e293b' }}>{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
