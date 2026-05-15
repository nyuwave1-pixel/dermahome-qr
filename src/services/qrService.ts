import { db } from '@/firebase/config';
import {
  doc, getDoc, setDoc, updateDoc, collection, addDoc,
  query, where, getDocs, orderBy,
} from 'firebase/firestore';
import type { QRCode, VerifyResult, Promotion } from '@/types';

function generateCouponCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'DH-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function verifyQRCode(code: string, userId: string): Promise<VerifyResult> {
  try {
    const qrRef = doc(db, 'qr_codes', code);
    const qrSnap = await getDoc(qrRef);

    if (!qrSnap.exists()) {
      return { success: false, message: '유효하지 않은 QR 코드입니다.', errorType: 'invalid' };
    }

    const qr = { qrId: qrSnap.id, ...qrSnap.data() } as QRCode;

    if (qr.status === 'used') {
      return { success: false, message: '이미 사용된 QR 코드입니다.', qr, errorType: 'used' };
    }
    if (qr.status === 'expired') {
      return { success: false, message: '만료된 QR 코드입니다.', qr, errorType: 'expired' };
    }
    if (qr.status === 'blocked') {
      return { success: false, message: '차단된 QR 코드입니다.', qr, errorType: 'blocked' };
    }
    if (new Date(qr.expiredAt) < new Date()) {
      await updateDoc(qrRef, { status: 'expired' });
      return { success: false, message: '만료된 QR 코드입니다.', qr, errorType: 'expired' };
    }

    const now = new Date().toISOString();
    await updateDoc(qrRef, { status: 'used', usedBy: userId, usedAt: now });

    const couponData: Omit<Promotion, 'couponId'> = {
      userId,
      couponCode: generateCouponCode(),
      discountPercent: 15,
      description: '더마 시리즈 정품 인증 프로모션 쿠폰',
      expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      usedAt: null,
      createdAt: now,
    };
    const couponRef = await addDoc(collection(db, 'promotions'), couponData);
    const coupon: Promotion = { couponId: couponRef.id, ...couponData };

    await updateDoc(qrRef, { couponId: couponRef.id });

    return {
      success: true,
      message: '정품 인증이 완료되었습니다.',
      qr: { ...qr, status: 'used', usedBy: userId, usedAt: now, couponId: couponRef.id },
      coupon,
    };
  } catch (error) {
    console.error('QR verification error:', error);
    return { success: false, message: '서버 오류가 발생했습니다.', errorType: 'server' };
  }
}

export async function getQRCodeInfo(code: string): Promise<QRCode | null> {
  try {
    const qrRef = doc(db, 'qr_codes', code);
    const qrSnap = await getDoc(qrRef);
    if (!qrSnap.exists()) return null;
    return { qrId: qrSnap.id, ...qrSnap.data() } as QRCode;
  } catch {
    return null;
  }
}

export async function getUserQRHistory(userId: string): Promise<QRCode[]> {
  try {
    const q = query(collection(db, 'qr_codes'), where('usedBy', '==', userId), orderBy('usedAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ qrId: d.id, ...d.data() } as QRCode));
  } catch {
    return [];
  }
}

/* ─── Store Session (매장 운영자 → 고객 1회 사용 QR) ─────────────────
   Flow:
   1. Generate a unique session token
   2. Call /api/qr/generate (qrcode npm lib, server-side)
      Falls back to api.qrserver.com if the route fails
   3. Save session to Firestore
   4. Return image data URL + metadata to the caller
──────────────────────────────────────────────────────────────────── */

/** 5-second AbortController wrapper around fetch */
async function fetchWithTimeout(url: string, init: RequestInit, ms = 5000): Promise<Response> {
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    clearTimeout(tid);
    return res;
  } catch (e) {
    clearTimeout(tid);
    throw e;
  }
}

export async function createStoreSession(storeId = 'default'): Promise<{
  token: string;
  qrImageUrl: string;
  verifyUrl: string;
  expiredAt: string;
  adjustShortUrl: string;
}> {
  /* ── 1. Build token + verify URL ── */
  const rand = Math.random().toString(36).substring(2, 11).toUpperCase();
  const token = `UC${Date.now()}${rand}`;
  const expiredAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(); // 8 h

  const baseUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://dermahome.unincore.com';

  const verifyUrl = `${baseUrl}/verify?code=${token}`;

  /* ── 2. Generate QR via server-side route (5 s timeout) ── */
  let qrImageUrl: string;
  const adjustShortUrl = verifyUrl;

  try {
    const res = await fetchWithTimeout(
      '/api/qr/generate',
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ verifyUrl, token }),
      },
      5000,
    );

    if (res.ok) {
      const data = (await res.json()) as { qrImageUrl: string };
      qrImageUrl = data.qrImageUrl;
    } else {
      throw new Error(`QR API ${res.status}`);
    }
  } catch (err) {
    console.warn('QR API unavailable, using direct fallback:', err);
    /* Instant URL fallback — no network call, <img src> fetches lazily */
    qrImageUrl =
      `https://api.qrserver.com/v1/create-qr-code/` +
      `?size=360x360` +
      `&data=${encodeURIComponent(verifyUrl)}` +
      `&format=png&margin=12&color=07070a&bgcolor=f8f8f6`;
  }

  /* ── 3. Persist to Firestore (non-blocking, 5 s timeout) ── */
  try {
    const firestorePromise = setDoc(doc(db, 'qr_codes', token), {
      status:   'unused',
      type:     'store_session',
      storeId,
      deviceId: 'dermahome-10',
      createdAt: new Date().toISOString(),
      expiredAt,
      usedBy:   null,
      usedAt:   null,
      couponId: null,
    });

    // Race against a 5 s timeout so Firestore never hangs the UI
    await Promise.race([
      firestorePromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Firestore timeout')), 5000),
      ),
    ]);
  } catch (fsErr) {
    console.warn('Firestore save failed (QR still usable):', fsErr);
  }

  return { token, qrImageUrl, verifyUrl, expiredAt, adjustShortUrl };
}

export async function getUserCoupons(userId: string): Promise<Promotion[]> {
  try {
    const q = query(collection(db, 'promotions'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ couponId: d.id, ...d.data() } as Promotion));
  } catch {
    return [];
  }
}
