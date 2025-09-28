'use client';

import { useTranslations, useLocale } from 'next-intl';
import { FaChevronDown, FaCogs, FaUser, FaCreditCard, FaBook, FaHeadset } from 'react-icons/fa';
import { Section, Container } from './helpers';
import { useState, useMemo } from 'react';

// Mobile accordion item
const FaqItem = ({ question, answer }: { question: string; answer: string; }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 dark:border-gray-700 py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-900 dark:text-white">
                <span className="rtl:text-right ltr:text-left">{question}</span>
                <FaChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <p className="text-gray-600 dark:text-gray-400 mt-3 rtl:text-right ltr:text-left">{answer}</p>}
        </div>
    );
};

const FAQ = () => {
    const t = useTranslations('LandingPage.FAQ');
    const locale = useLocale();
    const isRtl = locale === 'ar' || locale === 'dz';

    const faqs = useMemo(() => [
        {
            category: t('q1.category'),
            question: t('q1.question'),
            answer: t('q1.answer'),
            answer_long: t('q1.answer_long'),
            icon: FaCogs
        },
        {
            category: t('q2.category'),
            question: t('q2.question'),
            answer: t('q2.answer'),
            answer_long: t('q2.answer_long'),
            icon: FaCreditCard
        },
        {
            category: t('q3.category'),
            question: t('q3.question'),
            answer: t('q3.answer'),
            answer_long: t('q3.answer_long'),
            icon: FaUser
        },
    ], [t]);

    const [activeIndex, setActiveIndex] = useState(0);
    const activeQuestion = faqs[activeIndex];

    return (
        <Section id="faq" className="bg-white dark:bg-gray-900">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
                </div>

                {/* Mobile Accordion View */}
                <div className="md:hidden max-w-3xl mx-auto">
                    {faqs.map((faq, i) => <FaqItem key={i} {...faq} />)}
                </div>

                {/* Desktop Help Center View */}
                <div className="hidden md:grid md:grid-cols-12 md:gap-12">
                    {/* Left Column: Questions List */}
                    <div className="md:col-span-5 lg:col-span-4">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => {
                                const Icon = faq.icon;
                                const isActive = activeIndex === index;
                                return (
                                    <button 
                                        key={index} 
                                        onClick={() => setActiveIndex(index)}
                                        className={`w-full p-4 rounded-lg text-left transition-colors duration-200 ${isRtl ? 'text-right' : 'text-left'} ${
                                            isActive 
                                            ? 'bg-[#EB7735] text-white shadow-lg' 
                                            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}>
                                        <div className="flex items-center">
                                            <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-[#EB7735]'} ${isRtl ? 'ml-4' : 'mr-4'}`} />
                                            <div>
                                                <p className={`font-semibold ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>{faq.category}</p>
                                                <p className={`font-bold ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{faq.question}</p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Answer Details */}
                    <div className={`md:col-span-7 lg:col-span-8 ${isRtl ? 'text-right' : 'text-left'}`}>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-xl sticky top-24">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{activeQuestion.question}</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{activeQuestion.answer_long}</p>
                            
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-3">{t('helperLinks.title')}</h4>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                                    <a href="#" className="flex items-center text-sm font-semibold text-[#EB7735] hover:underline">
                                        <FaBook className={`w-4 h-4 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                                        <span>{t('helperLinks.link1')}</span>
                                    </a>
                                    <a href="#" className="flex items-center text-sm font-semibold text-[#EB7735] hover:underline">
                                        <FaHeadset className={`w-4 h-4 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                                        <span>{t('helperLinks.link2')}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default FAQ;