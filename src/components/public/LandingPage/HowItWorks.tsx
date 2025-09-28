'use client';

import { useTranslations, useLocale } from 'next-intl';
import { FaVideo, FaFileAlt, FaUserPlus, FaTools, FaFileInvoice, FaWrench, FaChartLine } from 'react-icons/fa';
import { Section, Container } from './helpers';

// Sub-component for the content of each step card to avoid repetition
const StepContent = ({ title, description }: { title: string, description: string }) => {
    const t = useTranslations('LandingPage.HowItWorks');
    const locale = useLocale();
    const isRtl = locale === 'ar' || locale === 'dz';

    return (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 h-full flex flex-col">
            <h3 className="text-xl font-bold text-[#EB7735] mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 flex-grow">{description}</p>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-x-6">
                <a href="#" className="flex items-center text-sm font-semibold text-gray-500 hover:text-[#EB7735] dark:text-gray-400 dark:hover:text-orange-400 transition-colors">
                    <FaVideo className={isRtl ? 'ml-2' : 'mr-2'} />
                    <span>{t('videoLink')}</span>
                </a>
                <a href="#" className="flex items-center text-sm font-semibold text-gray-500 hover:text-[#EB7735] dark:text-gray-400 dark:hover:text-orange-400 transition-colors">
                    <FaFileAlt className={isRtl ? 'ml-2' : 'mr-2'} />
                    <span>{t('docsLink')}</span>
                </a>
            </div>
        </div>
    );
}

const HowItWorks = () => {
    const t = useTranslations('LandingPage.HowItWorks');
    const locale = useLocale();
    const isRtl = locale === 'ar' || locale === 'dz';

    const steps = [
        { icon: FaUserPlus, title: t('step1.title'), description: t('step1.description') },
        { icon: FaTools, title: t('step2.title'), description: t('step2.description') },
        { icon: FaFileInvoice, title: t('step3.title'), description: t('step3.description') },
        { icon: FaWrench, title: t('step4.title'), description: t('step4.description') },
        { icon: FaChartLine, title: t('step5.title'), description: t('step5.description') },
    ];

    return (
        <Section id="how-it-works" className="bg-white dark:bg-gray-900 py-20">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p> 
                </div>

                {/* Desktop Timeline */}
                <div className="hidden md:block relative">
                    <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="relative flex justify-between items-center w-full mb-16">
                                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'order-2 pl-8'}`}>
                                    <div className="transform hover:-translate-y-2 transition-transform duration-300 h-full">
                                        <StepContent title={step.title} description={step.description} />
                                    </div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 bg-[#EB7735] rounded-full text-white shadow-lg">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="w-5/12"></div>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile Timeline */}
                <div className="md:hidden">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className={`relative pb-12 ${isRtl ? 'pr-16' : 'pl-16'}`}>
                                {index !== steps.length - 1 && (
                                    <div className={`absolute top-5 w-0.5 h-full bg-gray-200 dark:bg-gray-700 ${isRtl ? 'right-6' : 'left-6'}`} aria-hidden="true"></div>
                                )}
                                <div className={`absolute top-0 z-10 flex items-center justify-center w-12 h-12 bg-[#EB7735] rounded-full text-white shadow-lg ${isRtl ? 'right-0' : 'left-0'}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <StepContent title={step.title} description={step.description} />
                            </div>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
};

export default HowItWorks;