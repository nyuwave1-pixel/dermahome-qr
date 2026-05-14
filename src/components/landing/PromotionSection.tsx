'use client';

import { motion } from 'framer-motion';
import { Gift, Percent, Clock, Star } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const promos = [
  {
    icon: Percent,
    title: '정품 인증 쿠폰',
    description: 'QR 인증 시 15% 할인 쿠폰 자동 지급',
    highlight: '15% OFF',
    color: 'from-sky-400 to-blue-500',
  },
  {
    icon: Gift,
    title: '앱 연동 보너스',
    description: '더마홈 앱 최초 연동 시 추가 10% 쿠폰',
    highlight: '+10% 추가',
    color: 'from-violet-400 to-purple-500',
  },
  {
    icon: Star,
    title: 'VIP 멤버십',
    description: '3개 이상 기기 등록 시 VIP 등급 자동 승급',
    highlight: 'VIP',
    color: 'from-amber-400 to-orange-500',
  },
];

export default function PromotionSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50/20 to-white" />
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-sky-500 tracking-wider uppercase mb-3 block">Promotion</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            프로모션 혜택
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            정품 인증 고객에게 드리는 특별한 혜택
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo, i) => (
            <GlassCard key={promo.title} hover className="p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${promo.color} flex items-center justify-center shadow-lg`}>
                    <promo.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${promo.color} text-white`}>
                    {promo.highlight}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{promo.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{promo.description}</p>
              </motion.div>
            </GlassCard>
          ))}
        </div>

        <motion.div
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">한정 기간 프로모션</span>
          </div>
          <p className="text-sky-100 text-sm">
            2026년 12월 31일까지 인증 시 추가 5% 할인 쿠폰을 드립니다
          </p>
        </motion.div>
      </div>
    </section>
  );
}
