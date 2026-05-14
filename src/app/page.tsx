'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import DeviceSection from '@/components/landing/DeviceSection';
import QRProcessSection from '@/components/landing/QRProcessSection';
import ReviewSection from '@/components/landing/ReviewSection';
import PromotionSection from '@/components/landing/PromotionSection';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div id="device">
          <FeaturesSection />
          <DeviceSection />
        </div>
        <QRProcessSection />
        <ReviewSection />
        <PromotionSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
