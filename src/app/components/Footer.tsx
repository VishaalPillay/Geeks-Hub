'use client';

import React from 'react';
import { HiHeart, HiMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import FadeIn from './FadeIn'; // The animation component

const Footer = () => {
  const socialLinks = [
    { href: 'https://github.com', icon: FaGithub, label: 'GitHub' },
    { href: 'https://linkedin.com', icon: FaLinkedin, label: 'LinkedIn' },
    { href: 'mailto:contact@geekshub.com', icon: HiMail, label: 'Email' },
  ];

  return (
    <footer className="w-full flex justify-center p-4 sm:p-6 md:p-8 mt-auto">
      {/* Wrap the pill in the FadeIn component to make it rise from the bottom */}
      <FadeIn direction="up" delay={0.2} className="w-full max-w-4xl">
        {/* The glassmorphism pill container */}
        <div className="w-full bg-card-bg/60 backdrop-blur-lg border border-border rounded-3xl shadow-lg p-8">
          {/* Centered Content Container */}
          <div className="flex flex-col items-center text-center">

            {/* GeeksHub Name (Icon Removed) */}
            <span className="text-2xl font-bold font-slab gradient-text mb-4">
              GeeksHub
            </span>
            
            <p className="text-sm text-foreground/70 mb-6 max-w-md">
              A blog and project showcase built for the GeekforGeeks SRM technical recruitment.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-background hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>

            {/* Bottom Bar / Copyright */}
            <div className="pt-8 border-t border-border/50 w-full flex flex-col items-center">
              <p className="text-sm text-foreground/70 flex items-center">
                © {new Date().getFullYear()} GeeksHub | Made with <HiHeart className="w-4 h-4 mx-1.5 text-red-500" /> by Vishaal Pillay for GeeksforGeeks SRM
              </p>
            </div>
            
          </div>
        </div>
      </FadeIn>
    </footer>
  );
};

export default Footer;