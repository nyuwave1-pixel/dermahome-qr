'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'QR 코드는 어디에 있나요?',
    a: '더마홈 기기 본체 하단 또는 제품 박스 내부에 부착되어 있습니다. 기기마다 고유한 QR 코드가 있으며, 정품 인증에 사용됩니다.',
  },
  {
    q: 'QR 코드를 여러 번 사용할 수 있나요?',
    a: '아닙니다. 보안을 위해 각 QR 코드는 1회만 사용 가능합니다. 한번 인증이 완료되면 해당 QR 코드는 사용 완료 상태로 변경됩니다.',
  },
  {
    q: '인증 후 쿠폰은 어떻게 사용하나요?',
    a: '인증 완료 시 자동으로 발급되는 쿠폰은 더마홈 공식 앱 또는 온라인 스토어에서 사용 가능합니다. 쿠폰 코드를 복사하여 결제 시 입력하세요.',
  },
  {
    q: '기기를 앱과 어떻게 연결하나요?',
    a: '더마홈 앱을 다운로드 후, 기기의 블루투스를 켜고 앱에서 "기기 연결"을 터치하면 자동으로 BLE 연결이 진행됩니다.',
  },
  {
    q: 'QR 코드가 인식되지 않아요.',
    a: 'QR 코드가 손상되었거나 카메라 초점이 맞지 않을 수 있습니다. 밝은 환경에서 다시 시도하시고, 문제가 지속되면 고객센터로 문의해주세요.',
  },
  {
    q: '해외에서도 인증이 가능한가요?',
    a: '네, 인터넷 연결이 가능한 환경이라면 전 세계 어디서든 QR 인증이 가능합니다.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50/50" />
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-sky-500 tracking-wider uppercase mb-3 block">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            자주 묻는 질문
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-100 overflow-hidden"
            >
              <button
                className="w-full flex items-center gap-3 p-5 text-left hover:bg-slate-50/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <HelpCircle className="w-5 h-5 text-sky-500 shrink-0" />
                <span className="flex-1 font-medium text-slate-700">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-13 text-sm text-slate-500 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
