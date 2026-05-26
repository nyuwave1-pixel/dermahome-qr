'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

/* ─── Types ──────────────────────────────────────────────────── */
type Step = { head: string; product: string; time: string; purpose: string };
type Routine = {
  id: string;
  title: string;
  subtitle: string;
  concern: string;
  steps: Step[];
  directions: { zone: string; guide: string }[];
  tip?: string;
};
type Category = { id: string; label: string; color: string; routines: Routine[] };

/* ─── Data ───────────────────────────────────────────────────── */
const STEP_COLORS: Record<string, string> = {
  'RF 고주파': '#e879f9',
  '울트라소닉': '#38bdf8',
  '이온토포레시스': '#818cf8',
};

const categories: Category[] = [
  {
    id: 'face',
    label: '페이스케어',
    color: '#e879f9',
    routines: [
      {
        id: 'brightening',
        title: '브라이트닝 케어',
        subtitle: '나이트 30분',
        concern: '피부 톤 개선 · 미백 · 윤기',
        steps: [
          { head: '이온토포레시스', product: '화이트닝 수분 앰플', time: '10분', purpose: '미백 활성 성분 진피층 침투' },
          { head: '울트라소닉', product: '수딩 앤 모이스트 케어 부스팅 젤', time: '10분', purpose: 'SMAS층 자극 + 성분 흡수 극대화' },
          { head: 'RF 고주파', product: '나이트 크림', time: '10분', purpose: '콜라겐 자극 + 전체 피부 톤 개선' },
        ],
        directions: [
          { zone: '턱', guide: '중앙 → 귀 밑 (수환 개선)' },
          { zone: '볼', guide: '입가 → 귀 밑 (볼 리프팅)' },
          { zone: '코밑', guide: '코 앞 → 관자놀이 (피부 개선)' },
          { zone: '이마', guide: '미간 → 관자놀이 → 헤어라인' },
          { zone: '목', guide: '귀 뒤 → 쇄골 (노폐물 배출)' },
        ],
        tip: '*미스트는 마무리에 필수',
      },
      {
        id: 'wrinkle',
        title: '링클 케어',
        subtitle: '나이트 30분',
        concern: '잔주름 완화 · V라인 · 리프팅',
        steps: [
          { head: '이온토포레시스', product: '링클 세럼 (레티놀/펩타이드)', time: '10분', purpose: '진주름 개선 성분 깊숙이 침투' },
          { head: 'RF 고주파', product: '나이트 크림', time: '15분', purpose: '콜라겐 수축·재생 → 즉각 리프팅' },
          { head: '울트라소닉', product: '수딩 앤 모이스트 케어 부스팅 젤', time: '10분', purpose: 'SMAS 강화 + 라인 정돈' },
        ],
        directions: [
          { zone: '턱선', guide: '턱 아래 → 콧볼까지 롤러이기 (V라인)' },
          { zone: '볼', guide: '입가 → 관자놀이 (볼 리프팅)' },
          { zone: '눈가', guide: '눈꼬리 → 관자놀이 (탄력선 정리)' },
          { zone: '이마', guide: '미간 → 관자놀이 → 헤어라인' },
          { zone: '목', guide: '쇄골 방향 (탄력 강화, 림프와 반대 방향 주의)' },
        ],
        tip: '*미스트는 마무리에 필수',
      },
      {
        id: 'soothing',
        title: '진정 케어',
        subtitle: '나이트 30분',
        concern: '트러블 · 민감 · 홍조 진정',
        steps: [
          { head: '울트라소닉', product: '진정 앰플 (센텔라/알로에)', time: '10분', purpose: '온열로 진정 성분 흡수 + 쿨 마무리 진정' },
          { head: '이온토포레시스', product: '진정 앰플 (알러지 완화)', time: '10분', purpose: '+극 5분 → -극 이온토포레시스 진행' },
          { head: 'RF 고주파', product: '진정 크림', time: '7분', purpose: '피부 결 방향 전반적 마무리 케어' },
        ],
        directions: [
          { zone: '턱/볼', guide: '중앙 → 귀 밑 (가볍게 쓸기)' },
          { zone: '볼', guide: '코 앞 → 귀 밑 (진정 분산)' },
          { zone: '이마', guide: '미간 → 관자놀이 → 헤어라인 (진정)' },
          { zone: '목', guide: '귀 뒤 → 쇄골 (노폐물 배출)' },
        ],
        tip: '*전반적으로 진동 분산, 압력 최소화',
      },
      {
        id: 'depuff',
        title: '붓기 완화 케어',
        subtitle: '외출 전 5분',
        concern: '아침 부종 · 다크서클 · 림프 순환',
        steps: [
          { head: '울트라소닉', product: '쿨링 앰플', time: '3분', purpose: '바깥쪽 드레나쥐 방향으로 붓기 완화' },
          { head: '이온토포레시스', product: '일렉트로 밀 앰플', time: '2분', purpose: '+극 이온토로 림프 순환 촉진' },
        ],
        directions: [
          { zone: '눈 밑', guide: '안쪽 → 관자놀이 (다크서클 & 붓기 완화)' },
          { zone: '볼', guide: '중앙 → 귀뺨 (혈액/림프 순환)' },
          { zone: '턱', guide: '중앙 → 귀 밑 (림관 부종 개선)' },
          { zone: '목', guide: '귀 뒤 → 쇄골 아래 (배출 경로)' },
        ],
      },
      {
        id: 'makeup',
        title: '화장 잘 먹는 케어',
        subtitle: '외출 전 5분',
        concern: '밀착력 · 모공 정돈 · 흡수 촉진',
        steps: [
          { head: '이온토포레시스', product: '화이트닝 앰플 또는 수분 앰플', time: '3분', purpose: '화장 전 기초 성분 완전 흡수' },
          { head: '울트라소닉', product: '수딩 앤 모이스트 케어 부스팅 젤', time: '2분', purpose: '모공 결 정리 + 흡수된 성분 고정' },
        ],
        directions: [
          { zone: '볼', guide: '중앙 → 바깥쪽, 평탄 터치로 모공 결 정리' },
          { zone: '이마', guide: '미간 → 헤어라인으로 균일한 결' },
          { zone: '턱', guide: '중앙 → 귀 밑 (수분/영양 흡수 촉진)' },
          { zone: '눈가', guide: '가볍게 안쪽 → 바깥쪽, 잔고 완화' },
        ],
      },
    ],
  },
  {
    id: 'hair',
    label: '헤어루틴',
    color: '#38bdf8',
    routines: [
      {
        id: 'headache',
        title: '두통 완화 케어',
        subtitle: '두피 & 헤어루틴',
        concern: '긴장성 두통 · 측두근 · 후두근막 이완',
        steps: [
          { head: 'RF 고주파', product: '두피 케어 에센스', time: '10분', purpose: '후두부형에서 목덜이 중앙 → 두드리기 양쪽 원형' },
          { head: '울트라소닉', product: '수딩 앤 모이스트 케어 부스팅 젤', time: '10분', purpose: '관자놀이 원형 → 귀 위 앞쪽 → Z형으로 두피 전진' },
          { head: '이온토포레시스', product: '진정 두피 앰플', time: '10분', purpose: '정수리 → 앞머리 라인 방향 이동' },
        ],
        directions: [
          { zone: '관자놀이', guide: '측두근·교근의 스트레스 긴장 완화, 편두통 핵심' },
          { zone: '귀 위', guide: '두개근막 라인 해제 → 두피 하방 견인 완화' },
          { zone: '정수리 라인', guide: '목 → 후두 → 정수리까지 이어지는 근막 긴장 정상화' },
          { zone: '목덜미 중앙', guide: '후두신경 압박 완화, 가장 흔한 두통 원인 지점' },
          { zone: '후두융기', guide: '신경·혈류 밀집 → 즉각적인 통증 완화' },
        ],
      },
      {
        id: 'hairloss',
        title: '탈모 관리 케어',
        subtitle: '두피 & 헤어루틴',
        concern: '탈모 진행 · 두피 모세혈관 혈류 개선',
        steps: [
          { head: 'RF 고주파', product: '하이퍼루프 바디 크림 / 딥 리페어 액티베이팅 뉴트리션 크림', time: '10분', purpose: '두피 온도 상승, 성분 활성화 및 혈행 개선 유도' },
          { head: '울트라소닉', product: '수딩 앤 모이스트 케어 부스팅 젤', time: '10분', purpose: '모낭 자극, 두피 주위 조직 완화' },
          { head: '이온토포레시스', product: '수딩 앤 모이스트 케어 부스팅 젤', time: '10분', purpose: '진정 근육 피로 회복, 두피 영양 직접 공급' },
        ],
        directions: [
          { zone: '고주파', guide: '귀 뒤에서 목→어깨 방향 이동' },
          { zone: '울트라소닉', guide: '헤어라인에서 정수리 방향 → Z형으로 두피 전진' },
          { zone: '이온토포레시스', guide: '정수리 → 앞머리 라인 → 측면 아래에서 위 방향' },
        ],
      },
      {
        id: 'facelift',
        title: '얼굴 리프팅 케어',
        subtitle: '두피 & 헤어루틴',
        concern: '얼굴 SMAS · 표정근 · 두개 근막 연결',
        steps: [
          { head: 'RF 고주파', product: '두피 케어 에센스', time: '10분', purpose: '후두부에서 목덜미 중앙 → 두드리기 원형' },
          { head: '울트라소닉', product: '수딩 앤 모이스트 케어 부스팅 젤', time: '10분', purpose: '후두에서 정수리를 지나 전두부로 한 방향 직선 풀기' },
          { head: '이온토포레시스', product: '리프팅 앰플', time: '10분', purpose: '헤어라인에서 정수리 → 직선으로 → 측면 아래에서 위 방향' },
        ],
        directions: [
          { zone: '후두부', guide: '목덜미 중앙에서 두피 전체로 방사형 이동' },
          { zone: '정수리 라인', guide: '후두 → 정수리 → 전두부 일방향 직선' },
          { zone: '측두부', guide: '귀 위에서 헤어라인까지 수평 방향' },
        ],
      },
    ],
  },
  {
    id: 'body',
    label: '바디루틴',
    color: '#34d399',
    routines: [
      {
        id: 'circulation',
        title: '순환 부종 케어',
        subtitle: '바디루틴',
        concern: '림프순환 저하 · 하지 부종 · 울혈',
        steps: [
          { head: 'RF 고주파', product: '하이퍼루프 바디 크림', time: '10분', purpose: '혈행 개선, 피하 온도 상승' },
          { head: '울트라소닉', product: '수딩 앤 모이스트 케어 부스팅 젤', time: '10분', purpose: '조직 깊숙이 진동 → 혈류·림프 활성화' },
          { head: '이온토포레시스', product: '수딩 앤 모이스트 케어 부스팅 젤', time: '10분', purpose: '림프 흐름 전체적으로 부드럽게 마무리' },
        ],
        directions: [
          { zone: '오래 서있는 분', guide: '허체 중앙 → 하체 방향 집중으로 덮기 (하체 방향)' },
          { zone: '오래 앉아있는 분', guide: '허벅지 · 사내부 림프절 먼저 열어야 함' },
          { zone: '고염식 후 부종', guide: '림프 흐름을 전체적으로 부드럽게' },
        ],
        tip: '*부드럽게 쓸어주듯 림프관 압박 최소화',
      },
      {
        id: 'slimbody',
        title: '슬림바디 라인 케어',
        subtitle: '바디루틴',
        concern: '지방 섬유화 완화 · 라인 정돈 · 셀룰라이트',
        steps: [
          { head: 'RF 고주파', product: '하이퍼루프 바디 크림', time: '10분', purpose: '지방층 가열 → 섬유화 완화' },
          { head: '울트라소닉', product: '수딩 앤 모이스트 케어 부스팅 젤', time: '10분', purpose: '깊은 진동으로 뭉친 조직 완화' },
          { head: '이온토포레시스', product: '수딩 앤 모이스트 케어 부스팅 젤', time: '10분', purpose: '진정 + 결과 고정' },
        ],
        directions: [
          { zone: '복부', guide: '옆구리(배꼽방향) → 중앙부(시계방향) → 겨드랑이 방향' },
          { zone: '팔', guide: '손 → 팔꿈치 → 겨드랑이 (위에서 아래방향)' },
          { zone: '볼', guide: '발목공치서 → 겨드랑이 → 상부고 방향' },
          { zone: '허벅지', guide: '바깥쪽 → 중앙 → 상부고 (위에서부터)' },
        ],
      },
      {
        id: 'fascia',
        title: '근막·근육 이완 케어',
        subtitle: '바디루틴',
        concern: '근막 유착 · 만성 긴장 완화',
        steps: [
          { head: 'RF 고주파', product: '하이퍼루프 바디 크림 / 딥 리페어 액티베이팅 뉴트리션 크림', time: '10분', purpose: '근막 온도 상승' },
          { head: '울트라소닉', product: '수딩 앤 모이스트 케어 부스팅 젤', time: '10분', purpose: '깊은 진동으로 뭉친 조직 완화' },
          { head: '이온토포레시스', product: '수딩 앤 모이스트 케어 부스팅 젤', time: '10분', purpose: '진정 근육 피로 회복' },
        ],
        directions: [
          { zone: '목 어깨', guide: '귀 뒤(위에서 아래) → 어깨(목에서 바깥쪽) → 견갑골(위에서 아래)' },
          { zone: '등', guide: '척추 옆 → 옆구리 → 겨드랑이' },
        ],
      },
    ],
  },
];

/* ─── Step badge ─────────────────────────────────────────────── */
function StepBadge({ n, label }: { n: number; label: string }) {
  const c = STEP_COLORS[label] ?? '#9dd470';
  return (
    <div className="flex items-center gap-2 shrink-0">
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black shrink-0"
        style={{ background: `${c}18`, color: c, border: `1px solid ${c}28` }}
      >
        {n}
      </div>
      <span
        className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded"
        style={{ background: `${c}12`, color: c }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Routine card ───────────────────────────────────────────── */
function RoutineCard({ routine, catColor, isOpen, onToggle }: {
  routine: Routine; catColor: string; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--su-2)',
        border: `1px solid ${isOpen ? `${catColor}30` : 'var(--bd-3)'}`,
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded"
              style={{ background: `${catColor}12`, color: catColor }}
            >
              {routine.subtitle}
            </span>
            <span
              className="text-[10px]"
              style={{ color: 'var(--t-6)' }}
            >
              {routine.concern}
            </span>
          </div>
          <h4 className="text-base font-black" style={{ color: 'var(--t-1)' }}>
            {routine.title}
          </h4>
        </div>
        <div
          className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{
            background: isOpen ? `${catColor}18` : 'var(--su-1)',
            color: isOpen ? catColor : 'var(--t-6)',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          <ChevronRight className="w-4 h-4" />
        </div>
      </button>

      {/* Expandable content */}
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: isOpen ? '1200px' : '0px' }}
      >
        <div className="px-5 pb-5 flex flex-col gap-5">

          {/* Steps */}
          <div>
            <div
              className="text-[10px] font-bold tracking-widest uppercase mb-3"
              style={{ color: 'var(--t-7)' }}
            >
              케어 프로토콜
            </div>
            <div className="flex flex-col gap-2">
              {routine.steps.map((step, i) => {
                const c = STEP_COLORS[step.head] ?? catColor;
                return (
                  <div
                    key={i}
                    className="rounded-xl p-4"
                    style={{ background: `${c}07`, border: `1px solid ${c}18` }}
                  >
                    <div className="flex items-start gap-3 mb-2 flex-wrap">
                      <StepBadge n={i + 1} label={step.head} />
                      <div className="flex items-center gap-2 ml-auto shrink-0">
                        <span
                          className="text-[10px] px-2 py-0.5 rounded font-medium"
                          style={{ background: 'var(--bd-3)', color: 'var(--t-4)' }}
                        >
                          {step.time}
                        </span>
                      </div>
                    </div>
                    <div
                      className="text-xs font-semibold mb-1"
                      style={{ color: 'var(--t-2)' }}
                    >
                      {step.product}
                    </div>
                    <div
                      className="text-xs leading-relaxed"
                      style={{ color: 'var(--t-4)' }}
                    >
                      {step.purpose}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Directions */}
          <div>
            <div
              className="text-[10px] font-bold tracking-widest uppercase mb-3"
              style={{ color: 'var(--t-7)' }}
            >
              부위별 방향 가이드
            </div>
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--bd-3)' }}
            >
              {routine.directions.map(({ zone, guide }, i) => (
                <div
                  key={i}
                  className="flex gap-3 px-4 py-2.5 text-xs"
                  style={{
                    borderBottom: i < routine.directions.length - 1 ? '1px solid var(--bd-3)' : 'none',
                    background: i % 2 === 0 ? 'var(--su-3)' : 'transparent',
                  }}
                >
                  <span
                    className="shrink-0 font-bold w-20"
                    style={{ color: catColor }}
                  >
                    {zone}
                  </span>
                  <span style={{ color: 'var(--t-3)' }}>{guide}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tip */}
          {routine.tip && (
            <div
              className="px-4 py-2.5 rounded-xl text-xs"
              style={{
                background: `${catColor}08`,
                border: `1px solid ${catColor}20`,
                color: catColor,
              }}
            >
              {routine.tip}
            </div>
          )}


        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export default function UsageManualSection() {
  const { ref: sectionRef, inView } = useInView(0.04);
  const [activeCat, setActiveCat] = useState('face');
  const [openRoutine, setOpenRoutine] = useState<string | null>('brightening');

  const cat = categories.find(c => c.id === activeCat)!;

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} id="usage" className="py-28 relative overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(92,138,60,0.025) 50%, transparent)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* ── Header ─────────────────────────────────────── */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#7bae52' }}
          >
            Usage Manual
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span style={{ color: 'var(--t-1)' }}>더마10 </span>
            <span className="text-gradient-green">사용 가이드</span>
          </h2>
          <p
            className="max-w-lg mx-auto text-sm leading-relaxed"
            style={{ color: 'var(--t-4)' }}
          >
            공식 트레이닝 매뉴얼 기반 케어 프로토콜.
            RF 고주파 · 울트라소닉 · 이온토포레시스 3단계 조합으로 최대 효과를 경험하세요.
          </p>
        </div>

        {/* ── Category tabs ───────────────────────────────── */}
        <div
          className="flex gap-2 mb-8 flex-wrap justify-center transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transitionDelay: '100ms' }}
        >
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => { setActiveCat(c.id); setOpenRoutine(c.routines[0].id); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: activeCat === c.id ? `${c.color}18` : 'var(--su-1)',
                border: `1px solid ${activeCat === c.id ? `${c.color}50` : 'var(--bd-2)'}`,
                color: activeCat === c.id ? c.color : 'var(--t-5)',
              }}
            >
              {c.label}
              <span
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                style={{
                  background: activeCat === c.id ? `${c.color}20` : 'var(--bd-3)',
                  color: activeCat === c.id ? c.color : 'var(--t-7)',
                }}
              >
                {c.routines.length}
              </span>
            </button>
          ))}
        </div>

        {/* ── Routine list ────────────────────────────────── */}
        <div
          className="flex flex-col gap-3 transition-all duration-500"
          style={{ opacity: inView ? 1 : 0, transitionDelay: '150ms' }}
        >
          {cat.routines.map(routine => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              catColor={cat.color}
              isOpen={openRoutine === routine.id}
              onToggle={() => setOpenRoutine(openRoutine === routine.id ? null : routine.id)}
            />
          ))}
        </div>

        {/* ── Protocol legend ─────────────────────────────── */}
        <div
          className="mt-10 p-5 rounded-2xl flex flex-wrap gap-4 items-center justify-center transition-all duration-700"
          style={{
            background: 'var(--su-3)',
            border: '1px solid var(--bd-3)',
            opacity: inView ? 1 : 0,
            transitionDelay: '200ms',
          }}
        >
          <span
            className="text-[10px] font-bold tracking-widest uppercase"
            style={{ color: 'var(--t-7)' }}
          >
            헤드 색상 범례
          </span>
          {Object.entries(STEP_COLORS).map(([label, color]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
              <span className="text-xs font-medium" style={{ color: 'var(--t-4)' }}>{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 ml-auto">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#9dd470' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--t-4)' }}>기타 헤드</span>
          </div>
        </div>
      </div>
    </section>
  );
}
