
'use client';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Storefront.Hero');
  return (
    <div className="relative bg-gray-900">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Fashion models"
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

      <div className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center lg:px-0">
        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">{t('title')}</h1>
        <p className="mt-4 text-xl text-white">{t('subtitle')}</p>
        <a
          href="#"
          className="mt-8 inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
        >
          {t('cta')}
        </a>
      </div>
    </div>
  );
}
