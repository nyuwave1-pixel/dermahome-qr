export type QRStatus = 'unused' | 'active' | 'expired' | 'used' | 'blocked';

export interface QRCode {
  qrId: string;
  status: QRStatus;
  deviceId: string;
  usedBy: string | null;
  usedAt: string | null;
  expiredAt: string;
  createdAt: string;
  couponId: string | null;
  // Store session fields
  type?: 'store_session' | 'product_auth';
  storeId?: string;
  adjustShortUrl?: string | null;
}

export interface User {
  uid: string;
  email: string;
  name: string;
  registeredDevices: string[];
  createdAt: string;
}

export interface Promotion {
  couponId: string;
  userId: string;
  couponCode: string;
  discountPercent: number;
  description: string;
  expiredAt: string;
  usedAt: string | null;
  createdAt: string;
}

export interface Device {
  serialNumber: string;
  modelName: string;
  firmwareVersion: string;
  activated: boolean;
  activatedAt: string | null;
  userId: string | null;
}

export interface VerifyResult {
  success: boolean;
  message: string;
  qr?: QRCode;
  coupon?: Promotion;
  errorType?: 'used' | 'expired' | 'invalid' | 'blocked' | 'network' | 'server';
}

export interface AdminStats {
  totalQRCodes: number;
  usedQRCodes: number;
  activeUsers: number;
  couponsIssued: number;
  dailyVerifications: { date: string; count: number }[];
  deviceRegistrations: { date: string; count: number }[];
  userGrowth: { date: string; count: number }[];
  countryStats: { country: string; count: number }[];
}
