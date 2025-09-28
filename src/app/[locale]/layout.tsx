import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "../../assets/css/globals.css";

import StoreProvider from "@/store/StoreProvider";
import QueryProvider from "@/components/QueryProvider";
import AuthProvider from "@/components/AuthProvider";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '../../i18n/routing.ts';
import SplashScreen from '@/components/SplashScreen';

const rubik = Rubik({
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "تطبيق كونتريلو للتكنولوجيا",
  description: "قريبا ",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} dir={locale === 'ar' || locale === 'dz' ? 'rtl' : 'ltr'} data-theme="dark">
      <body className={`${rubik.className} bg-body dark:bg-body-dark-two`}>
        <SplashScreen>
          <AuthProvider>
            <QueryProvider>
              <StoreProvider>
                <NextIntlClientProvider>{children}</NextIntlClientProvider>
              </StoreProvider>
            </QueryProvider>
          </AuthProvider>
        </SplashScreen>
      </body>
    </html>
  );
}