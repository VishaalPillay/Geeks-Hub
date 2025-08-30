'use client';

import React, { useState, useEffect } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-card-bg hover:bg-primary/10 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <HiSun className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-300 ${
          isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
        }`} />
        <HiMoon className={`absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-300 ${
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
        }`} />
      </div>
    </button>
  );
};

export default ThemeToggle;