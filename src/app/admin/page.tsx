'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, QrCode, Users, Gift, TrendingUp,
  Plus, Download, RefreshCw, Search, ChevronDown,
  BarChart3, Globe, Calendar, ShieldCheck,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';
import { sampleAdminStats, sampleQRCodes } from '@/utils/sampleData';
import type { QRStatus } from '@/types';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import type { PieLabelRenderProps } from 'recharts';

type Tab = 'dashboard' | 'qr' | 'users' | 'coupons';

const CHART_COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#64748b'];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const stats = sampleAdminStats;

  const tabs: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { key: 'dashboard', label: '대시보드', icon: LayoutDashboard },
    { key: 'qr', label: 'QR 관리', icon: QrCode },
    { key: 'users', label: '사용자', icon: Users },
    { key: 'coupons', label: '쿠폰', icon: Gift },
  ];

  const statCards = [
    { label: '총 QR 코드', value: stats.totalQRCodes.toLocaleString(), icon: QrCode, color: 'from-sky-400 to-blue-500', change: '+12%' },
    { label: '사용된 QR', value: stats.usedQRCodes.toLocaleString(), icon: ShieldCheck, color: 'from-emerald-400 to-teal-500', change: '+8%' },
    { label: '활성 사용자', value: stats.activeUsers.toLocaleString(), icon: Users, color: 'from-violet-400 to-purple-500', change: '+15%' },
    { label: '발급 쿠폰', value: stats.couponsIssued.toLocaleString(), icon: Gift, color: 'from-amber-400 to-orange-500', change: '+8%' },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4 safe-top">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <LayoutDashboard className="w-7 h-7 text-sky-500" />
                관리자 대시보드
              </h1>
              <p className="text-slate-500 text-sm mt-1">QR 인증 시스템 관리 및 통계</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
                CSV 다운로드
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4" />
                QR 생성
              </Button>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 overflow-x-auto bg-slate-100 p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <GlassCard className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                          <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Daily verifications */}
                <GlassCard className="p-5">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-sky-500" />
                    일별 인증 현황
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.dailyVerifications.slice(-14)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(v) => v.slice(5)} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip
                          contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                          labelFormatter={(v) => `날짜: ${v}`}
                        />
                        <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="인증 수" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>

                {/* User growth */}
                <GlassCard className="p-5">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    사용자 증가 추이
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stats.userGrowth.slice(-14)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(v) => v.slice(5)} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip
                          contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                        />
                        <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="사용자 수" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>

                {/* Country stats */}
                <GlassCard className="p-5">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-violet-500" />
                    국가별 사용 현황
                  </h3>
                  <div className="h-64 flex items-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.countryStats}
                          dataKey="count"
                          nameKey="country"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percent }: PieLabelRenderProps) => `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`}
                        >
                          {stats.countryStats.map((_, idx) => (
                            <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>

                {/* Device registrations */}
                <GlassCard className="p-5">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-500" />
                    기기 등록 현황
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.deviceRegistrations.slice(-14)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(v) => v.slice(5)} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip
                          contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                        />
                        <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="등록 수" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>
              </div>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="space-y-4">
              {/* Search bar */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="QR 코드 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>

              {/* QR table */}
              <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">QR 코드</th>
                        <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">상태</th>
                        <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">기기 ID</th>
                        <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">사용자</th>
                        <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">생성일</th>
                        <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">만료일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleQRCodes.map((qr) => (
                        <tr key={qr.qrId} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-mono text-sm font-medium text-slate-700">{qr.qrId}</td>
                          <td className="p-4"><StatusBadge status={qr.status} /></td>
                          <td className="p-4 text-sm text-slate-600">{qr.deviceId}</td>
                          <td className="p-4 text-sm text-slate-600">{qr.usedBy || '—'}</td>
                          <td className="p-4 text-sm text-slate-500">{new Date(qr.createdAt).toLocaleDateString('ko-KR')}</td>
                          <td className="p-4 text-sm text-slate-500">{new Date(qr.expiredAt).toLocaleDateString('ko-KR')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>
          )}

          {activeTab === 'users' && (
            <GlassCard className="p-8 text-center">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-700 mb-2">사용자 관리</h3>
              <p className="text-sm text-slate-400 mb-4">Firebase 연동 후 사용자 목록이 표시됩니다.</p>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="p-3 rounded-xl bg-slate-50">
                  <div className="text-xl font-bold text-slate-700">{stats.activeUsers}</div>
                  <div className="text-xs text-slate-400">전체 사용자</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <div className="text-xl font-bold text-emerald-600">{Math.floor(stats.activeUsers * 0.85)}</div>
                  <div className="text-xs text-slate-400">활성</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <div className="text-xl font-bold text-sky-600">{Math.floor(stats.activeUsers * 0.3)}</div>
                  <div className="text-xs text-slate-400">신규 (30일)</div>
                </div>
              </div>
            </GlassCard>
          )}

          {activeTab === 'coupons' && (
            <GlassCard className="p-8 text-center">
              <Gift className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-700 mb-2">쿠폰 관리</h3>
              <p className="text-sm text-slate-400 mb-4">Firebase 연동 후 쿠폰 발급 현황이 표시됩니다.</p>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="p-3 rounded-xl bg-slate-50">
                  <div className="text-xl font-bold text-slate-700">{stats.couponsIssued}</div>
                  <div className="text-xs text-slate-400">총 발급</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <div className="text-xl font-bold text-violet-600">{Math.floor(stats.couponsIssued * 0.4)}</div>
                  <div className="text-xs text-slate-400">사용됨</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <div className="text-xl font-bold text-amber-600">{Math.floor(stats.couponsIssued * 0.1)}</div>
                  <div className="text-xs text-slate-400">만료</div>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </main>
    </>
  );
}
