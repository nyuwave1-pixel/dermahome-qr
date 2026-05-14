'use client';

import { motion } from 'framer-motion';
import { QrCode, ShieldCheck, Gift, Smartphone } from 'lucide-react';

const steps = [
  {
    icon: QrCode,
    step: '01',
    title: 'QR 코드 스캔',
    description: '더마홈 기기의 QR 코드를 모바일 카메라로 스캔합니다.',
    color: 'from-sky-400 to-blue-500',
  },
  {
    icon: ShieldCheck,
    step: '02',
    title: '정품 인증',
    description: '서버에서 QR 코드를 검증하고 정품 여부를 확인합니다.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Gift,
    step: '03',
    title: '쿠폰 발급',
    description: '인증 완료 시 프로모션 쿠폰이 자동으로 발급됩니다.',
    color: 'from-violet-400 to-purple-500',
  },
  {
    icon: Smartphone,
    step: '04',
    title: '앱 연동',
    description: '더마홈 앱과 기기를 연결하여 스마트 케어를 시작합니다.',
    color: 'from-rose-400 to-pink-500',
  },
];

export default function QRProcessSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-sky-400 tracking-wider uppercase mb-3 block">Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            QR 인증 프로세스
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            간편한 4단계로 정품 인증을 완료하세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-slate-600 to-transparent" />
              )}
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-sky-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-slate-600">{s.step}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
