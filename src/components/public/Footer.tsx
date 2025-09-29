'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "../dashboard/LanguageSwitcher";
import logo from "@/assets/img/g19-5.png";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import ThemeSwitcher from '../dashboard/ThemeSwitcher';

const Footer = () => {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "#", icon: <FaFacebookF />, name: "Facebook" },
    { href: "#", icon: <FaTwitter />, name: "Twitter" },
    { href: "#", icon: <FaLinkedinIn />, name: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Prodyo</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{t('slogan')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('links')}</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600">{t('about')}</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600">{t('contact')}</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('help')}</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600">{t('shipping')}</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600">{t('returns')}</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600">{t('faq')}</a></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('legal')}</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600">{t('privacyPolicy')}</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600">{t('termsOfUse')}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-500 dark:text-gray-400">
          &copy; {currentYear} Prodyo. {t('rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
