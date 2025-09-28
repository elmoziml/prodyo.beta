
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FiTool } from 'react-icons/fi';

export default function WorkInProgress() {
  const t = useTranslations('WorkInProgress');

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 mt-[50px]">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] shadow-lg max-w-md w-full">
        <FiTool className="mx-auto h-16 w-16 text-Secondary dark:text-gray-500 mb-4" />
        <h1 className="text-3xl font-bold text-Secondary dark:text-white mb-2">{t('title')}</h1>
        <p className="text-Secondary dark:text-gray-300 mb-6">
          {t('description')}
        </p>
        <Link
          href="/"
          className="inline-block bg-Primary text-Secondary dark:text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          {t('cta')}
        </Link>
      </div>
    </div>
  );
}
