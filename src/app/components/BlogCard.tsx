'use client';

import React from 'react';
import Link from 'next/link';
import { Post } from '../lib/types';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: Post;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-card-bg border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up hover:-translate-y-2"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 transition-all duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl font-bold text-primary/10 select-none">
            {post.title.charAt(0)}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col h-full">
        <div className="flex-grow">
          <div className="flex items-center gap-4 text-xs text-foreground/60 mb-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-foreground/70 mb-4 line-clamp-3 text-sm">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-border/50 flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center text-primary font-semibold text-sm">
            <span>Read More</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;