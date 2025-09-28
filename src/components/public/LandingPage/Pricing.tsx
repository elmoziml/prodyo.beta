'use client';

import { useTranslations } from 'next-intl';
import { Section, Container } from './helpers';

const PricingCard = ({ plan, price, features, isFeatured = false, ctaText, featuredText }: { plan: string; price: string; features: string[]; isFeatured?: boolean; ctaText: string; featuredText: string; }) => (
    <div className={`border rounded-3xl p-8 flex flex-col ${isFeatured ? 'border-orange-500 bg-white dark:bg-gray-800 transform scale-105 shadow-2xl' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg'}`}>
        {isFeatured && <span className="bg-[#EB7735] text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">{featuredText}</span>}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan}</h3>
        <p className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{price}</p>
        <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-8 flex-grow">
            {features.map((feature, i) => (
                <li key={i} className="flex items-center"><span className="text-green-500 me-2 rtl:ms-2 rtl:me-0">✔</span>{feature}</li>
            ))}
        </ul>
        <a href="#" className={`w-full text-center font-bold py-3 rounded-full transition-colors ${isFeatured ? 'bg-[#EB7735] text-white hover:bg-orange-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}>
            {ctaText}
        </a>
    </div>
);

const Pricing = () => {
    const t = useTranslations('LandingPage.Pricing');
    const featuredText = t('featured');
    const plans = {
        free: { 
            plan: t('free.plan'), 
            price: t('free.price'), 
            features: [t('free.feature1'), t('free.feature2')],
            ctaText: t('free.cta')
        },
        technician: { 
            plan: t('technician.plan'), 
            price: t('technician.price'), 
            features: [
                t('technician.feature1'), 
                t('technician.feature2'), 
                t('technician.feature3'),
                t('technician.feature4'),
                t('technician.feature5'),
                t('technician.feature6')
            ], 
            isFeatured: true,
            ctaText: t('technician.cta')
        },
        workshop: { 
            plan: t('workshop.plan'), 
            price: t('workshop.price'), 
            features: [
                t('workshop.feature1'),
                t('workshop.feature2'),
                t('workshop.feature3'),
                t('workshop.feature4'),
                t('workshop.feature5')
            ],
            ctaText: t('workshop.cta')
        },
    };

    return (
        <Section id="pricing" className="bg-gray-100 dark:bg-gray-900">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{t('title')}</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    <PricingCard {...plans.free} featuredText={featuredText} />
                    <PricingCard {...plans.technician} featuredText={featuredText} />
                    <PricingCard {...plans.workshop} featuredText={featuredText} />
                </div>
            </Container>
        </Section>
    );
};

export default Pricing;