'use client';

import { useTranslations } from 'next-intl';
import { useProductDetail } from '@/hooks/useProductDetail';
import Image from 'next/image';
import { useState } from 'react';
import { 
  FaBox, FaGlobe, FaCheckCircle, FaTimesCircle, FaTag, 
  FaBoxes, FaInfoCircle, FaPalette, FaCalendarAlt 
} from 'react-icons/fa';
import clsx from 'clsx';

interface ProductDetailModalProps {
  productId: string | null;
}

// Stock status chip styling
const getStockChip = (stock: number) => {
  const baseClasses =
    'px-3 py-1 text-xs sm:text-sm font-semibold rounded-full inline-block';
  if (stock > 50) {
    return `bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 ${baseClasses}`;
  } else if (stock > 10) {
    return `bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 ${baseClasses}`;
  } else if (stock > 0) {
    return `bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 ${baseClasses}`;
  } else {
    return `bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 ${baseClasses}`;
  }
};

export default function ProductDetailModal({ productId }: ProductDetailModalProps) {
  const t = useTranslations('ProductsPage.modal');
  const tAddProduct = useTranslations('ProductsPage.addProduct');
  const { data: product, isLoading, isError } = useProductDetail(productId);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) return <div className="p-6 text-center">{t('loading')}</div>;
  if (isError) return <div className="p-6 text-center text-red-500">{t('error')}</div>;
  if (!product) return null;

  // Handle images
  const images = Array.isArray(product.images) ? product.images : [];
  const mainImage = selectedImage || images[0] || '/g19-5.png';

  return (
    <div className="p-6 md:p-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[95vh] overflow-y-auto custom-scrollbar">
      <div className="">
        
        {/* === Left Section: Image Gallery === */}
        <div className="w-full flex flex-col items-center">
          {/* Main Image */}
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-md">
            <Image
              src={mainImage.replace('/api/images', '')}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 custom-scrollbar justify-center">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={clsx(
                    'flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 bg-gray-100 dark:bg-gray-700 shadow-sm',
                    mainImage === img
                      ? 'border-indigo-500'
                      : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
                  )}
                  onClick={() => setSelectedImage(img)} // fixed bug here
                >
                  <Image
                    src={img.replace('/api/images', '')}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* === Right Section: Product Details === */}
        <div className="w-full flex flex-col space-y-8">
          {/* Product Name & Description */}
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
              {product.name}
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              {product.description}
            </p>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <FaTag className="mr-2 text-indigo-500" /> {tAddProduct('priceLabel')}
              </p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {parseFloat(product.price as any).toFixed(2)} دج
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <FaBoxes className="mr-2 text-indigo-500" /> {tAddProduct('stockLabel')}
              </p>
              <div className={`mt-2 ${getStockChip(product.stock)}`}>
                {product.stock > 0
                  ? `${product.stock} ${tAddProduct('inStock')}`
                  : tAddProduct('outOfStock')}
              </div>
            </div>
          </div>

          {/* Product Kind & Publication Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <FaInfoCircle className="mr-2 text-indigo-500" /> {tAddProduct('productKindLabel')}
              </p>
              <div className="flex items-center mt-2">
                {product.kind === 'PHYSICAL' ? (
                  <FaBox className="text-gray-600 dark:text-gray-300 text-xl mr-2" />
                ) : (
                  <FaGlobe className="text-gray-600 dark:text-gray-300 text-xl mr-2" />
                )}
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  {product.kind === 'PHYSICAL'
                    ? tAddProduct('physicalProduct')
                    : tAddProduct('digitalProduct')}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <FaCheckCircle className="mr-2 text-indigo-500" /> {tAddProduct('isPublishedLabel')}
              </p>
              <div className="flex items-center mt-2">
                {product.is_published ? (
                  <FaCheckCircle className="text-green-500 text-xl mr-2" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-xl mr-2" />
                )}
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  {product.is_published
                    ? tAddProduct('published')
                    : tAddProduct('notPublished')}
                </span>
              </div>
            </div>
          </div>

          {/* Available Options */}
          {product.available_options && Object.keys(product.available_options).length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <FaPalette className="mr-2 text-indigo-500" /> {t('options')}
              </h4>
              <div className="space-y-3">
                {Object.entries(product.available_options).map(([key, values]) => (
                  <div key={key} className="flex flex-wrap items-center">
                    <strong className="capitalize text-base text-gray-600 dark:text-gray-400 mr-3">
                      {key}:
                    </strong>
                    <div className="flex flex-wrap gap-2">
                      {(values as string[]).map((value) => (
                        <span
                          key={value}
                          className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full shadow-sm"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Created & Updated Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {product.created_at && (
              <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <FaCalendarAlt className="mr-2 text-indigo-500" /> {t('createdAt')}
                </p>
                <p className="text-base font-semibold text-gray-800 dark:text-white mt-2">
                  {new Date(product.created_at).toLocaleDateString()}
                </p>
              </div>
            )}
            {product.updated_at && (
              <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <FaCalendarAlt className="mr-2 text-indigo-500" /> {t('updatedAt')}
                </p>
                <p className="text-base font-semibold text-gray-800 dark:text-white mt-2">
                  {new Date(product.updated_at).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
