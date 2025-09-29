'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCategories, useAddCategory, useUpdateCategory, useDeleteCategory } from '@/hooks/useCategories';
import { Category } from '@/types';
import CategoryList from './CategoryList';
import AddCategoryForm from './AddCategoryForm';
import Modal from '../ui/Modal';

export default function CategoriesPage() {
  const t = useTranslations('CategoriesPage');
  const { data: categories = [], isLoading, isError } = useCategories();
  const addCategory = useAddCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleOpenModal = (category: Category | null = null) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingCategory(null);
    setIsModalOpen(false);
  };

  const handleSave = (categoryData: Omit<Category, 'id'> | Category) => {
    if ('id' in categoryData) {
      updateCategory.mutate(categoryData, { onSuccess: handleCloseModal });
    } else {
      addCategory.mutate(categoryData, { onSuccess: handleCloseModal });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t('deleteConfirm'))) {
      deleteCategory.mutate(id);
    }
  };

  if (isLoading) return <div className="text-center py-10">{t('loading')}</div>;
  if (isError) return <div className="text-center py-10 text-red-500">{t('error')}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-start">{t('title')}</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        >
          {t('addButton')}
        </button>
      </div>

      <CategoryList 
        categories={categories}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        isDeleting={deleteCategory.isPending}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingCategory ? t('editTitle') : t('addTitle')}
      >
        <AddCategoryForm 
          onSave={handleSave}
          onCancel={handleCloseModal}
          isSaving={addCategory.isPending || updateCategory.isPending}
          initialData={editingCategory}
        />
      </Modal>
    </div>
  );
}