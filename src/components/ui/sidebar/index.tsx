// src/components/ui/sidebar/index.tsx
'use client';

import { useLocale } from 'next-intl';
import { sidebarLinks } from './data';
import SidebarLink from './SidebarLink';
import SidebarDropdown from './SidebarDropdown';
import { useState } from 'react';
import clsx from 'clsx';

/**
 * Main Sidebar component that assembles the sidebar links and dropdowns.
 */
export default function Sidebar({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'dz';
  const [isDesktopOpen, setDesktopOpen] = useState(true);

  const toggleDesktop = () => {
    setDesktopOpen(!isDesktopOpen);
  };

  const leftIcon = isRtl ? 'fi-sr-angle-right' : 'fi-sr-angle-left';
  const rightIcon = isRtl ? 'fi-sr-angle-left' : 'fi-sr-angle-right';

  const desktopSidebarClasses = clsx(
    'bg-white dark:bg-body-dark text-Secondary dark:text-Secondary-dark p-5 transition-all duration-300 ease-in-out',
    'relative h-fit mt-[20px] mx-[20px] rounded-[40px] hidden md:block',
    {
      'w-[300px]': isDesktopOpen,
      'w-[80px]': !isDesktopOpen,
    }
  );

  const mobileSidebarClasses = clsx(
    'bg-white dark:bg-body-dark text-Secondary dark:text-Secondary-dark p-5 transition-transform duration-300 ease-in-out',
    'fixed inset-y-0 z-30 w-64 md:hidden',
    isRtl
      ? { 'right-0 translate-x-0': isOpen, 'right-0 translate-x-full': !isOpen }
      : { 'left-0 translate-x-0': isOpen, 'left-0 -translate-x-full': !isOpen }
  );

  const sidebarContent = (isMobile: boolean) => (
    <nav>
      <ul>
        {sidebarLinks.map((link) => {
          if (link.subLinks) {
            return (
              <SidebarDropdown
                key={link.label}
                label={link.label}
                icon={link.icon}
                subLinks={link.subLinks}
                isOpen={isMobile ? true : isDesktopOpen}
                toggle={toggle}
              />
            );
          }
          return (
            <SidebarLink
              key={link.href}
              href={link.href!}
              label={link.label}
              icon={link.icon}
              isOpen={isMobile ? true : isDesktopOpen}
              toggle={toggle}
            />
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`${desktopSidebarClasses} shadow-md dark:shadow-lg`}>
        <div className={clsx('flex items-center mb-5', isDesktopOpen ? 'justify-end' : 'justify-center')}>
          <button onClick={toggleDesktop} className="w-10 h-10 rounded-full bg-Primary text-Secondary dark:text-body-dark flex items-center justify-center">
            <i className={clsx('fi flex cursor-pointer', isDesktopOpen ? leftIcon : rightIcon)}></i>
          </button>
        </div>
        {sidebarContent(false)}
      </aside>

      {/* Mobile Sidebar */}
      <aside className={`${mobileSidebarClasses} shadow-md dark:shadow-lg `}>
        {sidebarContent(true)}
      </aside>

      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={toggle}></div>}
    </>
  );
}
