'use client';

import type { QRStatus } from '@/types';

const statusConfig: Record<QRStatus, { label: string; bg: string; text: string; dot: string }> = {
  unused: { label: '미사용', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
  active: { label: '활성', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  expired: { label: '만료', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  used: { label: '사용완료', bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-500' },
  blocked: { label: '차단', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

export default function StatusBadge({ status }: { status: QRStatus }) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
