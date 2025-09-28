// src/components/ui/sidebar/SidebarLink.tsx
'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import clsx from 'clsx';

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: string;
  isOpen: boolean;
  toggle?: () => void;
}

/**
 * SidebarLink component for displaying a single link in the sidebar.
 * @param href - The link's href.
 * @param label - The link's label.
 * @param icon - The link's icon class.
 * @param isOpen - Whether the sidebar is open or not.
 */
export default function SidebarLink({ href, label, icon, isOpen, toggle }: SidebarLinkProps) {
  const t = useTranslations('sidebar');
  const pathname = usePathname();
  const locale = useLocale();
  const isActive = pathname === href;

  return (
    <li className="mb-2" onClick={toggle}>
      <Link
        href={href}
        className={clsx(
          'flex items-center py-3 px-5 transition-colors rounded-full hover:bg-Primary hover:text-body-dark',
          {
            'bg-Primary dark:text-body-dark': isActive,
            'justify-center w-10 h-10 px-0': !isOpen,
          }
        )}
      >
        <i className={`${icon} flex text-xl`}></i>
        {isOpen && (
          <span className={`text-base ${(locale === 'ar' || locale === 'dz') ? 'mr-3' : 'ml-3'}`}>
            {t(label)}
          </span>
        )}
      </Link>
    </li>
  );
}
