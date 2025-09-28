'use client';

import Features from '@/components/public/LandingPage/Features';
import Hero from '@/components/public/LandingPage/Hero';
import HowItWorks from '@/components/public/LandingPage/HowItWorks';
import Testimonials from '@/components/public/LandingPage/Testimonials';
import Pricing from '@/components/public/LandingPage/Pricing';
import FAQ from '@/components/public/LandingPage/FAQ';
import FinalCTA from '@/components/public/LandingPage/FinalCTA';

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
    </div>
  );
}
