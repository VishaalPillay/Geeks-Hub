'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { 
  HiMenu, 
  HiX, 
  HiCode, 
  HiHome, 
  HiBookOpen, 
  HiFolderOpen 
} from 'react-icons/hi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: HiHome },
    { href: '/#blogs', label: 'Blogs', icon: HiBookOpen },
    { href: '/#projects', label: 'Projects', icon: HiFolderOpen },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass shadow-lg' : 'bg-background'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform transition-transform group-hover:rotate-12">
              <HiCode className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">GeeksHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-card-bg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-slide-in">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-card-bg transition-colors"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;