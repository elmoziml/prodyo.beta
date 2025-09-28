'use client';

import CategoryList from './CategoryList';
import AddCategoryForm from './AddCategoryForm';

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <AddCategoryForm />
      <CategoryList />
    </div>
  );
}
