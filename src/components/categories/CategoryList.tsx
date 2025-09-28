'use client';

import { categories } from '@/lib/dummy-data';

export default function CategoryList() {
  return (
    <div className="bg-white dark:bg-body-dark shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">قائمة الفئات</h2>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {categories.map((category) => (
          <li key={category.id} className="p-4 flex justify-between items-center">
            <span className="text-lg">{category.name}</span>
            {/* You can add edit/delete buttons here */}
          </li>
        ))}
      </ul>
    </div>
  );
}
