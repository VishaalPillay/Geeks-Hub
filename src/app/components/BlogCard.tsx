'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import { Post } from '../lib/types';

interface BlogCardProps {
  post: Post;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  return (
    <div
      className="group relative bg-card-bg border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold text-primary/20">{post.title.charAt(0)}</span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
            {post.tags[0] || 'Blog'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-foreground/70 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-foreground/60">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 text-xs bg-background border border-border rounded-md"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all duration-200 group"
        >
          Read More
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default BlogCard;