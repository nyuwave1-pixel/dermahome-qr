'use client';

import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            도움이 필요하신가요?
          </h2>
          <p className="text-sky-100 mb-10 max-w-lg mx-auto">
            더마홈 고객센터가 언제든 도와드립니다
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            {[
              { icon: Phone, label: '전화 문의', value: '1588-0000' },
              { icon: MessageCircle, label: '카카오톡', value: '@dermahome' },
              { icon: Mail, label: '이메일', value: 'help@unicore.co.kr' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white"
              >
                <item.icon className="w-6 h-6 mx-auto mb-2 text-sky-200" />
                <div className="text-xs text-sky-200 mb-1">{item.label}</div>
                <div className="font-semibold text-sm">{item.value}</div>
              </div>
            ))}
          </div>

          <p className="text-sky-200 text-sm">
            운영 시간: 평일 09:00 - 18:00 (공휴일 제외)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
