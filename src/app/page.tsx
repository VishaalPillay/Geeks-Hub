'use client';

import React, { useState, useEffect, useMemo } from 'react';
import BlogCard from './components/BlogCard';
import SearchBar from './components/SearchBar';
import { getDummyPosts, getAllPosts } from './lib/post'; // Fix: change from 'posts' to 'post'
import { Post } from './lib/types';
import { Sparkles, TrendingUp, Users, Award } from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    // Try to get posts from markdown files, fallback to dummy data
    const allPosts = getAllPosts();
    setPosts(allPosts.length > 0 ? allPosts : getDummyPosts());
  }, []);

  // Extract unique tags
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet);
  }, [posts]);

  // Filter posts based on search and tags
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6 animate-fade-in">
              <Sparkles className="w-5 h-5 text-primary mr-2" />
              <span className="text-sm font-semibold text-primary">Welcome to GeeksHub</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              <span className="gradient-text">Discover Amazing</span>
              <br />
              <span className="text-foreground">Blogs & Projects</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 animate-fade-in">
              Explore a curated collection of technical blogs and innovative projects from the GeekforGeeks community.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-card-bg border border-border rounded-lg p-6 animate-fade-in hover:scale-105 transition-transform"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-foreground/70">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="blogs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Latest Blogs & Projects</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Browse through our collection of insightful articles and innovative projects
          </p>
        </div>

        {/* Search and Filter */}
        <SearchBar
          onSearch={setSearchQuery}
          onTagFilter={setSelectedTags}
          availableTags={availableTags}
        />

        {/* Results Count */}
        {(searchQuery || selectedTags.length > 0) && (
          <div className="text-center mb-6">
            <p className="text-sm text-foreground/70">
              Found <span className="font-semibold text-primary">{filteredPosts.length}</span> results
            </p>
          </div>
        )}

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-foreground/70">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </section>
    </div>
  );
}