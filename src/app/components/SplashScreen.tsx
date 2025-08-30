'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedGeeksHub');
    if (!hasVisited) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setShouldAnimate(true);
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem('hasVisitedGeeksHub', 'true');
        }, 800); // This should be the duration of the exit animation
      }, 2000); // Splash screen visible for 2 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="fixed inset-0 bg-background z-[100] flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-serif">
              Hey There Recruiters!
            </h1>
            <p className="text-2xl md:text-3xl font-sans mt-4">
              It's Vishaal Here.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}