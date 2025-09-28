
'use client';

import { useState } from 'react';
import { useProducts, useAddProduct } from '@/hooks/useProducts';
import { useTranslations } from 'next-intl';
import Modal from '../ui/Modal';
import ProductDetailModal from './ProductDetailModal';
import AddProductForm from './AddProductForm';

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

const getStockChip = (stock: number) => {
    if (stock > 50) {
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    } else if (stock > 10) {
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    } else {
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
};

export default function ProductsPage() {
  const t = useTranslations('ProductsPage');
  const { data: products, isLoading, isError } = useProducts();
  const addProductMutation = useAddProduct();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenDetailModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetailModal = () => {
    setSelectedProduct(null);
  };

  const handleSaveProduct = (formData: any) => {
    // Convert dynamic properties array to an object
    const options = formData.properties.reduce((acc: any, prop: any) => {
      if (!acc[prop.key]) {
        acc[prop.key] = [];
      }
      acc[prop.key].push(prop.value);
      return acc;
    }, {});

    const newProductData = { ...formData, options };
    delete newProductData.properties;

    addProductMutation.mutate(newProductData, {
      onSuccess: () => {
        setIsAddModalOpen(false); // Close modal on success
      },
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">{t('loading')}</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">{t('error')}</div>;
  }

  return (
    <div className="bg-white dark:bg-body-dark shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-start">{t('title')}</h2>
        <button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
          {t('addProduct.addButton')}
        </button>
      </div>
      
      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {/* ... table head ... */}
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('table.product')}</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('table.category')}</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('table.stock')}</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('table.price')}</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('table.actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-body-dark divide-y divide-gray-200 dark:divide-gray-700">
            {products?.map((product: Product) => (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white text-start">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-start">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-start">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStockChip(product.stock)}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-start">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-start">
                  <button onClick={() => handleOpenDetailModal(product)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 font-semibold">
                    {t('detailsButton')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedProduct} onClose={handleCloseDetailModal} title={t('modal.title')}>
        <ProductDetailModal product={selectedProduct} />
        <div className="text-end mt-4">
            <button onClick={handleCloseDetailModal} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700">
              {t('modal.close')}
            </button>
        </div>
      </Modal>

      {/* Add Product Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={t('addProduct.title')}>
        <AddProductForm 
          onSave={handleSaveProduct} 
          onCancel={() => setIsAddModalOpen(false)} 
          isSaving={addProductMutation.isPending}
        />
      </Modal>
    </div>
  );
}
