'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Globe, Store, Play } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="relative mt-auto"
      style={{ borderTop: '1px solid var(--bd-3)' }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(92,138,60,0.5), transparent)' }}
      />

      <div style={{ background: 'var(--t-bg-dp)' }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Brand */}
            <div className="md:col-span-1">
              <div className="inline-block mb-4 px-4 py-2 rounded-xl" style={{ background: '#f5f5f3' }}>
                <Image
                  src="/images/logo_with_slogan.png"
                  alt="UNI&CORE — United power of uni&core to the global"
                  width={180}
                  height={54}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="mb-4" />
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'var(--t-6)' }} />
                <span className="text-xs leading-relaxed" style={{ color: 'var(--t-6)' }}>
                  서울시 서초구 양재대로2길 100-30, 2층
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--t-6)' }} />
                <a
                  href="https://www.unincore.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs transition-colors"
                  style={{ color: 'var(--t-6)' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#7bae52')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--t-6)')}
                >
                  www.unincore.com
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--t-6)' }}
              >
                바로가기
              </h4>
              <ul className="space-y-2.5">
                {[
                  { href: '/generate', label: 'QR 세션 생성 (매장용)', icon: Store },
                  { href: 'https://www.youtube.com/@unincore.official/videos', label: '공식 YouTube', icon: Play, ext: true },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={'ext' in item && item.ext ? '_blank' : undefined}
                      rel={'ext' in item && item.ext ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 text-sm transition-colors"
                      style={{ color: 'var(--t-4)' }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#9dd470')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--t-4)')}
                    >
                      <item.icon className="w-3.5 h-3.5" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Info */}
            <div>
              <h4
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--t-6)' }}
              >
                회사 정보
              </h4>
              <dl className="space-y-2">
                {[
                  { term: '회사명', desc: '㈜ 유니앤코어' },
                  { term: '대표이사', desc: '김성현' },
                  { term: '설립', desc: '2022년 10월' },
                  { term: '등록번호', desc: '서울 제935호' },
                ].map(({ term, desc }) => (
                  <div key={term} className="flex gap-3 text-sm">
                    <dt className="shrink-0 w-20" style={{ color: 'var(--t-7)' }}>{term}</dt>
                    <dd style={{ color: 'var(--t-4)' }}>{desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid var(--bd-3)' }}
          >
            <p className="text-xs" style={{ color: 'var(--t-7)' }}>
              © 2025 ㈜ 유니앤코어. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full animate-glow-fast"
                style={{ display: 'inline-block', background: '#5c8a3c' }}
              />
              <span className="text-xs" style={{ color: 'var(--t-7)' }}>
                더마10 QR 시스템 운영 중
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
