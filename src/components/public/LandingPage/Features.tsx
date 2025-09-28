'use client';

import { useTranslations } from 'next-intl';
import { FaCar, FaWrench, FaDatabase, FaFileInvoiceDollar, FaUsers } from 'react-icons/fa';
import { Section, Container } from './helpers';
import React from 'react';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300 shadow-lg dark:shadow-2xl">
        <div className="w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-full text-4xl text-[#EB7735] mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 flex-grow">{description}</p>
    </div>
);

const Features = () => {
  const t = useTranslations('LandingPage.Features');
  const features = [
    { icon: <FaDatabase />, title: t('feature1.title'), description: t('feature1.description') },
    { icon: <FaWrench />, title: t('feature2.title'), description: t('feature2.description') },
    { icon: <FaCar />, title: t('feature3.title'), description: t('feature3.description') },
    { icon: <FaFileInvoiceDollar />, title: t('feature4.title'), description: t('feature4.description') },
    { icon: <FaUsers />, title: t('feature5.title'), description: t('feature5.description') },
  ];

  return (
    <Section id="features" className="bg-gray-100 dark:bg-gray-900">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{t('title')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        <div className="text-center mt-12">
            <a href="#" className="text-[#EB7735] font-semibold text-lg hover:text-orange-700 dark:hover:text-orange-400 transition-colors">{t('discoverMore')}</a>
        </div>
      </Container>
    </Section>
  );
};

export default Features;