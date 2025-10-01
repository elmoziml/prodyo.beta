'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProductById } from '@/services/productService';
import { useCreateOrder } from '@/hooks/useCreateOrder';
import { Product } from '@/types';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function ProductPurchasePage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
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
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Image
            src={product.images?.[0] || '/g19-5.png'}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6">${product.price.toFixed(2)}</p>

          <form onSubmit={handleSubmit}>
            {product.available_options && Object.keys(product.available_options).map(propName => (
              <div key={propName} className="mb-4">
                <label htmlFor={propName} className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize mb-2">
                  {t(propName)}
                </label>
                <select
                  id={propName}
                  name={propName}
                  value={selectedProperties[propName] || ''}
                  onChange={(e) => handlePropertyChange(propName, e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {product.available_options[propName].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">{t('shippingInfo')}</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('fullName')}</label>
                  <input
                    type="text"
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={createOrderMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                {createOrderMutation.isPending ? t('placingOrder') : t('buyNow')}
              </button>
            </div>
            {createOrderMutation.isError && <p className="text-red-500 mt-4">Failed to place order. Please try again.</p>}
            {createOrderMutation.isSuccess && <p className="text-green-500 mt-4">Order placed successfully!</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
