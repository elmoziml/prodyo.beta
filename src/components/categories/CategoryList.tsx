'use client';

import { useTranslations } from 'next-intl';
import { Category } from '@/types';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export default function CategoryList({ categories, onEdit, onDelete, isDeleting }: CategoryListProps) {
  const t = useTranslations('CategoriesPage');

  return (
    <div className="bg-white dark:bg-body-dark shadow-md rounded-lg p-4">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {categories.map((category) => (
          <li key={category.id} className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800">
            <div>
              <p className="text-md font-semibold text-gray-900 dark:text-white text-start">{category.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-start">{category.description}</p>
            </div>
            <div className="space-x-4">
              <button 
                onClick={() => onEdit(category)}
                className="font-medium text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200"
              >
                {t('list.edit')}
              </button>
              <button 
                onClick={() => onDelete(category.id)}
                disabled={isDeleting}
                className="font-medium text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 disabled:opacity-50"
              >
                {t('list.delete')}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}