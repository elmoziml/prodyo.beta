"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LogoImage from "../../assets/img/g19-5.png";
import clsx from "clsx";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const navLinks = [
    { href: "/shop", label: t("shop") },
    { href: "/new-arrivals", label: t("newArrivals") },
    { href: "/sale", label: t("sale") },
  ];

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-white shadow-md dark:bg-gray-900",
        scrolled
          ? "md:bg-white/80 md:dark:bg-gray-900/80 md:shadow-md md:backdrop-blur-sm"
          : "md:bg-transparent md:shadow-none"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={LogoImage}
                alt="Prodyo Logo"
                width={30}
                height={50}
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <a href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">{t('login')}</a>
              <a href="/register" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">{t('register')}</a>
            </div>
            <button className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            <LanguageSwitcher />
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-20 transition-all duration-300 ease-in-out",
          {
            "opacity-100 translate-y-0": isMenuOpen,
            "opacity-0 -translate-y-4 pointer-events-none": !isMenuOpen,
          }
        )}
      >
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-md px-3 py-2 text-base font-medium text-center ${
                pathname === link.href
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
             <a href="/login" className="block w-full text-center rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">{t('login')}</a>
             <a href="/register" className="mt-2 block w-full text-center rounded-md bg-indigo-600 px-3 py-2 text-base font-medium text-white hover:bg-indigo-700">{t('register')}</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
