import React from 'react';
import Link from 'next/link';
import { 
  HiHeart, 
  HiCode, 
  HiMail,
  HiExternalLink 
} from 'react-icons/hi';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter 
} from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { href: 'https://github.com', icon: FaGithub, label: 'GitHub' },
    { href: 'https://linkedin.com', icon: FaLinkedin, label: 'LinkedIn' },
    { href: 'https://twitter.com', icon: FaTwitter, label: 'Twitter' },
    { href: 'mailto:contact@geekshub.com', icon: HiMail, label: 'Email' },
  ];

  const footerLinks = {
    'Quick Links': [
      { href: '/', label: 'Home' },
      { href: '/#blogs', label: 'Blogs' },
      { href: '/#projects', label: 'Projects' },
      { href: '/about', label: 'About' },
    ],
    'Resources': [
      { href: '/docs', label: 'Documentation' },
      { href: '/api', label: 'API' },
      { href: '/tutorials', label: 'Tutorials' },
      { href: '/faq', label: 'FAQ' },
    ],
    'Legal': [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/cookies', label: 'Cookie Policy' },
      { href: '/license', label: 'License' },
    ],
  };

  return (
    <footer className="bg-card-bg border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <HiCode className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">GeeksHub</span>
            </div>
            <p className="text-sm text-foreground/70 mb-4">
              Your go-to platform for amazing blogs and project showcases. Built with passion for the developer community.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-background hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h3 className="font-semibold text-foreground mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-foreground/70">
              © {new Date().getFullYear()} GeeksHub. All rights reserved.
            </p>
            <p className="text-sm text-foreground/70 flex items-center">
              Made with <HiHeart className="w-4 h-4 mx-1 text-red-500 fill-red-500" /> by GeekforGeeks SRM
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;