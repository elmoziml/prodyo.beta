'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProductById } from '@/services/productService';
import { useCreateOrder } from '@/hooks/useCreateOrder';
import { Product, Category } from '@/types';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import categories from '@/lib/data/categories.json';

export default function ProductPurchasePage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedProperties, setSelectedProperties] = useState<{ [key: string]: string }>({});
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const createOrderMutation = useCreateOrder();
  const t = useTranslations('ProductPurchase');

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        try {
          setIsLoading(true);
          const productData = await fetchProductById(id as string);
          setProduct(productData);
          setSelectedImage(productData.images?.[0] || null);

          if (productData.category_id) {
            const cat = categories.find(c => c.id === productData.category_id);
            setCategory(cat || null);
          }

          if (productData.available_options) {
            const initialProperties: { [key: string]: string } = {};
            Object.keys(productData.available_options).forEach(key => {
              initialProperties[key] = productData.available_options[key][0];
            });
            setSelectedProperties(initialProperties);
          }
        } catch (err) {
          setError('Failed to fetch product details.');
        } finally {
          setIsLoading(false);
        }
      };
      getProduct();
    }
  }, [id]);

  useEffect(() => {
    if (createOrderMutation.isSuccess) {
      setCustomerName('');
      setPhoneNumber('');
      setAddress('');
    }
  }, [createOrderMutation.isSuccess]);

  const handlePropertyChange = (propertyName: string, value: string) => {
    setSelectedProperties(prev => ({ ...prev, [propertyName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const orderData = {
      customer_name: customerName,
      phone_number: phoneNumber,
      address,
      items: [
        {
          product_id: product.id,
          product_name: product.name,
          quantity: 1,
          price: product.price,
          available_options: selectedProperties,
        },
      ],
      total_amount: product.price,
    };

    createOrderMutation.mutate(orderData);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p>{t('loading')}</p></div>;
  }

  if (error && !product) {
    return <div className="flex justify-center items-center h-screen"><p className="text-red-500">{error}</p></div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen"><p>{t('productNotFound')}</p></div>;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Product Image Gallery */}
          <div class="w-full lg:max-w-lg mx-auto">
            <div class="bg-white rounded-lg overflow-hidden shadow-lg mb-4 max-h-[80vh]">
              <Image
                src={selectedImage || product.images?.[0] || '/g19-5.png'}
                alt={product.name}
                width={500}
                height={500}
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div class="flex justify-center space-x-2">
              {product.images?.map((img, index) => (
                <div 
                  key={index} 
                  class={`w-16 h-16 relative rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === img ? 'border-indigo-500' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image 
                    src={img} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    layout="fill" 
                    objectFit="cover" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details & Form */}
          <div className="flex flex-col justify-center">
            {category && (
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
                {category.name}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{product.name}</h1>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">DA {product.price.toFixed(2)}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Options */}
              {product.available_options && Object.keys(product.available_options).length > 0 && (
                <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('options')}</h3>
                  {Object.keys(product.available_options).map(propName => (
                    <div key={propName}>
                      <label htmlFor={propName} className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize mb-1">
                        {t(propName)}
                      </label>
                      <select
                        id={propName}
                        name={propName}
                        value={selectedProperties[propName] || ''}
                        onChange={(e) => handlePropertyChange(propName, e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                      >
                        {product.available_options[propName].map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}

              {/* Customer Information */}
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('shippingInfo')}</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('fullName')}</label>
                    <input
                      type="text"
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('phoneNumber')}</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('address')}</label>
                    <textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      rows={3}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={createOrderMutation.isPending}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg"
                >
                  {createOrderMutation.isPending ? t('placingOrder') : t('buyNow')}
                </button>
              </div>
              {createOrderMutation.isError && <p className="text-red-500 mt-4 text-center">{t('orderError')}</p>}
              {createOrderMutation.isSuccess && <p className="text-green-500 mt-4 text-center">{t('orderSuccess')}</p>}
            </form>
          </div>
        </div>

        {/* Product Description */}
        {product.description && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('description')}</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}