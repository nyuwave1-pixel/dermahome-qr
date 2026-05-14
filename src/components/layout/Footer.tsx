'use client';

import Link from 'next/link';
import Image from 'next/image';
import { QrCode, MapPin, Globe, Store, Play } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="relative mt-auto"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(92,138,60,0.5), transparent)' }}
      />

      <div style={{ background: 'rgba(7,7,10,0.98)' }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/images/logo_vertical.png"
                  alt="UNI&CORE"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
                <Image
                  src="/images/logo_horizontal_mono.png"
                  alt="UNI&CORE"
                  width={120}
                  height={22}
                  className="h-5 w-auto object-contain"
                  style={{ filter: 'invert(1) brightness(0.65)' }}
                />
              </div>
              <p className="text-sm leading-relaxed mb-4 italic" style={{ color: 'rgba(248,248,246,0.30)' }}>
                &ldquo;United power of uni&core to the global&rdquo;
              </p>
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'rgba(248,248,246,0.28)' }} />
                <span className="text-xs leading-relaxed" style={{ color: 'rgba(248,248,246,0.28)' }}>
                  서울시 서초구 양재대로2길 100-30, 2층
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: 'rgba(248,248,246,0.28)' }} />
                <a
                  href="https://www.unincore.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs transition-colors"
                  style={{ color: 'rgba(248,248,246,0.28)' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#7bae52')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(248,248,246,0.28)')}
                >
                  www.unincore.com
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'rgba(248,248,246,0.30)' }}
              >
                바로가기
              </h4>
              <ul className="space-y-2.5">
                {[
                  { href: '/generate', label: 'QR 세션 생성 (매장용)', icon: Store },
                  { href: '/verify', label: 'QR 스캔 (고객용)', icon: QrCode },
                  { href: 'https://www.youtube.com/@unincore.official/videos', label: '공식 YouTube', icon: Play, ext: true },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={'ext' in item && item.ext ? '_blank' : undefined}
                      rel={'ext' in item && item.ext ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 text-sm transition-colors"
                      style={{ color: 'rgba(248,248,246,0.48)' }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#9dd470')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(248,248,246,0.48)')}
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
                style={{ color: 'rgba(248,248,246,0.30)' }}
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
                    <dt className="shrink-0 w-20" style={{ color: 'rgba(248,248,246,0.26)' }}>{term}</dt>
                    <dd style={{ color: 'rgba(248,248,246,0.52)' }}>{desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-xs" style={{ color: 'rgba(248,248,246,0.22)' }}>
              © 2025 ㈜ 유니앤코어. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full animate-glow-fast"
                style={{ display: 'inline-block', background: '#5c8a3c' }}
              />
              <span className="text-xs" style={{ color: 'rgba(248,248,246,0.22)' }}>
                더마10 QR 시스템 운영 중
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
