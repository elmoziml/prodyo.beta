
'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaUserShield,
  FaExclamationTriangle,
  FaCog,
  FaUserEdit,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Link } from '@/i18n/navigation';
import clsx from 'clsx';

import { useSession, signOut } from 'next-auth/react';

interface ProfileDropdownProps {
  onClose: () => void;
}

export default function ProfileDropdown({ onClose }: ProfileDropdownProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const t = useTranslations('Dashboard.ProfileDropdown');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'dz';

  // Placeholder for actual verification status and subscription details
  // You would typically get these from your user object or a separate API call
  const emailVerified = user?.emailVerified ?? false; // Assuming emailVerified exists on user object
  const phoneVerified = user?.phoneVerified ?? false; // Assuming phoneVerified exists on user object
  const accountStatus = emailVerified && phoneVerified ? 'verified' : 'unverified';
  const subscriptionPlan = 'Free'; // Placeholder
  const subscriptionExpires = 'N/A'; // Placeholder

  const showWarning = !emailVerified || !phoneVerified;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' }); // Redirect to login page after logout
    onClose();
  };

  if (!user) {
    return null; // Or a loading spinner, or redirect to login
  }

  return (
    <div
      className={clsx(
        'absolute top-16 w-72 bg-white dark:bg-gray-800 rounded-[40px] shadow-lg z-50 border border-gray-200 dark:border-gray-700',
        isRtl ? 'left-[0]' : 'right-[0]'
      )}
    >
      {/* User Info Header */}
      <div className="p-[20px] border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {user.image ? (
              <img src={user.image} alt={user.name || 'User'} className="w-full h-full object-cover" />
            ) : (
              <FaUser className="text-gray-500 w-8 h-8" />
            )}
          </div>
          <div className={clsx("flex-grow", isRtl ? "mr-3" : "ml-3")}>
            <p className="text-base font-bold text-gray-900 dark:text-white">{user.name || 'User'}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-[20px]">
        <ul className="space-y-3">
          {/* Account Status */}
          <li className="flex items-center">
            {accountStatus === 'verified' ? (
              <FaCheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <FaTimesCircle className="w-5 h-5 text-red-500" />
            )}
            <div className={clsx(isRtl ? "mr-3" : "ml-3")}>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-300">{t('accountStatus')}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {accountStatus === 'verified' ? t('verified') : t('unverified')}
              </p>
            </div>
          </li>

          {/* Subscription Plan */}
          <li className="flex items-center">
            <FaStar className="w-5 h-5 text-yellow-500" />
            <div className={clsx(isRtl ? "mr-3" : "ml-3")}>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-300">{t('subscriptionPlan')}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {subscriptionPlan} ({t('expiresOn')} {subscriptionExpires})
              </p>
            </div>
          </li>
        </ul>

        {/* Verification Warning */}
        {showWarning && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md flex items-start">
            <FaExclamationTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <p className={clsx("text-xs text-yellow-700 dark:text-yellow-300", isRtl ? "mr-2" : "ml-2")}>
              {t('verificationWarning')}
            </p>
          </div>
        )}
      </div>

      {/* Footer Links */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-[20px]">
        <ul className="text-sm text-gray-700 dark:text-gray-300">
          <li>
            <Link
              href="/settings"
              className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-[20px]"
              onClick={onClose}
            >
              <FaCog className={clsx("w-4 h-4", isRtl ? "ml-2" : "mr-2")} />
              {t('settings')}
            </Link>
          </li>
          <li>
            <Link
              href="/public-profile"
              className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-[20px]"
              onClick={onClose}
            >
              <FaUserEdit className={clsx("w-4 h-4", isRtl ? "ml-2" : "mr-2")} />
              {t('publicProfile')}
            </Link>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-[20px] text-red-500"
            >
              <FaSignOutAlt className={clsx("w-4 h-4", isRtl ? "ml-2" : "mr-2")} />
              {t('logout')}
            </button>
          </li>
        </ul>
      </div>
    </div>
    );
  }