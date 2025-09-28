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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Logo and Slogan */}
          <div className="lg:col-span-4">
            <div className="flex items-center mb-4">
              <Image src={logo} alt="KontriloTech Logo" width={40} height={40} className="me-3" />
            </div>
            <p className="text-gray-400 max-w-xs">
              {t("slogan")}
            </p>
            <div className="mt-6 flex justify-between w-[250px]">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  aria-label={link.name}
                  className="text-gray-400 hover:text-orange-500 bg-gray-800 hover:bg-gray-700 transition-colors p-3 rounded-full"
                >
                  {link.icon}
                </a>
              ))}
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">{t("links")}</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="hover:text-white transition-colors">{t("about")}</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">{t("services")}</Link></li>
                <li><Link href="/prices" className="hover:text-white transition-colors">{t("prices")}</Link></li>
                <li><Link href="/learn" className="hover:text-white transition-colors">{t("learn")}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">{t("legal")}</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">{t("privacyPolicy")}</Link></li>
                <li><Link href="/terms-of-use" className="hover:text-white transition-colors">{t("termsOfUse")}</Link></li>
                <li><Link href="/cookie-policy" className="hover:text-white transition-colors">{t("cookiePolicy")}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">{t("contact")}</h3>
              <ul className="space-y-3">
                <li>{t("address")}</li>
                <li>{t("phone")}</li>
                <li><a href={`mailto:${t("email")}`} className="hover:text-white transition-colors">{t("email")}</a></li>
              </ul>
            </div>

          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {currentYear} KontriloTech. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;