'use client';

import { useTranslations, useLocale } from 'next-intl';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Section, Container } from './helpers';

const FinalCTA = () => {
    const t = useTranslations('LandingPage.FinalCTA');
    const locale = useLocale();
    const isRtl = locale === 'ar' || locale === 'dz';

    return (
        <Section className="bg-gradient-to-r from-orange-600 to-orange-400 text-white">
            <Container className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('title')}</h2>
                <p className="text-lg mb-8">{t('subtitle')}</p>
                <div className="max-w-2xl mx-auto">
                    <form className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <input type="text" placeholder={t('form.name')} className="px-[30px] py-[10px] rounded-full bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white" />
                        <input type="email" placeholder={t('form.email')} className="px-[30px] py-[10px] rounded-full bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white" />
                        <button type="submit" className="bg-gray-900 text-white font-bold px-[30px] py-[10px] rounded-full hover:bg-black transition-colors flex items-center justify-center">
                            <span>{t('form.cta')}</span>
                            {isRtl ? <FaArrowLeft className="mr-2" /> : <FaArrowRight className="ml-2" />}
                        </button>
                    </form>
                </div>
            </Container>
        </Section>
    );
};

export default FinalCTA;
