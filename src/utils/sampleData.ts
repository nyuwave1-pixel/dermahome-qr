import type { QRCode, Promotion, Device, AdminStats } from '@/types';

export const sampleQRCodes: QRCode[] = [
  {
    qrId: 'UNINCORE-A1B2C',
    status: 'used',
    deviceId: 'DH-PRO-001',
    usedBy: 'user123',
    usedAt: '2026-05-10T14:30:00Z',
    expiredAt: '2026-08-10T00:00:00Z',
    createdAt: '2026-05-01T00:00:00Z',
    couponId: 'coupon001',
  },
  {
    qrId: 'UNINCORE-D3E4F',
    status: 'unused',
    deviceId: 'DH-PRO-002',
    usedBy: null,
    usedAt: null,
    expiredAt: '2026-08-15T00:00:00Z',
    createdAt: '2026-05-05T00:00:00Z',
    couponId: null,
  },
  {
    qrId: 'UNINCORE-G5H6I',
    status: 'expired',
    deviceId: 'DH-MINI-001',
    usedBy: null,
    usedAt: null,
    expiredAt: '2026-04-01T00:00:00Z',
    createdAt: '2026-01-01T00:00:00Z',
    couponId: null,
  },
  {
    qrId: 'UNINCORE-J7K8L',
    status: 'active',
    deviceId: 'DH-PRO-003',
    usedBy: null,
    usedAt: null,
    expiredAt: '2026-09-01T00:00:00Z',
    createdAt: '2026-05-12T00:00:00Z',
    couponId: null,
  },
];

export const sampleCoupons: Promotion[] = [
  {
    couponId: 'coupon001',
    userId: 'user123',
    couponCode: 'DH-XK9M2P4Q',
    discountPercent: 15,
    description: '더마 시리즈 정품 인증 프로모션 쿠폰',
    expiredAt: '2026-06-10T00:00:00Z',
    usedAt: null,
    createdAt: '2026-05-10T14:30:00Z',
  },
  {
    couponId: 'coupon002',
    userId: 'user123',
    couponCode: 'DH-R3TN7W5Z',
    discountPercent: 10,
    description: '더마 시리즈 앱 연결 보너스 쿠폰',
    expiredAt: '2026-07-01T00:00:00Z',
    usedAt: '2026-05-12T09:00:00Z',
    createdAt: '2026-05-08T10:00:00Z',
  },
];

export const sampleDevices: Device[] = [
  {
    serialNumber: 'DH-PRO-001',
    modelName: 'DermaHome Pro',
    firmwareVersion: '2.1.4',
    activated: true,
    activatedAt: '2026-05-10T14:30:00Z',
    userId: 'user123',
  },
  {
    serialNumber: 'DH-PRO-002',
    modelName: 'DermaHome Pro',
    firmwareVersion: '2.1.4',
    activated: false,
    activatedAt: null,
    userId: null,
  },
  {
    serialNumber: 'DH-MINI-001',
    modelName: 'DermaHome Mini',
    firmwareVersion: '1.3.2',
    activated: false,
    activatedAt: null,
    userId: null,
  },
];

export const sampleAdminStats: AdminStats = {
  totalQRCodes: 1247,
  usedQRCodes: 893,
  activeUsers: 756,
  couponsIssued: 893,
  dailyVerifications: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
    count: Math.floor(Math.random() * 40) + 10,
  })),
  deviceRegistrations: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
    count: Math.floor(Math.random() * 30) + 5,
  })),
  userGrowth: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
    count: Math.floor(20 + i * 1.5 + Math.random() * 10),
  })),
  countryStats: [
    { country: '한국', count: 529 },
    { country: '일본', count: 113 },
    { country: '미국', count: 76 },
    { country: '중국', count: 38 },
  ],
};
