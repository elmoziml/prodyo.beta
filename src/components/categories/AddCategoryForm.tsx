'use client';

import { useState } from 'react';

export default function AddCategoryForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission, e.g., by calling an API.
    console.log({ name });
    alert('تمت إضافة الفئة (محاكاة)!');
    setName('');
  };

  return (
    <div className="bg-white dark:bg-body-dark shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">إضافة فئة جديدة</h2>
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <div className="flex-grow">
          <label htmlFor="name" className="sr-only">اسم الفئة</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-Primary focus:border-Primary sm:text-sm"
            placeholder="اسم الفئة"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-Primary hover:bg-Primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-Primary"
        >
          إضافة
        </button>
      </form>
    </div>
  );
}
