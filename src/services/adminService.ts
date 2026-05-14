import { db } from '@/firebase/config';
import {
  collection, addDoc, getDocs, updateDoc, doc,
  query, orderBy, where, getCountFromServer,
} from 'firebase/firestore';
import type { QRCode, QRStatus, AdminStats } from '@/types';

export async function createQRCode(deviceId: string, expiryDays: number = 90): Promise<QRCode> {
  const qrId = `UNINCORE-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const now = new Date();
  const data = {
    status: 'unused' as QRStatus,
    deviceId,
    usedBy: null,
    usedAt: null,
    expiredAt: new Date(now.getTime() + expiryDays * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: now.toISOString(),
    couponId: null,
  };
  await addDoc(collection(db, 'qr_codes'), { ...data, qrId });
  return { qrId, ...data };
}

export async function createBulkQRCodes(deviceIds: string[], expiryDays: number = 90): Promise<QRCode[]> {
  const results: QRCode[] = [];
  for (const deviceId of deviceIds) {
    const qr = await createQRCode(deviceId, expiryDays);
    results.push(qr);
  }
  return results;
}

export async function updateQRStatus(docId: string, status: QRStatus): Promise<void> {
  await updateDoc(doc(db, 'qr_codes', docId), { status });
}

export async function getAllQRCodes(): Promise<QRCode[]> {
  const q = query(collection(db, 'qr_codes'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ qrId: d.data().qrId, ...d.data() } as QRCode));
}

export async function getAdminStats(): Promise<AdminStats> {
  const qrSnap = await getDocs(collection(db, 'qr_codes'));
  const allQR = qrSnap.docs.map((d) => d.data() as QRCode);
  const usedQR = allQR.filter((q) => q.status === 'used');

  const userSnap = await getDocs(collection(db, 'users'));
  const couponSnap = await getDocs(collection(db, 'promotions'));

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });

  const dailyVerifications = last30Days.map((date) => ({
    date,
    count: usedQR.filter((q) => q.usedAt?.startsWith(date)).length,
  }));

  const deviceRegistrations = last30Days.map((date) => ({
    date,
    count: allQR.filter((q) => q.createdAt.startsWith(date)).length,
  }));

  const userGrowth = last30Days.map((date) => ({
    date,
    count: userSnap.docs.filter((d) => (d.data().createdAt as string)?.startsWith(date)).length,
  }));

  return {
    totalQRCodes: allQR.length,
    usedQRCodes: usedQR.length,
    activeUsers: userSnap.size,
    couponsIssued: couponSnap.size,
    dailyVerifications,
    deviceRegistrations,
    userGrowth,
    countryStats: [
      { country: '한국', count: Math.floor(userSnap.size * 0.7) },
      { country: '일본', count: Math.floor(userSnap.size * 0.15) },
      { country: '미국', count: Math.floor(userSnap.size * 0.1) },
      { country: '기타', count: Math.floor(userSnap.size * 0.05) },
    ],
  };
}
