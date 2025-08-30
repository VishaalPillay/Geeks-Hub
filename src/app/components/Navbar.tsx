
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import GfgLogo from './GfgLogo'; // Import the new, correct logo
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#blogs', label: 'Blogs' },
    { href: '/#projects', label: 'Projects' },
  ];

  return (
    <nav className="fixed top-4 w-full z-50 flex justify-center h-20 items-center">
      <motion.div
        layout
        transition={{ duration: 0.4, type: 'spring', stiffness: 120, damping: 20 }}
        className={`flex items-center justify-between rounded-full shadow-lg border ${
          isScrolled
            ? 'bg-card-bg/80 backdrop-blur-lg border-border'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="flex items-center gap-4 h-16 px-6">
          <Link href="/" aria-label="Homepage" className="flex items-center gap-2">
            <GfgLogo className={`transition-all duration-300 text-primary ${isScrolled ? 'w-8 h-8' : 'w-7 h-7'}`} />
            <motion.div
              animate={{ width: isScrolled ? 0 : 'auto', opacity: isScrolled ? 0 : 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <span className="text-xl font-bold font-slab gradient-text whitespace-nowrap">GeeksHub</span>
            </motion.div>
          </Link>
          
          <motion.div
            animate={{ width: isScrolled ? 0 : 'auto', opacity: isScrolled ? 0 : 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex items-center gap-2 overflow-hidden"
          >
            <div className="w-px h-6 bg-border" />
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="px-3 py-2 text-sm font-medium whitespace-nowrap hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </motion.div>
        </div>

        <div className="flex items-center px-4">
          <ThemeToggle />
          <div className="md:hidden ml-1">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 w-[95%] md:hidden bg-card-bg/95 backdrop-blur-lg rounded-xl shadow-lg border border-border"
          >
            <div className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium hover:text-primary hover:bg-background">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;