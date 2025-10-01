"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LogoImage from "../../assets/img/g19-5.png";
import clsx from "clsx";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "../dashboard/ThemeSwitcher";
import { Category } from "@/types";

const Header = () => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

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

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-white dark:bg-gray-900",
        scrolled
          ? "shadow-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
          : "shadow-md"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src={LogoImage}
                alt="Prodyo Logo"
                width={40}
                height={40}
                priority
                className="transition-transform hover:scale-105"
              />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:scale-105 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeSwitcher />
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
          "md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 z-20 transition-all duration-300 ease-in-out",
          {
            "opacity-100 translate-y-0": isMenuOpen,
            "opacity-0 -translate-y-4 pointer-events-none": !isMenuOpen,
          }
        )}
      >
        <div className="space-y-2 px-4 pb-4 pt-3 sm:px-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
              className="block w-full rounded-lg px-4 py-3 text-base font-semibold text-center text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
