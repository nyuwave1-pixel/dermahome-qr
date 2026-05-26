'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Clock, Target, Zap } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useInView } from '@/hooks/useInView';

interface Step {
  head: string;
  headEn: string;
  product: string;
  time: string;
  goal: string;
  color: string;
}

interface Protocol {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  desc: string;
  steps: Step[];
  directions?: { area: string; instruction: string }[];
  tips?: string[];
}

const faceProtocols: Protocol[] = [
  {
    id: 'whitening',
    title: '화이트닝 케어',
    subtitle: 'Night 30분 케어',
    tag: 'BRIGHTENING',
    tagColor: '#f472b6',
    desc: '피부 미백과 톤업을 위한 나이트 루틴. 이온 침투로 미백 성분을 진피층에 깊이 전달합니다.',
    steps: [
      {
        head: '이온토포레시스',
        headEn: 'Iontophoresis',
        product: '수딩 앤 모이스트 케어 부스팅 젤',
        time: '10분',
        goal: '미백 성분 이온 침투',
        color: '#818cf8',
      },
      {
        head: 'RF 고주파',
        headEn: 'Face RF',
        product: '수딩 앤 모이스트 케어 부스팅 젤',
        time: '10분',
        goal: '피부 온도 상승 · 흡수 가속',
        color: '#e879f9',
      },
      {
        head: '울트라소닉',
        headEn: 'Ultrasonic',
        product: '수딩 앤 모이스트 케어 부스팅 젤',
        time: '10분',
        goal: '초음파 진동으로 성분 고착',
        color: '#38bdf8',
      },
    ],
    directions: [
      { area: '이마', instruction: '미간 → 헤어라인' },
      { area: '눈가', instruction: '눈 안쪽 → 헤어라인 (리프팅)' },
      { area: '뺨', instruction: '입가 → 관자놀이' },
      { area: '목', instruction: '쇄골 → 턱선 방향' },
    ],
    tips: [
      '미스트는 마무리에 필수',
      '세안 직후 건조하지 않은 상태에서 사용',
    ],
  },
  {
    id: 'wrinkle',
    title: '링클 케어',
    subtitle: 'Night 30분 케어',
    tag: 'ANTI-AGING',
    tagColor: '#e879f9',
    desc: '주름 완화와 피부 탄력 집중 케어. RF 리프팅으로 콜라겐 재생을 촉진합니다.',
    steps: [
      {
        head: '이온토포레시스',
        headEn: 'Iontophoresis',
        product: '수딩 앤 모이스트 케어 부스팅 젤',
        time: '5분',
        goal: '수분 · 탄력 성분 베이스 형성',
        color: '#818cf8',
      },
      {
        head: 'RF 고주파',
        headEn: 'Face RF',
        product: '수딩 앤 모이스트 케어 부스팅 젤',
        time: '15분',
        goal: '콜라겐 재생 · V라인 리프팅',
        color: '#e879f9',
      },
      {
        head: '울트라소닉',
        headEn: 'Ultrasonic',
        product: '수딩 앤 모이스트 케어 부스팅 젤',
        time: '10분',
        goal: '탄력 성분 딥 침투',
        color: '#38bdf8',
      },
    ],
    directions: [
      { area: '턱선', instruction: '아래 → 관자놀이 (V라인)' },
      { area: '볼', instruction: '입가 → 관자놀이 (탄력 정리)' },
      { area: '눈가', instruction: '눈꼬리 → 헤어라인 (리프팅)' },
      { area: '이마', instruction: '미간 → 헤어라인 (라인 정리)' },
      { area: '목', instruction: '쇄골 → 턱선 (단락 방향 주의)' },
    ],
    tips: [
      '목은 림프와 반대 방향으로 사용',
    ],
  },
];

const bodyProtocols: Protocol[] = [
  {
    id: 'circulation',
    title: '순환 부종 케어',
    subtitle: '하체 순환 · 부종 완화',
    tag: 'CIRCULATION',
    tagColor: '#38bdf8',
    desc: '림프 순환 장애와 정맥 순환 불량으로 인한 하지 부종 및 울혈 완화 전용 케어.',
    steps: [
      {
        head: 'RF 고주파',
        headEn: 'Body RF',
        product: '하이퍼루프 바디 크림',
        time: '10분',
        goal: '심부 온도 상승 · 순환 활성화',
        color: '#f472b6',
      },
      {
        head: '울트라소닉',
        headEn: 'Ultrasonic',
        product: '수딩 앤 모이스트 케어 부스팅 젤',
        time: '10분',
        goal: '조직 완화 · 림프 자극',
        color: '#38bdf8',
      },
      {
        head: '이온토포레시스',
        headEn: 'Iontophoresis',
        product: '수딩 앤 모이스트 케어 부스팅 젤',
        time: '10분',
        goal: '진정 · 순환 성분 침투',
        color: '#818cf8',
      },
    ],
    directions: [
      { area: '오래 서 있는 경우', instruction: '발목부터 집중적으로 걷기 방향' },
      { area: '오래 앉아있는 경우', instruction: '허벅지, 사타구니 림프 방향 집중' },
      { area: '생리 전 부종', instruction: '림프 흐름을 전체적으로 부드럽게' },
      { area: '고양이 다리 케어', instruction: '고양식 생리 전 전체적 부드럽게' },
    ],
    tips: [
      '오래 서있는 분: 종아리 → 오금 → 허벅지 방향을 집중적으로 걷게',
      '오래 앉아있는 분: 허벅지, 사에부 품목을 먼저 알아야 함',
      '고양식-생리 전 부종: 림프 흐름 전체적으로 부드럽게',
    ],
  },
  {
    id: 'slim',
    title: '슬림바디 라인 케어',
    subtitle: '지방 섬유화 완화',
    tag: 'SLIMMING',
    tagColor: '#fb923c',
    desc: '지방 섬유화로 굳어진 조직을 완화하고 바디 라인을 개선하는 집중 케어.',
    steps: [
      {
        head: 'RF 고주파',
        headEn: 'Body RF',
        product: '하이퍼루프 바디 크림 / 딥 리페어 액티베이팅 뉴트리션 크림',
        time: '10분',
        goal: '지방 조직 심부 온도 상승',
        color: '#f472b6',
      },
      {
        head: '울트라소닉',
        headEn: 'Ultrasonic',
        product: '수딩 앤 모이스트 케어 부스팅 젤',
        time: '10분',
        goal: '굳은 조직 진동 완화',
        color: '#38bdf8',
      },
      {
        head: '이온토포레시스',
        headEn: 'Iontophoresis',
        product: '수딩 앤 모이스트 케어 부스팅 젤',
        time: '10분',
        goal: '슬리밍 성분 이온 침투',
        color: '#818cf8',
      },
    ],
    directions: [
      { area: '복부', instruction: '옆구리(아래) → 중앙(시계방향) → 바깥방향' },
      { area: '팔', instruction: '손목 → 팔꿈치 → 상부(위에서 아래)' },
      { area: '허벅지', instruction: '바깥쪽 → 중앙 → 안쪽 (사타구니)' },
    ],
    tips: [
      '목욕 후 따뜻한 상태에서 사용 시 효과 극대화',
    ],
  },
  {
    id: 'muscle',
    title: '근막·근육 이완 케어',
    subtitle: '근막 유착 · 만성 긴장 완화',
    tag: 'RELAXATION',
    tagColor: '#7bae52',
    desc: '만성적인 근막 유착과 근육 긴장을 완화하는 전문 바디 케어 프로그램.',
    steps: [
      {
        head: 'RF 고주파',
        headEn: 'Body RF',
        product: '하이퍼루프 바디 크림 / 딥 리페어 액티베이팅 뉴트리션 크림',
        time: '10분',
        goal: '근막 온도 상승',
        color: '#f472b6',
      },
      {
        head: '울트라소닉',
        headEn: 'Ultrasonic',
        product: '수딩 앤 모이스트 케어 부스팅 젤',
        time: '10분',
        goal: '깊은 진동으로 뭉친 조직 완화',
        color: '#38bdf8',
      },
      {
        head: '이온토포레시스',
        headEn: 'Iontophoresis',
        product: '수딩 앤 모이스트 케어 부스팅 젤',
        time: '10분',
        goal: '진정 · 근육 피로 회복',
        color: '#818cf8',
      },
    ],
    directions: [
      { area: '목·어깨', instruction: '귀 뒤(위→아래) → 어깨(목→바깥쪽) → 견갑골(위→아래)' },
      { area: '등', instruction: '척추 옆 → 옆구리 → 겨드랑이' },
    ],
    tips: [
      '목 어깨 부위는 림프 방향을 반드시 확인하고 사용',
    ],
  },
];

function ProtocolCard({ protocol, index, inView }: { protocol: Protocol; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="transition-all duration-500"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'var(--su-1)',
          border: '1px solid var(--bd-2)',
        }}
      >
        {/* Card header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left p-5"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider"
                style={{
                  background: `${protocol.tagColor}18`,
                  color: protocol.tagColor,
                  border: `1px solid ${protocol.tagColor}30`,
                }}
              >
                {protocol.tag}
              </span>
              <span
                className="text-xs"
                style={{ color: 'var(--t-6)' }}
              >
                {protocol.subtitle}
              </span>
            </div>
            <span
              className="text-xs transition-transform duration-300 shrink-0 mt-0.5"
              style={{
                color: 'var(--t-7)',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                display: 'inline-block',
              }}
            >
              ▾
            </span>
          </div>
          <h3 className="text-base font-bold mb-1.5" style={{ color: 'var(--t-1)' }}>
            {protocol.title}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--t-5)' }}>
            {protocol.desc}
          </p>

          {/* Step summary chips */}
          <div className="flex items-center gap-1.5 mt-4 flex-wrap">
            {protocol.steps.map((s, si) => (
              <div key={si} className="flex items-center gap-1">
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                  style={{
                    background: `${s.color}18`,
                    color: s.color,
                    border: `1px solid ${s.color}28`,
                  }}
                >
                  {si + 1}. {s.head}
                </span>
                {si < protocol.steps.length - 1 && (
                  <ArrowRight className="w-3 h-3 shrink-0" style={{ color: 'var(--t-7)' }} />
                )}
              </div>
            ))}
          </div>
        </button>

        {/* Expanded detail */}
        <div
          className="overflow-hidden transition-all duration-400"
          style={{ maxHeight: open ? '1000px' : '0px' }}
        >
          <div
            className="mx-5 mb-5 pt-4"
            style={{ borderTop: '1px solid var(--bd-3)' }}
          >
            {/* Detailed steps */}
            <div className="space-y-3 mb-4">
              {protocol.steps.map((s, si) => (
                <div
                  key={si}
                  className="flex gap-3 p-3.5 rounded-xl"
                  style={{
                    background: `${s.color}08`,
                    border: `1px solid ${s.color}20`,
                  }}
                >
                  {/* Step number */}
                  <div
                    className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-black"
                    style={{ background: `${s.color}22`, color: s.color }}
                  >
                    {si + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-bold" style={{ color: s.color }}>{s.head}</span>
                      <span className="text-[10px]" style={{ color: 'var(--t-6)' }}>
                        {s.headEn}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="flex items-center gap-1" style={{ color: 'var(--t-3)' }}>
                        <Clock className="w-3 h-3" />
                        {s.time}
                      </span>
                      <span className="flex items-center gap-1" style={{ color: 'var(--t-3)' }}>
                        <Target className="w-3 h-3" />
                        {s.goal}
                      </span>
                    </div>
                    <div
                      className="mt-1.5 text-[10px] leading-relaxed"
                      style={{ color: 'var(--t-6)' }}
                    >
                      제품: {s.product}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Directions */}
            {protocol.directions && protocol.directions.length > 0 && (
              <div
                className="p-4 rounded-xl mb-3"
                style={{
                  background: 'rgba(92,138,60,0.06)',
                  border: '1px solid rgba(92,138,60,0.18)',
                }}
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <Zap className="w-3.5 h-3.5" style={{ color: '#7bae52' }} />
                  <span className="text-xs font-bold tracking-wide uppercase" style={{ color: '#7bae52' }}>
                    부위별 방향
                  </span>
                </div>
                <div className="space-y-1.5">
                  {protocol.directions.map((d) => (
                    <div key={d.area} className="flex gap-2 text-xs">
                      <span
                        className="shrink-0 font-semibold"
                        style={{ color: '#9dd470', minWidth: '5rem' }}
                      >
                        {d.area}
                      </span>
                      <span style={{ color: 'var(--t-3)' }}>{d.instruction}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {protocol.tips && protocol.tips.length > 0 && (
              <div className="space-y-1.5">
                {protocol.tips.map((tip, ti) => (
                  <div key={ti} className="flex items-start gap-2 text-xs">
                    <span
                      className="mt-1 w-1 h-1 rounded-full shrink-0"
                      style={{ background: '#5c8a3c' }}
                    />
                    <span style={{ color: 'var(--t-5)' }}>{tip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GuideSection() {
  const { ref: sectionRef, inView } = useInView(0.06);
  const [tab, setTab] = useState<'face' | 'body'>('face');
  const { t } = useLanguage();

  const currentProtocols = tab === 'face' ? faceProtocols : bodyProtocols;

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} id="guide" className="py-28 relative overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(92,138,60,0.04) 40%, rgba(92,138,60,0.02) 60%, transparent)',
        }}
      />
      {/* Grid dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(92,138,60,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* Header */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#7bae52' }}
          >
            {t('guide.tag')}
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span style={{ color: 'var(--t-1)' }}>{t('guide.h2_1')}</span>
            <span className="text-gradient-green">{t('guide.h2_2')}</span>
          </h2>
          <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: 'var(--t-4)' }}>
            {t('guide.desc')}
          </p>
        </div>

        {/* Tab switcher */}
        <div
          className="flex justify-center mb-10 transition-all duration-700 delay-100"
          style={{ opacity: inView ? 1 : 0 }}
        >
          <div
            className="inline-flex rounded-xl p-1"
            style={{
              background: 'var(--su-1)',
              border: '1px solid var(--bd-2)',
            }}
          >
            {([
              { id: 'face' as const, labelKey: 'guide.tab_face' },
              { id: 'body' as const, labelKey: 'guide.tab_body' },
            ]).map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{
                  background: tab === item.id ? 'rgba(92,138,60,0.22)' : 'transparent',
                  color: tab === item.id ? '#9dd470' : 'var(--t-5)',
                  border: tab === item.id ? '1px solid rgba(92,138,60,0.35)' : '1px solid transparent',
                }}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Protocol cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {currentProtocols.map((protocol, i) => (
            <ProtocolCard
              key={protocol.id}
              protocol={protocol}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div
          className="mt-12 p-5 rounded-2xl text-center transition-all duration-700 delay-400"
          style={{
            background: 'rgba(92,138,60,0.05)',
            border: '1px solid rgba(92,138,60,0.18)',
            opacity: inView ? 1 : 0,
          }}
        >
          <p className="text-sm" style={{ color: 'var(--t-4)' }}>
            <span className="font-semibold" style={{ color: '#9dd470' }}>{t('guide.tip_label')}</span>
            {' '}— {t('guide.tip_text')}
          </p>
        </div>
      </div>
    </section>
  );
}
