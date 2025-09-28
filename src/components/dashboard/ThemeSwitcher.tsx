'use client';

import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('data-theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(prefersDark ? 'dark' : 'light');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('data-theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center cursor-pointer"
      onClick={toggleTheme}
    >
      {mounted && (
        theme === 'light' ? (
          <FaSun className="text-yellow-500 w-5 h-5" />
        ) : (
          <FaMoon className="text-yellow-300 w-5 h-5" />
        )
      )}
    </div>
  );
};

export default ThemeSwitcher;
