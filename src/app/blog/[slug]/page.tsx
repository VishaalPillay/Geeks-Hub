import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts, getDummyPosts } from '../../lib/post'; // Fix: change from 'posts' to 'post'
import MarkdownContent from '../../components/MarkdownContent';
import ShareButton from '../../components/ShareButton';
import { Calendar, Clock, User, ArrowLeft, Tag, BookOpen } from 'lucide-react';

export async function generateStaticParams() {
  const posts = getAllPosts();
  const allPosts = posts.length > 0 ? posts : getDummyPosts();
  
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try to get post from markdown files first
  let post = getPostBySlug(slug);
  
  // If not found, try dummy posts
  if (!post) {
    const dummyPosts = getDummyPosts();
    post = dummyPosts.find(p => p.slug === slug) || null;
  }
  
  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-primary-dark transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blogs
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 gradient-text leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-foreground/70 mb-6">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-border">
            <div className="flex items-center gap-2 text-foreground/70">
              <User className="w-5 h-5" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/70">
              <Calendar className="w-5 h-5" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/70">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
            <ShareButton title={post.title} excerpt={post.excerpt} />
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 mb-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-24 h-24 text-primary/20" />
          </div>
        </div>

        {/* Article Content */}
        <div className="prose-container">
          <MarkdownContent content={post.content} />
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-foreground/70">Written by</span>
              <span className="font-semibold text-primary">{post.author}</span>
            </div>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Read More Articles
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}