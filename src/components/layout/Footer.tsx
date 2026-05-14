'use client';

import Link from 'next/link';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-800">DermaHome</span>
                <span className="text-[10px] block -mt-1 text-slate-400 tracking-wider">by UNI&CORE</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              프리미엄 더마 뷰티 디바이스와 스마트 피부 관리 솔루션을 제공합니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-4">서비스</h3>
            <ul className="space-y-2.5">
              {['QR 정품 인증', '피부 분석', '더마홈 기기', '프로모션'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-slate-500 hover:text-sky-600 cursor-pointer transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-4">고객 지원</h3>
            <ul className="space-y-2.5">
              {['자주 묻는 질문', '사용 가이드', '기기 연결 방법', '개인정보처리방침'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-slate-500 hover:text-sky-600 cursor-pointer transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-4">연락처</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-slate-500">
                <Phone className="w-4 h-4 text-sky-500" />
                1588-0000
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-500">
                <Mail className="w-4 h-4 text-sky-500" />
                support@unicore.co.kr
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-500">
                <MapPin className="w-4 h-4 text-sky-500 mt-0.5" />
                서울특별시 강남구 테헤란로 123
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; 2026 UNI&CORE Korea. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['이용약관', '개인정보처리방침', '사업자정보'].map((item) => (
              <span key={item} className="text-xs text-slate-400 hover:text-sky-500 cursor-pointer transition-colors">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
