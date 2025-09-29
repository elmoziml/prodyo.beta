
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { productPropertyKeys } from '@/lib/data/properties';
import { useCategories } from '@/hooks/useCategories';

// Zod schema for validation
const propertySchema = z.object({
  key: z.string().min(1, "Property name is required"),
  value: z.string().min(1, "Property value is required"),
});

const imageSchema = z.object({
  url: z.string().url("Invalid URL format"),
});

const productSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  category_id: z.string().optional(),
  price: z.preprocess((a) => parseFloat(z.string().parse(a)), z.number().positive("Price must be a positive number")),
  stock: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().int().min(0, "Stock cannot be negative")),
  description: z.string().optional(),
  properties: z.array(propertySchema).optional(),
  images: z.array(imageSchema).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface AddProductFormProps {
  onSave: (data: ProductFormData) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export default function AddProductForm({ onSave, onCancel, isSaving }: AddProductFormProps) {
  const t = useTranslations('ProductsPage.addProduct');
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      properties: [],
      images: [],
    },
  });

  const { fields: propertyFields, append: appendProperty, remove: removeProperty } = useFieldArray({
    control,
    name: 'properties',
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: 'images',
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-6 text-start">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('nameLabel')}</label>
          <input {...register('name')} id="name" placeholder={t('namePlaceholder')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('categoryLabel')}</label>
          <select {...register('category_id')} id="category_id" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600">
            <option value="">{t('selectCategory')}</option>
            {categories?.map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id.message}</p>}
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('priceLabel')}</label>
          <input {...register('price')} id="price" type="number" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('stockLabel')}</label>
          <input {...register('stock')} id="stock" type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
          {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('descriptionLabel')}</label>
          <textarea {...register('description')} id="description" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600"></textarea>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">{t('imagesLabel')}</h3>
        {imageFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4">
            <div className="flex-1">
              <label className="sr-only">{t('imageUrlLabel')}</label>
              <input {...register(`images.${index}.url`)} placeholder={t('imageUrlPlaceholder')} className="block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <button type="button" onClick={() => removeImage(index)} className="text-red-500 hover:text-red-700">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => appendImage({ url: '' })} className="rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-gray-200">
          {t('addImageButton')}
        </button>
      </div>

      {/* Dynamic Properties */}
      <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">{t('propertiesLabel')}</h3>
        {propertyFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4">
            <div className="flex-1">
              <label className="sr-only">{t('propertyNameLabel')}</label>
              <select {...register(`properties.${index}.key`)} className="block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <option value="">{t('selectProperty')}</option>
                {productPropertyKeys.map(key => <option key={key} value={key}>{key}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="sr-only">{t('propertyValueLabel')}</label>
              <input {...register(`properties.${index}.value`)} placeholder={t('propertyValueLabel')} className="block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <button type="button" onClick={() => removeProperty(index)} className="text-red-500 hover:text-red-700">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => appendProperty({ key: '', value: '' })} className="rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-gray-200">
          {t('addPropertyButton')}
        </button>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
          {t('cancelButton')}
        </button>
        <button type="submit" disabled={isSaving} className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50">
          {isSaving ? 'Saving...' : t('saveButton')}
        </button>
      </div>
    </form>
  );
}
