"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LogoImage from "../../assets/img/g19-5.png";
import clsx from "clsx";

/**
 * Header component for the public-facing pages.
 * Features a responsive design that adapts to mobile and desktop screens,
 * and a sticky behavior with a transparent-to-blur-white background transition on scroll.
 */
const Header = () => {
  // Internationalization hook to get translations for the "header" namespace.
  const t = useTranslations("header");
  // Hook to get the current URL pathname for active link styling.
  const pathname = usePathname();
  // State to manage the visibility of the mobile menu.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State to track whether the user has scrolled down the page.
  const [scrolled, setScrolled] = useState(false);

  // Effect hook to add and clean up a scroll event listener.
  useEffect(() => {
    const handleScroll = () => {
      // Check if the vertical scroll position is greater than 10 pixels.
      const isScrolled = window.scrollY > 10;
      // Update the state only if it has changed to prevent unnecessary re-renders.
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add the event listener when the component mounts.
    document.addEventListener("scroll", handleScroll);
    // Remove the event listener when the component unmounts.
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]); // Dependency array ensures this effect runs only when `scrolled` changes.

  // Array of navigation links, using translations for labels.
  const navLinks = [
    { href: "/", label: t("home") },
    { href: "#features", label: t("features") },
    { href: "#pricing", label: t("pricing") },
    { href: "#", label: t("learn") },
  ];

  return (
    // The main header element.
    <header
      className={clsx(
        // Base classes: fixed position, full width, z-index, and smooth transitions.
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        // Default style for mobile: white background and a shadow.
        "bg-white shadow-md",
        // Conditional styles based on the scroll state for desktop screens.
        scrolled
          ? "md:bg-white/80 md:dark:bg-gray-900/80 md:shadow-md md:backdrop-blur-sm" // Scrolled state
          : "md:bg-transparent md:shadow-none" // Unscrolled state
      )}
    >
      {/* Centered container for the header content. */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 lg:py-[20px]">
        <div className="flex h-16 items-center justify-between">
          {/* Logo section */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={LogoImage}
                alt="KontriloTech Logo"
                width={30}
                height={50}
                priority // Prioritize loading of the logo image.
              />
            </Link>
          </div>

          {/* Desktop navigation menu (hidden on mobile). */}
          <nav className="hidden md:flex md:items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "font-medium p-[40px] transition-colors hover:text-Primary", // Base styles including the consistent hover effect.
                  "text-Secondary", // Default mobile text color.
                  !scrolled && "md:text-white", // Desktop unscrolled text color.
                  scrolled && "md:text-Secondary dark:md:text-white", // Desktop scrolled text color.
                  // Active link styling.
                  { "text-Primary dark:text-Primary": pathname === link.href }
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop register button (hidden on mobile). */}
          <div className="hidden md:block rounded-[30px] ">
            <Link
              href="/register"
              className="rounded-[30px] inline-block bg-Primary px-[50px] py-2 text-sm font-medium text-white hover:bg-Primary/90"
            >
              {t("register")}
            </Link>
          </div>

          {/* Mobile menu button (hamburger icon). */}
          <div className="md:hidden flex justify-center items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-Secondary hover:bg-gray-100 hover:text-Primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-Primary"
            >
              <span className="sr-only">Open main menu</span>
              {/* Toggle between hamburger and cross icons. */}
              {isMenuOpen ? (
                <i className="fi fi-rr-cross flex"></i>
              ) : (
                <i className="fi fi-rr-menu-burger flex"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown. */}
      <div
        className={clsx(
          // Base styles for the dropdown.
          "md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-20 transition-all duration-300 ease-in-out",
          // Conditional styles for showing/hiding the menu.
          {
            "opacity-100 translate-y-0": isMenuOpen,
            "opacity-0 -translate-y-4 pointer-events-none": !isMenuOpen,
          }
        )}
      >
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 mx-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-md px-3 py-2 text-base font-medium text-center ${
                pathname === link.href
                  ? "bg-Primary text-white"
                  : "text-Secondary hover:bg-gray-50 hover:text-Primary"
              }`}
              onClick={() => setIsMenuOpen(false)} // Close menu on link click.
            >
              {link.label}
            </Link>
          ))}
          {/* Register button for mobile menu. */}
          <Link
            href="/register"
            className="block w-full rounded-[30px] bg-Primary px-3 py-2 text-center text-base font-medium text-Secondary hover:bg-Primary/90"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("register")}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
