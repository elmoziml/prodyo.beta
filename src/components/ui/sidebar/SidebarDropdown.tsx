// src/components/ui/sidebar/SidebarDropdown.tsx
'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import clsx from 'clsx';
import { useState } from 'react';

interface SubLink {
  href: string;
  label: string;
}

interface SidebarDropdownProps {
  label: string;
  icon: string;
  subLinks: SubLink[];
  isOpen: boolean;
  toggle?: () => void;
}

/**
 * SidebarDropdown component for displaying a dropdown menu in the sidebar.
 * @param label - The dropdown's label.
 * @param icon - The dropdown's icon class.
 * @param subLinks - The dropdown's sub-links.
 * @param isOpen - Whether the sidebar is open or not.
 */
export default function SidebarDropdown({ label, icon, subLinks, isOpen, toggle }: SidebarDropdownProps) {
  const t = useTranslations('sidebar');
  const pathname = usePathname();
  const locale = useLocale();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    if (isOpen) {
      setDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <li className="mb-2">
      <div
        onClick={handleDropdownToggle}
        className={clsx(
          'flex items-center py-3 px-5 transition-colors rounded-full cursor-pointer',
          { 'justify-center w-10 h-10 px-0': !isOpen }
        )}
      >
        <i className={`${icon} flex text-xl`}></i>
        {isOpen && (
          <>
            <span className={`flex-grow text-base ${(locale === 'ar' || locale === 'dz') ? 'mr-3' : 'ml-3'}`}>
              {t(label)}
            </span>
            <i
              className={`fi fi-sr-angle-down transition-transform flex ${isDropdownOpen ? 'rotate-180' : ''}`}>
            </i>
          </>
        )}
      </div>
      {isOpen && isDropdownOpen && (
        <ul className="pl-8 mt-2">
          {subLinks.map((subLink) => {
            const isSubActive = pathname === subLink.href;
            return (
              <li key={subLink.href} className="mb-2" onClick={toggle}>
                <Link
                  href={subLink.href}
                  className={clsx(
                    'text-sm flex items-center py-2 px-5 transition-colors rounded-full',
                    {
                      'bg-Primary dark:text-body-dark': isSubActive,
                    }
                  )}
                >
                  {t(subLink.label)}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
