
'use client';

import { useTranslations } from 'next-intl';

// Define the Product type
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  options: Record<string, string[]>;
}

interface ProductDetailModalProps {
  product: Product | null;
}

const getStockChip = (stock: number) => {
    const baseClasses = 'px-3 py-1 text-sm font-semibold rounded-full inline-block';
    if (stock > 50) {
        return `bg-green-100 text-green-800 ${baseClasses}`;
    } else if (stock > 10) {
        return `bg-yellow-100 text-yellow-800 ${baseClasses}`;
    } else if (stock > 0) {
        return `bg-red-100 text-red-800 ${baseClasses}`;
    } else {
        return `bg-gray-100 text-gray-800 ${baseClasses}`;
    }
};

export default function ProductDetailModal({ product }: ProductDetailModalProps) {
  const t = useTranslations('ProductsPage.modal');
  const tTable = useTranslations('ProductsPage.table');

  if (!product) return null;

  return (
    <div className="p-2 text-start">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 text-center">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{tTable('price')}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">${product.price.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{tTable('stock')}</p>
            <div className={getStockChip(product.stock)}>{product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}</div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('description')}</h4>
        <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
      </div>

      {Object.keys(product.options).length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('options')}</h4>
          {Object.entries(product.options).map(([key, values]) => (
            <div key={key} className="mb-2">
              <strong className="capitalize text-gray-600 dark:text-gray-400">{key}: </strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {values.map(value => (
                    <span key={value} className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md">{value}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
