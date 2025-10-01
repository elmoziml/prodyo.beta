'use client';

import { CategoryWithProducts } from '@/types';
import ProductCard from './ProductCard';
import { Link } from '@/i18n/navigation';

interface CategorySectionProps {
  category: CategoryWithProducts;
}

export default function CategorySection({ category }: CategorySectionProps) {
  return (
    <div id={`category-${category.id}`} className="bg-white dark:bg-body-dark py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {category.name}
            </h2>
            {category.description && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            )}
          </div>
          <Link
            href={`/category/${category.id}`}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-2"
          >
            عرض الكل
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {category.products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
