'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '@/assets/img/g19-5.png';

const SplashScreen = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isFirstVisit = sessionStorage.getItem('isFirstVisit') === null;
    if (isFirstVisit) {
      sessionStorage.setItem('isFirstVisit', 'true');
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000); // Simulate a 3-second loading time
      
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-[#484E55] flex justify-center items-center z-[9999] flex-col">
        <Image className="w-[80px]" src={Logo} alt="Logo" />
      </div>
    );
  }

  return <>{children}</>;
};

export default SplashScreen;
