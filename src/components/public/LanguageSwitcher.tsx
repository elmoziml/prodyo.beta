'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import enFlag from '@/assets/img/en.png';
import arFlag from '@/assets/img/ar.png';
import frFlag from '@/assets/img/fr.png';
import dzFlag from '@/assets/img/dz.png';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: enFlag },
    { code: 'ar', name: 'العربية', flag: arFlag },
    { code: 'fr', name: 'Français', flag: frFlag },
    { code: 'dz', name: 'الدارجة', flag: dzFlag },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  const switchLanguage = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className="relative inline-block text-left" ref={switcherRef}>
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-full rounded-md border border-gray-700 shadow-sm px-3 py-2 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500 transition-colors"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {currentLanguage && (
            <Image src={currentLanguage.flag} alt={currentLanguage.name} width={24} height={18} className="rounded-sm me-2" />
          )}
          <span className="truncate">{currentLanguage?.name || locale}</span>
          <svg
            className="-me-1 ms-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-bottom-right absolute end-0 bottom-full mb-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`${ locale === lang.code ? 'bg-orange-600 text-white' : 'text-gray-300' } group flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-700 hover:text-white transition-colors`}
                role="menuitem"
              >
                <Image src={lang.flag} alt={lang.name} width={24} height={18} className="rounded-sm me-3" />
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
