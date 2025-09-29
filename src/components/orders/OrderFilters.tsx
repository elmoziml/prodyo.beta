'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';

interface OrderFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function OrderFilters({ onFilterChange }: OrderFiltersProps) {
  const t = useTranslations('OrdersPage');
  const tStatus = useTranslations('OrderStatus');
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const statusOptions = useMemo(() => ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled'], []);

  const handleApplyFilters = () => {
    onFilterChange({
      searchTerm,
      status,
      startDate: startDate ? new Date(startDate).toISOString() : null,
      endDate: endDate ? new Date(endDate).toISOString() : null,
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatus('');
    setStartDate('');
    setEndDate('');
    onFilterChange({
      searchTerm: '',
      status: '',
      startDate: null,
      endDate: null,
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder={t('filters.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
        />
        
        {/* Status Dropdown */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="">{t('filters.allStatuses')}</option>
          {statusOptions.map(s => (
            <option key={s} value={s}>{tStatus(s)}</option>
          ))}
        </select>

        {/* Start Date */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
        />

        {/* End Date */}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
        >
          {t('filters.clear')}
        </button>
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {t('filters.apply')}
        </button>
      </div>
    </div>
  );
}
