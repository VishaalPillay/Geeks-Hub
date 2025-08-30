'use client';

import React, { useState, useMemo } from 'react';
import BlogCard from './BlogCard';
import SearchBar from './SearchBar';
import { Post } from '../lib/types';
import { Sparkles, TrendingUp, Users, Award } from 'lucide-react';
import FadeIn from './FadeIn'; // Import our new animation component

interface BlogListProps {
  initialPosts: Post[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [posts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const lowercasedQuery = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(lowercasedQuery) ||
        post.excerpt.toLowerCase().includes(lowercasedQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery));
      
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => post.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  const stats = [
    { icon: TrendingUp, label: 'Active Projects', value: '50+' },
    { icon: Users, label: 'Contributors', value: '200+' },
    { icon: Award, label: 'Success Stories', value: '100+' },
  ];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-[0.02]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Discover Amazing</span>
                <br />
                <span className="text-foreground">Blogs & Projects</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
                Explore a curated collection of technical blogs and innovative projects from the GeekforGeeks community.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-card-bg border border-border rounded-lg p-6 hover:scale-105 transition-transform">
                      <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-foreground/70">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="blogs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Latest Content</span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Browse through our collection of insightful articles and innovative projects.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <SearchBar onSearch={setSearchQuery} onTagFilter={setSelectedTags} availableTags={availableTags} />
        </FadeIn>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
               <FadeIn key={post.slug} delay={(index % 3) * 0.1}>
                 <BlogCard post={post} index={index} />
               </FadeIn>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-foreground/70">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
}