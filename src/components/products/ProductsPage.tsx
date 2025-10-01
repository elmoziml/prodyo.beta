
'use client';

import { useState } from 'react';
import { useProducts, useAddProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useTranslations } from 'next-intl';
import Modal from '../ui/Modal';
import ProductDetailModal from './ProductDetailModal';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import { Product } from '@/types';

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
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  const { data: selectedProductDetails } = useProductDetail(selectedProductId);

  const handleOpenDetailModal = (productId: string) => setSelectedProductId(productId);
  const handleCloseDetailModal = () => setSelectedProductId(null);

  const handleOpenEditModal = (productId: string) => {
    setSelectedProductId(productId);
    setIsEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProductId(null);
  };

  const handleOpenDeleteModal = (productId: string) => {
    setSelectedProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProductId(null);
  };

  const handleSaveProduct = (formData: any) => {
    const newProductData = {
      ...formData,
      images: formData.images || [],
      available_options: formData.properties.reduce((acc: Record<string, string[]>, prop: { key: string; value: string }) => {
        if (!acc[prop.key]) acc[prop.key] = [];
        acc[prop.key].push(prop.value);
        return acc;
      }, {}),
    };
    delete newProductData.properties;

    addProductMutation.mutate(newProductData, {
      onSuccess: () => setIsAddModalOpen(false),
    });
  };

  const handleUpdateProduct = (formData: any) => {
    if (!selectedProductId) return;
    const updatedProductData = {
      ...formData,
      images: formData.images || [],
      available_options: formData.properties.reduce((acc: Record<string, string[]>, prop: { key: string; value: string }) => {
        if (!acc[prop.key]) acc[prop.key] = [];
        acc[prop.key].push(prop.value);
        return acc;
      }, {}),
    };
    delete updatedProductData.properties;

    updateProductMutation.mutate({ productId: selectedProductId, productData: updatedProductData }, {
      onSuccess: () => handleCloseEditModal(),
    });
  };

  const handleDeleteProduct = () => {
    if (!selectedProductId) return;
    deleteProductMutation.mutate(selectedProductId, {
      onSuccess: () => handleCloseDeleteModal(),
    });
  };

  if (isLoading) return <div className="text-center py-10">{t('loading')}</div>;
  if (isError) return <div className="text-center py-10 text-red-500">{t('error')}</div>;

  return (
    <div className="bg-white dark:bg-body-dark shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-start">{t('title')}</h2>
        <button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
          {t('addProduct.addButton')}
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-start">{product.category_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-start">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStockChip(product.stock)}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-start">{product.price.toFixed(2)} دج</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-start space-x-4">
                  <button onClick={() => handleOpenDetailModal(product.id)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 font-semibold">
                    {t('detailsButton')}
                  </button>
                  <button onClick={() => handleOpenEditModal(product.id)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 font-semibold">
                    {t('editButton')}
                  </button>
                  <button onClick={() => handleOpenDeleteModal(product.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 font-semibold">
                    {t('deleteButton')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedProductId && !isEditModalOpen && !isDeleteModalOpen} onClose={handleCloseDetailModal} title={t('modal.title')}>
        <ProductDetailModal productId={selectedProductId} />
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

      {/* Edit Product Modal */}
      {selectedProductDetails && (
        <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal} title={t('editProduct.title')}>
          <EditProductForm 
            product={selectedProductDetails}
            onSave={handleUpdateProduct}
            onCancel={handleCloseEditModal}
            isSaving={updateProductMutation.isPending}
          />
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} title={t('deleteProduct.title')}>
        <div>
          <p>{t('deleteProduct.confirmation')}</p>
          <div className="flex justify-end gap-4 mt-4">
            <button onClick={handleCloseDeleteModal} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">{t('deleteProduct.cancel')}</button>
            <button onClick={handleDeleteProduct} disabled={deleteProductMutation.isPending} className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50">
              {deleteProductMutation.isPending ? t('deleteProduct.deleting') : t('deleteProduct.confirm')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
