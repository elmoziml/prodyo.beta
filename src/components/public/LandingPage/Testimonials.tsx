'use client';

import { useTranslations, useLocale } from 'next-intl';
import { FaQuoteLeft } from 'react-icons/fa';
import { Section, Container } from './helpers';

const TestimonialCard = ({ name, expertise, quote, image }: { name: string; expertise: string; quote: string; image: string; }) => {
    const locale = useLocale();
    const isRtl = locale === 'ar' || locale === 'dz';

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300">
            <FaQuoteLeft className="text-4xl text-[#EB7735] mb-5" />
            <p className="text-gray-600 dark:text-gray-300 italic mb-6 flex-grow">{quote}</p>
            <div className="flex items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden">
                    {/* In a real app, use Next/Image. For now, a placeholder. */}
                    <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.997A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <div className={`${isRtl ? 'mr-4' : 'ml-4'}`}>
                    <p className="text-gray-900 dark:text-white font-bold text-lg">{name}</p>
                    <p className="text-[#EB7735] font-semibold">{expertise}</p>
                </div>
            </div>
        </div>
    );
}

const Testimonials = () => {
    const t = useTranslations('LandingPage.Testimonials');
    const testimonials = [
        {
            name: t('testimonial1.name'),
            expertise: t('testimonial1.expertise'),
            quote: t('testimonial1.quote'),
            image: '' // Placeholder
        },
        {
            name: t('testimonial2.name'),
            expertise: t('testimonial2.expertise'),
            quote: t('testimonial2.quote'),
            image: '' // Placeholder
        },
        {
            name: t('testimonial3.name'),
            expertise: t('testimonial3.expertise'),
            quote: t('testimonial3.quote'),
            image: '' // Placeholder
        },
    ];

    return (
        <Section id="testimonials" className="bg-gray-100 dark:bg-gray-900">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default Testimonials;