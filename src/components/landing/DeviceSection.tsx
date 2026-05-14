'use client';

import { motion } from 'framer-motion';
import { Cpu, Waves, Gauge, Battery, Bluetooth, Thermometer } from 'lucide-react';

const specs = [
  { icon: Cpu, label: 'AI 분석 칩셋', value: 'DermaSense v3' },
  { icon: Waves, label: '갈바닉 주파수', value: '30~300MHz' },
  { icon: Gauge, label: '피부 센서', value: '5채널 멀티센서' },
  { icon: Battery, label: '배터리', value: '2000mAh / 8h' },
  { icon: Bluetooth, label: '연결', value: 'BLE 5.3' },
  { icon: Thermometer, label: '온열 모드', value: '38~42°C' },
];

export default function DeviceSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Device visual */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative w-72 h-96">
              <motion.div
                className="absolute inset-0 rounded-[60px] bg-gradient-to-b from-slate-100 via-white to-slate-50 border border-slate-200/60 shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Screen area */}
                <div className="absolute top-12 left-6 right-6 h-40 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(56,189,248,0.3) 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                  }} />
                  {/* HUD elements */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <span className="text-[10px] text-sky-400 font-mono">DERMASENSE</span>
                    <span className="text-[10px] text-emerald-400 font-mono">ACTIVE</span>
                  </div>
                  <motion.div
                    className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-2 border-sky-400/50"
                    animate={{ scale: [1, 1.1, 1], borderColor: ['rgba(56,189,248,0.3)', 'rgba(56,189,248,0.8)', 'rgba(56,189,248,0.3)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="absolute inset-2 rounded-full border border-sky-300/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.div>
                  {/* Metrics */}
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between">
                    <div className="text-center">
                      <div className="text-[9px] text-slate-500">수분</div>
                      <div className="text-sm font-bold text-sky-400">78%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[9px] text-slate-500">유분</div>
                      <div className="text-sm font-bold text-emerald-400">42%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[9px] text-slate-500">탄력</div>
                      <div className="text-sm font-bold text-violet-400">85%</div>
                    </div>
                  </div>
                </div>
                {/* Button */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-slate-200 to-slate-100 border border-slate-300/50 shadow-inner flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 shadow-lg shadow-sky-500/30" />
                </div>
              </motion.div>

              {/* Glow */}
              <div className="absolute -inset-4 rounded-[70px] bg-gradient-to-b from-sky-200/20 to-blue-200/10 blur-xl -z-10" />
            </div>
          </motion.div>

          {/* Specs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-sky-500 tracking-wider uppercase mb-3 block">Device</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              DermaHome Pro
            </h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              메디컬 에스테틱 기술을 담은 프리미엄 홈케어 디바이스.
              AI 피부 분석과 갈바닉 이온 테라피로 피부 깊숙이 관리합니다.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {specs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100"
                >
                  <spec.icon className="w-5 h-5 text-sky-500 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-400">{spec.label}</div>
                    <div className="text-sm font-semibold text-slate-700">{spec.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
