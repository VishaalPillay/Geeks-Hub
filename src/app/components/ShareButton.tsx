'use client';

import React from 'react';
import { Share2 } from 'lucide-react';

const ShareButton = ({ title, excerpt }: { title: string; excerpt: string }) => {
  return (
    <button
      className="ml-auto flex items-center gap-2 px-4 py-2 bg-card-bg hover:bg-primary/10 rounded-lg transition-colors"
      onClick={() => {
        if (navigator.share) {
          navigator.share({
            title: title,
            text: excerpt,
            url: window.location.href,
          });
        }
      }}
    >
      <Share2 className="w-4 h-4" />
      <span className="hidden sm:inline">Share</span>
    </button>
  );
};

export default ShareButton;
