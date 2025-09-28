'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';

// Assuming flag images are in public/flags folder
// You would need to add these images to public/flags
import arFlag from '@/assets/img/ar.png';
import dzFlag from '@/assets/img/dz.png';
import enFlag from '@/assets/img/en.png';
import frFlag from '@/assets/img/fr.png';

const flags: { [key: string]: StaticImageData } = {
  ar: arFlag,
  dz: dzFlag,
  en: enFlag,
  fr: frFlag,
};

const languageNames: { [key: string]: string } = {
  ar: 'العربية',
  dz: 'الجزائرية', // Assuming a specific name for Algerian Arabic
  en: 'English',
  fr: 'Français',
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const isRtl = currentLocale === 'ar' || currentLocale === 'dz';
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableLocales = ['ar', 'dz', 'en', 'fr']; // This should ideally come from a config

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center cursor-pointer focus:outline-none"
      >
        {flags[currentLocale] ? (
          <Image src={flags[currentLocale]} alt={`${currentLocale} flag`} width={24} height={24} className="rounded-full" />
        ) : (
          <span className="text-gray-700 dark:text-gray-300 uppercase text-sm">{currentLocale}</span>
        )}
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute top-12 w-max max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-40",
            isRtl ? "left-0" : "right-0" // Align to left for RTL, right for LTR
          )}
        >
          {availableLocales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={clsx(
                'flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
                {
                  'bg-gray-100 dark:bg-gray-700 font-medium': locale === currentLocale,
                }
              )}
            >
              {flags[locale] ? (
                <Image
                  src={flags[locale]}
                  alt={`${locale} flag`}
                  width={20}
                  height={20}
                  className={clsx("rounded-full", {
                    "ml-2": isRtl,
                    "mr-2": !isRtl,
                  })}
                />
              ) : (
                <span
                  className={clsx("uppercase", {
                    "ml-2": isRtl,
                    "mr-2": !isRtl,
                  })}
                >
                  {locale}
                </span>
              )}
              {languageNames[locale] || locale}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
