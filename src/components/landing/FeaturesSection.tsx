'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

/* ─── Head data ──────────────────────────────────────────────── */
const heads = [
  {
    num: '01', name: '고주파 RF', en: 'High Radio Frequency',
    tag: 'ANTI-AGING', color: '#e879f9',
    img: '/images/face_rf.jpg',
    mechanism: '고주파(RF) 에너지가 진피층까지 도달 → 열 발생(진피·피하지방층 열 스트레스) → 콜라겐 수축 + 신생 콜라겐 유도',
    parts: [
      { label: '진피 재생 촉진', body: '새로 활성↑, 콜라겐 합성↑ → 탄력 회복' },
      { label: '피부 표면 개선', body: '잔주름·모공·피부 두께 전반 개선' },
      { label: '볼륨 감소 완화', body: '지방 패드 지지력 강화 → 처짐 완화' },
    ],
    tech: 'RF 고주파', time: '10~15분', target: '이마 · 뺨 · 턱선 · 목', benefit: '콜라겐 재생 · 리프팅',
  },
  {
    num: '02', name: '울트라소닉', en: 'Ultrasonic SMAS',
    tag: 'SMAS LIFT', color: '#38bdf8',
    img: '/images/ultrasonic.jpg',
    mechanism: '초음파로 SMAS층(근육층 위 결합조직)을 집중 가열 60~70°C → 즉각적 조직 수축 + 콜라겐 재생 자극',
    parts: [
      { label: '피부-근육 지지력 강화', body: 'SMAS 수축 → 턱선·볼 라인 리프팅' },
      { label: '콜라겐 신생 촉진', body: '섬유아세포 자극 → 새 콜라겐 합성↑' },
      { label: '비수술적 접근', body: '40~60대 여성에게 안전한 리프팅 가능' },
    ],
    tech: '초음파 1MHz', time: '10분', target: '얼굴 전체 · 바디', benefit: 'SMAS 리프팅 · 콜라겐',
  },
  {
    num: '03', name: '이온토포레시스', en: 'Iontophoresis',
    tag: 'ION THERAPY', color: '#818cf8',
    img: '/images/iontophoresis.jpg',
    mechanism: '미세 전류로 이온화된 활성 성분(비타민, 펩타이드 등)을 피부 깊숙이 침투 → 세포 수준 흡수↑ → 섬유아세포·피부 기능 강화',
    parts: [
      { label: '세포 활성 회복', body: '약화된 섬유아세포에 활성 영양 직접 공급' },
      { label: '콜라겐·수분 보충', body: '히알루론산·펩타이드 직접 공급 → 탄력↑' },
      { label: '보조 치료', body: 'RF·US 리프팅 후 유지·강화에 최적' },
    ],
    tech: '갈바닉 미세전류', time: '10분', target: '얼굴 전체 · 바디', benefit: '영양 침투 · 피로 회복',
  },
  {
    num: '04', name: '바디 RF', en: 'Body RF',
    tag: 'BODY SLIM', color: '#f472b6',
    img: '/images/body_rf.jpg',
    mechanism: '전신 RF 에너지로 피하 지방층 가열 → 지방 섬유화 완화 + 피부 탄력 강화',
    parts: [
      { label: '셀룰라이트 개선', body: '지방 패드의 섬유화 조직 분해·완화' },
      { label: '전신 탄력 강화', body: 'RF 열로 진피 콜라겐 수축 → 탄력 회복' },
      { label: '순환 촉진', body: '혈류·림프 순환 개선, 노폐물 배출' },
    ],
    tech: 'RF 고주파', time: '각 부위 10분', target: '복부 · 팔 · 허벅지 · 종아리', benefit: '셀룰라이트 · 탄력',
  },
  {
    num: '05', name: '스킨스크러버', en: 'Skin Scrubber',
    tag: 'DEEP CLEANSE', color: '#34d399',
    img: '/images/skin_scrubber.jpg',
    mechanism: '초음파 스크러빙 진동으로 각질 세포막을 분리 → 모공 속 노폐물·각질 제거 → 후속 성분 흡수력 극대화',
    parts: [
      { label: '각질·노폐물 제거', body: '모공 속 쌓인 각질과 피지 효과적 제거' },
      { label: '흡수력 극대화', body: '클렌징 후 후속 앰플·크림 흡수율 대폭↑' },
      { label: '피부결 개선', body: '매끈하고 균일한 피부결 즉각 효과' },
    ],
    tech: '초음파 스크러빙', time: '5~8분', target: '코 · T존 · 뺨', benefit: '각질 제거 · 모공 정화',
  },
  {
    num: '06', name: '고주파', en: 'High Frequency',
    tag: 'ANTIBACTERIAL', color: '#fb923c',
    img: '/images/highfreq_head1.jpg',
    mechanism: '고주파 전류가 피부 표면 살균 → 여드름균(P.acnes) 사멸 → 트러블 진정 및 피지 분비 조절',
    parts: [
      { label: '살균·항균', body: '트러블 원인균 즉각 사멸, 재발 방지' },
      { label: '트러블 진정', body: '홍조·붓기 완화 및 피지 분비 조절' },
      { label: '피부 진정', body: '민감 피부의 붉음증·열감 즉시 완화' },
    ],
    tech: '고주파 전류', time: '5~10분', target: '트러블 부위', benefit: '살균 · 진정 · 트러블 케어',
  },
  {
    num: '07', name: '쿨 & 핫', en: 'Cool & Hot Therapy',
    tag: 'THERMO CARE', color: '#7bae52',
    img: '/images/cool_hot.jpg',
    mechanism: '쿨(10°C) · 핫(42°C) 온도 테라피를 교차 적용 → 모공 수축·확장 사이클 → 성분 흡수 극대화 및 혈행 촉진',
    parts: [
      { label: '모공 수축·개선', body: '쿨 10°C로 즉각 수축, 피부결 정돈' },
      { label: '흡수 촉진', body: '핫 42°C로 모공 확장 후 성분 침투↑' },
      { label: '혈행 촉진', body: '냉온 교차로 혈액순환 활성화, 생기 부여' },
    ],
    tech: '냉온 테라피', time: '5~10분', target: '얼굴 전체', benefit: '모공 수축 · 흡수 촉진',
  },
  {
    num: '08', name: '산소주입기', en: 'Oxygen Infuser',
    tag: 'OXYGEN BOOST', color: '#a78bfa',
    img: '/images/oxygen_infuser.jpg',
    mechanism: '고압 순수 산소를 피부에 직접 주입 → 세포 산소 공급 증가 → 세포 활성화 및 즉각적인 윤기·생기',
    parts: [
      { label: '산소 공급', body: '세포 레벨 산소↑ → 즉각 생기·광채' },
      { label: '세포 활성화', body: '산소 공급으로 세포 대사 촉진, 재생력↑' },
      { label: '보습·윤기', body: '수분 밸런스 최적화, 건강한 광채 회복' },
    ],
    tech: '고압 순수 산소', time: '5~10분', target: '얼굴 전체', benefit: '피부 활력 · 윤기 회복',
  },
];

export default function FeaturesSection() {
  const { ref: sectionRef, inView } = useInView(0.05);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const head = heads[active];

  function switchHead(i: number) {
    if (i === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(i);
      setAnimating(false);
    }, 180);
  }

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} id="heads" className="py-28 relative overflow-hidden">

      {/* Dynamic bg glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 65% 50%, ${head.color}07 0%, transparent 65%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">

        {/* ── Header ───────────────────────────────────────── */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7bae52' }}>
            8 Head System
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span style={{ color: 'var(--t-1)' }}>더마10 — </span>
            <span className="text-gradient-green">8종 헤드 시스템</span>
          </h2>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: 'var(--t-4)' }}>
            헤드를 선택해 작용 원리와 케어 효과를 확인하세요.
          </p>
        </div>

        {/* ── Mobile: horizontal tab scroll ──────────────────── */}
        <div
          className="flex gap-2 overflow-x-auto pb-3 mb-4 lg:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {heads.map((h, i) => (
            <button
              key={h.num}
              onClick={() => switchHead(i)}
              className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200"
              style={{
                background: active === i ? `${h.color}18` : 'var(--su-1)',
                border: `1px solid ${active === i ? `${h.color}50` : 'var(--bd-2)'}`,
                color: active === i ? h.color : 'var(--t-5)',
              }}
            >
              <span className="font-black" style={{ opacity: 0.7 }}>{h.num}</span>
              {h.name}
            </button>
          ))}
        </div>

        {/* ── Main layout ──────────────────────────────────── */}
        <div
          className="flex gap-4 flex-col lg:flex-row transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transitionDelay: '100ms' }}
        >

          {/* ── Left: Vertical selector (desktop only) ────── */}
          <div className="hidden lg:flex flex-col gap-0.5 w-60 shrink-0">
            {heads.map((h, i) => (
              <button
                key={h.num}
                onClick={() => switchHead(i)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group"
                style={{
                  background: active === i ? `${h.color}10` : 'transparent',
                  borderLeft: `2px solid ${active === i ? h.color : 'transparent'}`,
                }}
              >
                <span
                  className="text-xs font-black w-7 transition-all duration-200"
                  style={{ color: active === i ? h.color : 'var(--t-7)' }}
                >
                  {h.num}
                </span>
                <div>
                  <div
                    className="text-sm font-bold leading-tight transition-all duration-200"
                    style={{ color: active === i ? 'var(--t-1)' : 'var(--t-5)' }}
                  >
                    {h.name}
                  </div>
                  <div
                    className="text-[10px] font-semibold tracking-wider uppercase transition-all duration-200"
                    style={{ color: active === i ? h.color : 'var(--t-7)' }}
                  >
                    {h.tag}
                  </div>
                </div>
                {active === i && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: h.color }} />
                )}
              </button>
            ))}
          </div>

          {/* ── Right: Showcase panel ─────────────────────── */}
          <div
            className="flex-1 rounded-3xl overflow-hidden relative"
            style={{
              background: 'var(--su-2)',
              border: '1px solid var(--bd-2)',
              minHeight: '500px',
            }}
          >
            {/* Ghost big number */}
            <div
              className="absolute top-2 right-4 select-none pointer-events-none font-black leading-none transition-all duration-500"
              style={{
                fontSize: 'clamp(120px, 18vw, 200px)',
                color: `${head.color}06`,
                letterSpacing: '-0.05em',
              }}
            >
              {head.num}
            </div>

            {/* Accent corner glow */}
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none transition-all duration-1000"
              style={{
                background: `radial-gradient(circle, ${head.color}12 0%, transparent 70%)`,
                transform: 'translate(25%, -25%)',
              }}
            />

            {/* Content */}
            <div
              className="relative z-10 p-6 md:p-8 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 transition-all duration-200"
              style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'translateY(0)' }}
            >

              {/* ── Image + specs col ──────────────────── */}
              <div className="md:col-span-2 flex flex-col items-center gap-4">

                {/* Head image */}
                <div
                  className="relative w-full max-w-[280px] rounded-2xl overflow-hidden transition-all duration-700"
                  style={{
                    aspectRatio: '1',
                    background: 'linear-gradient(160deg, #f4f4f0 0%, #e8e8e4 100%)',
                    boxShadow: `0 0 60px ${head.color}22, 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)`,
                  }}
                >
                  <Image
                    src={head.img}
                    alt={head.name}
                    fill
                    className="object-contain p-8 transition-all duration-500"
                  />
                  {/* Tag badge */}
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider"
                    style={{
                      background: `${head.color}18`,
                      color: head.color,
                      border: `1px solid ${head.color}35`,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {head.tag}
                  </div>
                  {/* Number chip */}
                  <div
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm"
                    style={{ background: 'var(--t-bg-gl)', color: head.color, backdropFilter: 'blur(8px)' }}
                  >
                    {head.num}
                  </div>
                </div>

                {/* Spec table */}
                <div
                  className="w-full rounded-2xl overflow-hidden"
                  style={{ border: '1px solid var(--bd-3)' }}
                >
                  {[
                    { label: '기술', val: head.tech },
                    { label: '시간', val: head.time },
                    { label: '부위', val: head.target },
                  ].map(({ label, val }, i) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 px-4 py-2.5 text-xs"
                      style={{
                        borderBottom: i < 2 ? '1px solid var(--bd-3)' : 'none',
                        background: i % 2 === 0 ? 'var(--su-3)' : 'transparent',
                      }}
                    >
                      <span
                        className="shrink-0 w-8 font-semibold"
                        style={{ color: `${head.color}99` }}
                      >
                        {label}
                      </span>
                      <span style={{ color: 'var(--t-2)' }}>{val}</span>
                    </div>
                  ))}
                </div>

                {/* Benefit pill */}
                <div
                  className="w-full text-center py-2 px-4 rounded-xl text-xs font-semibold"
                  style={{
                    background: `${head.color}12`,
                    border: `1px solid ${head.color}28`,
                    color: head.color,
                  }}
                >
                  {head.benefit}
                </div>
              </div>

              {/* ── Mechanism + Effects col ─────────────── */}
              <div className="md:col-span-3 flex flex-col gap-5">

                {/* Name */}
                <div>
                  <div
                    className="text-[10px] font-bold tracking-widest uppercase mb-1.5"
                    style={{ color: `${head.color}aa` }}
                  >
                    {head.en}
                  </div>
                  <h3
                    className="text-2xl md:text-3xl font-black leading-tight"
                    style={{ color: 'var(--t-1)' }}
                  >
                    {head.name}
                  </h3>
                </div>

                {/* Mechanism box */}
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    background: `${head.color}0a`,
                    border: `1px solid ${head.color}22`,
                  }}
                >
                  <div
                    className="text-[10px] font-bold tracking-widest uppercase mb-2 flex items-center gap-2"
                    style={{ color: head.color }}
                  >
                    <span
                      className="w-3.5 h-px"
                      style={{ background: head.color, display: 'inline-block' }}
                    />
                    작용 원리
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--t-2)' }}
                  >
                    {head.mechanism}
                  </p>
                </div>

                {/* 3 Effect cards */}
                <div>
                  <div
                    className="text-[10px] font-bold tracking-widest uppercase mb-2.5"
                    style={{ color: 'var(--t-7)' }}
                  >
                    케어 효과
                  </div>
                  <div className="flex flex-col gap-2">
                    {head.parts.map((part, i) => (
                      <div
                        key={i}
                        className="flex gap-3 items-start p-3.5 rounded-xl"
                        style={{
                          background: 'var(--su-2)',
                          border: '1px solid var(--bd-3)',
                        }}
                      >
                        <div
                          className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black"
                          style={{ background: `${head.color}18`, color: head.color }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <div
                            className="text-xs font-bold mb-0.5"
                            style={{ color: 'var(--t-1)' }}
                          >
                            {part.label}
                          </div>
                          <div
                            className="text-xs leading-relaxed"
                            style={{ color: 'var(--t-4)' }}
                          >
                            {part.body}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step nav hint */}
                <div className="flex items-center gap-2 mt-auto pt-2">
                  {heads.map((h, i) => (
                    <button
                      key={h.num}
                      onClick={() => switchHead(i)}
                      className="transition-all duration-200 rounded-full"
                      style={{
                        width: active === i ? '24px' : '6px',
                        height: '6px',
                        background: active === i ? h.color : 'var(--bd-1)',
                      }}
                      aria-label={h.name}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom: all 8 heads mini-grid (quick reference) ── */}
        <div
          className="mt-8 grid grid-cols-4 md:grid-cols-8 gap-2 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transitionDelay: '200ms' }}
        >
          {heads.map((h, i) => (
            <button
              key={h.num}
              onClick={() => switchHead(i)}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200"
              style={{
                background: active === i ? `${h.color}10` : 'var(--su-2)',
                border: `1px solid ${active === i ? `${h.color}40` : 'var(--bd-3)'}`,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg relative overflow-hidden shrink-0"
                style={{ background: 'linear-gradient(160deg, #f0f0ec 0%, #e4e4e0 100%)' }}
              >
                <Image src={h.img} alt={h.name} fill className="object-contain p-1" />
              </div>
              <div
                className="text-[10px] font-bold leading-tight text-center"
                style={{ color: active === i ? h.color : 'var(--t-7)' }}
              >
                {h.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
