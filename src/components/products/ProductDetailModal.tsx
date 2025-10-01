
'use client';

import { useTranslations } from 'next-intl';
import { useProductDetail } from '@/hooks/useProductDetail';
import Image from 'next/image';
import { useState } from 'react';

interface ProductDetailModalProps {
  productId: string | null;
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

export default function ProductDetailModal({ productId }: ProductDetailModalProps) {
  const t = useTranslations('ProductsPage.modal');
  const tTable = useTranslations('ProductsPage.table');
  const { data: product, isLoading, isError } = useProductDetail(productId);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) return <div className="p-6 text-center">{t('loading')}</div>;
  if (isError) return <div className="p-6 text-center text-red-500">{t('error')}</div>;
  if (!product) return null;

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const mainImage = selectedImage || product.images?.[0] || 'https://via.placeholder.com/400';

  return (
    <div className="p-2 text-start">
      {/* Image Gallery */}
      {product.images && product.images.length > 0 && (
        <div className="mb-6">
          <div className="w-full h-64 relative rounded-lg overflow-hidden mb-2">
            <Image src={mainImage} alt={product.name} layout="fill" objectFit="cover" />
          </div>
          <div className="flex space-x-2">
            {product.images.map((img, index) => (
              <div key={index} className={`w-16 h-16 relative rounded-md overflow-hidden cursor-pointer border-2 ${mainImage === img ? 'border-indigo-500' : 'border-transparent'}`} onClick={() => handleImageSelect(img)}>
                <Image src={img} alt={`${product.name} thumbnail ${index + 1}`} layout="fill" objectFit="cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category_id}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 text-center">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{tTable('price')}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{product.price.toFixed(2)} دج</p>
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

      {product.available_options && Object.keys(product.available_options).length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('options')}</h4>
          {Object.entries(product.available_options).map(([key, values]) => (
            <div key={key} className="mb-2">
              <strong className="capitalize text-gray-600 dark:text-gray-400">{key}: </strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {(values as string[]).map(value => (
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
