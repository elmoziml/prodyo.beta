'use client';

import Image from 'next/image';
import { FaUserCircle, FaBars, FaBell } from 'react-icons/fa';
import { useLocale } from 'next-intl';
import logo from '@/assets/img/g19-5.png';
import { useSelector } from 'react-redux';
import { selectUnreadNotificationsCount } from '@/store/features/notifications/notificationsSlice';
import { Link, usePathname } from '@/i18n/navigation';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import ProfileDropdown from './ProfileDropdown';
import ThemeSwitcher from './ThemeSwitcher';

import { RootState } from '@/store/store';

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const user = useSelector((state: RootState) => state.user);

  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'dz';
  const unreadCount = useSelector(selectUnreadNotificationsCount);
  const pathname = usePathname();

  const isNotificationsActive = pathname === '/notifications';

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      className="bg-white dark:bg-body-dark shadow-md flex justify-between items-center w-full px-4 md:px-6 h-16 z-30"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center cursor-pointer md:hidden"
        >
          <FaBars className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        </button>
        <div className={`relative hidden md:block ${!isRtl ? 'md:ml-4' : 'md:mr-4'}`}>
          <Image src={logo} alt="Kontrilo Logo" width={24} height={24} />
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center w-[190px] justify-between">
        <LanguageSwitcher />
        <Link href="/notifications" className="relative w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center cursor-pointer">
          <FaBell
            className={clsx('w-5 h-5', {
              'text-blue-500 dark:text-blue-300': isNotificationsActive,
              'text-gray-500 dark:text-gray-300': !isNotificationsActive,
            })}
          />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Link>
        <ThemeSwitcher />
        <div className="relative" ref={dropdownRef}>
          <div
            className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center cursor-pointer"
            onClick={toggleDropdown}
          >
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name ?? 'User profile picture'}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-400 dark:text-gray-300 w-8 h-8" />
            )}
          </div>
          {isDropdownOpen && (
            <ProfileDropdown user={user} onClose={() => setDropdownOpen(false)} />
          )}
        </div>
      </div>
    </header>
  );
}
