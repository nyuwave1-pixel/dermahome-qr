import { create } from 'zustand';
import type { QRCode, VerifyResult, Promotion } from '@/types';

interface QRState {
  currentQR: QRCode | null;
  verifyResult: VerifyResult | null;
  coupon: Promotion | null;
  isScanning: boolean;
  isVerifying: boolean;
  setCurrentQR: (qr: QRCode | null) => void;
  setVerifyResult: (result: VerifyResult | null) => void;
  setCoupon: (coupon: Promotion | null) => void;
  setScanning: (scanning: boolean) => void;
  setVerifying: (verifying: boolean) => void;
  reset: () => void;
}

export const useQRStore = create<QRState>((set) => ({
  currentQR: null,
  verifyResult: null,
  coupon: null,
  isScanning: false,
  isVerifying: false,
  setCurrentQR: (currentQR) => set({ currentQR }),
  setVerifyResult: (verifyResult) => set({ verifyResult }),
  setCoupon: (coupon) => set({ coupon }),
  setScanning: (isScanning) => set({ isScanning }),
  setVerifying: (isVerifying) => set({ isVerifying }),
  reset: () => set({ currentQR: null, verifyResult: null, coupon: null, isScanning: false, isVerifying: false }),
}));
