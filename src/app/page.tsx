'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SideModels from '@/components/layout/SideModels';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import DeviceSection from '@/components/landing/DeviceSection';
import QRProcessSection from '@/components/landing/QRProcessSection';
import GuideSection from '@/components/landing/GuideSection';
import VideoSection from '@/components/landing/VideoSection';
import ReviewSection from '@/components/landing/ReviewSection';
import StoreLocatorSection from '@/components/landing/StoreLocatorSection';
import PromotionSection from '@/components/landing/PromotionSection';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';
import UsageManualSection from '@/components/landing/UsageManualSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <SideModels />
      <main className="flex-1">
        {/* Hero — YouTube BG + marketing headline */}
        <HeroSection />

        {/* Device intro */}
        <div id="device">
          <FeaturesSection />
          <DeviceSection />
        </div>

        {/* Device usage manual — care protocols */}
        <UsageManualSection />

        {/* QR Session flow (store → customer) */}
        <QRProcessSection />

        {/* Care protocols from guide */}
        <div id="guide">
          <GuideSection />
        </div>

        {/* Official YouTube videos */}
        <VideoSection />

        {/* User reviews */}
        <ReviewSection />

        {/* Store locator */}
        <StoreLocatorSection />

        {/* Stats / Promotion */}
        <PromotionSection />

        {/* Company profile */}
        <FAQSection />

        {/* CTA */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
